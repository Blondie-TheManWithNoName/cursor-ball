"use client";

import React, {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { BallAnimation } from "../interfaces/BallAnimation";

type CursorBallContextType = {
  cursorBall: boolean;
  setCursorBall: React.Dispatch<React.SetStateAction<any | undefined>>;
  animation: RefObject<BallAnimation>;
  ballSize: { size: number; temp: boolean };
  setBallSize: React.Dispatch<React.SetStateAction<any | undefined>>;
  ballText: string;
  setBallText: React.Dispatch<React.SetStateAction<any | undefined>>;
  ballPos: { x: number; y: number };
  setBallPos: React.Dispatch<React.SetStateAction<any | undefined>>;
  ballTextSize: number;
  setTextBallSize: React.Dispatch<React.SetStateAction<any | undefined>>;
  setBallBlockPos: React.Dispatch<React.SetStateAction<any | undefined>>;
  ballBlockPos: { x: number; y: number };
  latestBallSizeRef: RefObject<number>;
  ballScale: number;
  setBallScale: React.Dispatch<React.SetStateAction<any | undefined>>;
  // ballRounded: boolean;
  // setBallRounded: React.Dispatch<React.SetStateAction<any | undefined>>;
};

const CursorBallContext = createContext<CursorBallContextType | undefined>(
  undefined
);

// Create a provider component
export const CursorBallProvider = ({ children }: { children: ReactNode }) => {
  const [cursorBall, setCursorBall] = useState<boolean>(false);
  // const [ballRounded, setBallRounded] = useState<boolean>(true);
  const [ballBlockPos, setBallBlockPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const animation = useRef<BallAnimation>({
    state: false,
    block: false,
    prevSize: 75,
    prevText: "",
    prevPos: { x: 0, y: 0 },
  });
  const [ballSize, setBallSize] = useState<{ size: number; temp: boolean }>({
    size: 75,
    temp: false,
  });

  const [ballScale, setBallScale] = useState<number>(1);

  const [ballTextSize, setTextBallSize] = useState<number>(75);
  const [ballText, setBallText] = useState<string>("");
  const [ballPos, setBallPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const latestBallSizeRef = useRef(ballSize.size);

  useEffect(() => {
    if (!ballSize.temp) latestBallSizeRef.current = ballSize.size;
  }, [ballSize]);

  return (
    <CursorBallContext.Provider
      value={{
        cursorBall,
        setCursorBall,
        animation,
        ballSize,
        setBallSize,
        ballText,
        setBallText,
        ballPos,
        setBallPos,
        ballTextSize,
        setTextBallSize,
        setBallBlockPos,
        ballBlockPos,
        latestBallSizeRef,
        ballScale,
        setBallScale,
        // ballRounded,
        // setBallRounded,
      }}
    >
      {children}
    </CursorBallContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCursorBallContext = () => {
  const context = useContext(CursorBallContext);

  if (!context) {
    throw new Error(
      "useCursorBallContext must be used within a CursorBallProvider"
    );
  }

  return context;
};
