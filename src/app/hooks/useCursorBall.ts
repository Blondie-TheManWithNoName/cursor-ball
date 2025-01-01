import { useEffect, useRef, useState } from "react";

import { s } from "framer-motion/client";
import { useCursorBallContext } from "../contexts/CursorBallContext";
import useMouseClick from "./listeners/useMouseClick";
import useMousePosition from "./listeners/useMousePosition";

export const useCursorBall = ({ sticky = 0.2 } = { sticky: 0.2 }) => {
  const {
    ballSize: ballSizeCtx,
    setBallSize: setBallSizeCtx,
    ballPos: ballPosCtx,
    setBallPos: setBallPosCtx,
    ballText: ballTextCtx,
    setBallText: setBallTextCtx,
    cursorBall: cursorBallCtx,
    setCursorBall: setCursorBallCtx,
    ballTextSize: ballTextSizeCtx,
    setTextBallSize: setTextBallSizeCtx,
    animation,
    ballBlockPos: ballBlockPosCtx,
    setBallBlockPos: setBallBlockPosCtx,
    latestBallSizeRef,
    ballRounded: ballRoundedCtx,
    setBallRounded: setBallRoundedCtx,
    ballScale: ballScaleCtx,
    setBallScale: setBallScaleCtx,
  } = useCursorBallContext();
  const mousePosition = useMousePosition();
  const isLeftClick = useMouseClick();
  const [speed, setSpeed] = useState(0);
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLeftClick) {
      setBallSizeCtx({ size: latestBallSizeRef.current * 1.25, temp: true });
    } else {
      setBallSizeCtx({ size: latestBallSizeRef.current, temp: true });
    }
  }, [isLeftClick]);

  useEffect(() => {
    setBallPos({
      x: mousePosition.x,
      y: mousePosition.y, // - (latestBallSizeRef.current > 50 ? 10 : 0),
    });
  }, [mousePosition]);
  // Define maximum squared distance and speed cap
  const maxDistanceSquared = 3000; //10000; // e.g., max distance of 500 pixels
  const maxSpeed = 0.75; // Maximum speed cap

  useEffect(() => {
    const currentTime = Date.now(); // Current timestamp in milliseconds

    if (prevPosRef.current && prevTimeRef.current && !animation.current.block) {
      // Calculate squared distance between current and previous positions
      const dx = mousePosition.x - prevPosRef.current.x;
      const dy = mousePosition.y - prevPosRef.current.y;
      // const distanceSquared = dx * dx + dy * dy; // Squared distance
      const distanceSquared = Math.sqrt(dx * dx + dy * dy); // Euclidean distance

      // Calculate time difference in seconds
      const timeDiff = (currentTime - prevTimeRef.current) / 1000;

      // Calculate speed: squared distance / time
      let currentSpeed = timeDiff > 0 ? distanceSquared / timeDiff : 0;

      // Normalize speed to a range of [0, maxSpeed] and cap it
      currentSpeed = Math.min(
        maxSpeed,
        (currentSpeed / maxDistanceSquared) * maxSpeed
      );

      setSpeed(currentSpeed);

      // Clear any existing timeout for resetting speed
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }

      // Set a timeout to reset speed to 0 if no movement happens for 100ms
      inactivityTimeoutRef.current = setTimeout(() => {
        setSpeed(0);
      }, 100);
    }

    // Update refs with current position and time
    prevPosRef.current = { x: mousePosition.x, y: mousePosition.y };
    prevTimeRef.current = currentTime;
  }, [mousePosition]);

  const animateBall = async ({
    size,
    duration,
    pos,
    text,
  }: {
    size?: number | undefined;
    duration: number | undefined;
    pos?: { x: number; y: number } | undefined;
    text?: string | undefined;
  }) => {
    {
      if (!cursorBallCtx) setCursorBall(true);
      animation.current = {
        state: true,
        prevSize: ballSizeCtx.size,
        prevText: ballTextCtx,
        block: pos ? true : false,
      };
      if (size) {
        setBallSizeCtx({ size, temp: true });
        setTextBallSizeCtx(size);
      }
      if (pos) setBallPosCtx(pos);
      if (text) setBallTextCtx(text);
      setTimeout(() => {
        if (animation.current.prevSize !== 0) {
          setBallSizeCtx({ size: animation.current.prevSize, temp: true });
          setTextBallSizeCtx(animation.current.prevSize);
        }
        if (animation.current.prevText !== "")
          setBallTextCtx(animation.current.prevText);
        if (animation.current.prevPos) setBallPosCtx(animation.current.prevPos);
        animation.current = {
          ...animation.current,
          state: false,
          block: false,
        };
      }, duration);
    }
  };

  const setBallSize = (size: number, temp: boolean = false) => {
    if (!animation.current.state) {
      setBallSizeCtx({ size, temp: temp });
      setTextBallSizeCtx(size);
    } else {
      animation.current = { ...animation.current, prevSize: size };
    }
  };

  const setBallScale = (scale: number) => {
    if (!animation.current.state) setBallScaleCtx(scale);
  };

  const sizeAnimation = (size: number, moveDuration: number = 0.15) => {
    if (!animation.current.state) {
      const currentSize = latestBallSizeRef.current;
      setBallSizeCtx({ size: currentSize * 1.05, temp: true });
      setTimeout(() => {
        setBallSizeCtx({ size: currentSize, temp: true });
      }, moveDuration * 1000);
    }
  };

  const setBallPos = (pos: { x: number; y: number }) => {
    if (!animation.current.block) setBallPosCtx(pos);
    else {
      setBallPosCtx({
        x: ballBlockPosCtx.x,
        y: ballBlockPosCtx.y,
      });
      animation.current = { ...animation.current, prevPos: pos };
    }
  };

  const setBlockBallPos = (block: boolean, pos?: { x: number; y: number }) => {
    animation.current = { ...animation.current, block };
    if (pos) {
      setBallPosCtx({ x: pos.x, y: pos.y });
      setBallBlockPosCtx(pos);
    }
  };

  const setBallText = (text: string) => {
    if (!animation.current.state) setBallTextCtx(text);
    else animation.current = { ...animation.current, prevText: text };
  };

  const setCursorBall = (cursorBall: boolean) => {
    if (!animation.current.state) setCursorBallCtx(cursorBall);
  };

  return {
    animateBall,
    setBallSize,
    setBallPos,
    setBallText,
    setCursorBall,
    setBlockBallPos,
    speed,
    sizeAnimation,
    setBallScale,
    // setBallRounded,
  };
};
