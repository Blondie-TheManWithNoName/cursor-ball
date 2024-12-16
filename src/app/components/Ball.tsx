import { AnimatePresence, m, motion } from "framer-motion";
import React, { use, useEffect } from "react";

import { div } from "framer-motion/client";
import { useCursorBall } from "../hooks/useCursorBall";
import { useCursorBallContext } from "../contexts/CursorBallContext";
import useMousePosition from "../hooks/listeners/useMousePosition";

export default function Ball({
  duration = 0.5,
  sticky = 0.2,
  text = undefined,
}: {
  duration?: number;
  sticky?: number;
  text?: string;
}) {
  const { cursorBall, ballSize, ballPos, ballBlockPos, animation } =
    useCursorBallContext();
  const { speed, sizeAnimation } = useCursorBall({ sticky: sticky });
  const mousePosition = useMousePosition();

  const textDuration = 0.01;
  const fadeDuration = 0.8; // [0, 1]
  const moveDuration = 0.25;
  const itemHeight = 2.5; // Height of each item in rem
  const items = ["Hola", "Hello", "Hej", "Bonjour", "Ciao", "Hallo"];
  //   const items = ["1", "2", "3", "4"];
  const animationDuration =
    items.length * textDuration + items.length * moveDuration;
  const totalHeight = items.length * itemHeight;

  return (
    <motion.div
      className={`z-10 fixed pointer-events-none flex flex-col items-center justify-center overflow-visible`}
      style={{
        width: 0,
        height: 0,
      }}
      animate={
        animation.current.block
          ? {
              left: ballPos.x + (mousePosition.x - ballBlockPos.x) * sticky,
              top: ballPos.y + (mousePosition.y - ballBlockPos.y) * sticky,
            }
          : {
              left: ballPos.x,
              top: ballPos.y,
            }
      }
      transition={{
        type: "tween",
        ease: "backOut",
        duration: duration,
      }}
    >
      <motion.div
        // className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full absolute"
        className={`${
          text === undefined
            ? "bg-black overflow-hidden"
            : "flex items-center justify-center overflow-hidden"
        } rounded-full absolute`}
        animate={
          !animation.current.block
            ? {
                //   width: cursorBall ? ballSize - speed + "px" : 0,
                width: cursorBall ? ballSize * (1 - speed) + "px" : 0,
                //   height: cursorBall ? ballSize - speed + "px" : 0,
                height: cursorBall ? ballSize * (1 - speed) + "px" : 0,
              }
            : {
                width: cursorBall
                  ? ballSize -
                    Math.sqrt(
                      (mousePosition.x - ballBlockPos.x) *
                        (mousePosition.x - ballBlockPos.x) +
                        (mousePosition.y - ballBlockPos.y) *
                          (mousePosition.y - ballBlockPos.y)
                    ) *
                      0.075 +
                    "px"
                  : 0,
                height: cursorBall
                  ? ballSize -
                    Math.sqrt(
                      (mousePosition.x - ballBlockPos.x) *
                        (mousePosition.x - ballBlockPos.x) +
                        (mousePosition.y - ballBlockPos.y) *
                          (mousePosition.y - ballBlockPos.y)
                    ) *
                      0.075 +
                    "px"
                  : 0,
              }
        }
      >
        <AnimatePresence>
          {text && (
            // <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center">
            <div className="h-10 w-full relative overflow-visible">
              {/* <motion.p
                className="text-center  w-full flex flex-col items-center justify-center absolute"
                transition={{
                  //   type: "spring",
                  //   bounce: 1,
                  //   stiffness: 300,
                  //   damping: 50,
                  //   mass: 1,

                  type: "tween",
                  ease: "backOut",
                  duration: 0.5,
                }}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <motion.span className="h-5">Hola</motion.span>
              </motion.p> */}
              <motion.div
                className="text-center w-full absolute flex flex-col items-center justify-center"
                // initial={{ scale: 2, opacity: 0 }}
                // exit={{ scale: 0, opacity: 0 }}
                transition={{
                  //   scale: {
                  //     type: "tween",
                  //     ease: "backOut",
                  //     duration: 0.5,
                  //   },
                  //   opacity: {
                  //     type: "tween",
                  //     ease: "backOut",
                  //     duration: 0.5,
                  //   },

                  duration: animationDuration,
                  ease: "easeInOut",
                  //   ease: "backOut",
                  //   ease: [0.68, -0.6, 0.32, 1.6],
                  //   type: "spring",
                  //   bounce: 1,
                  //   stiffness: 300,
                  //   damping: 50,
                  //   mass: 1,
                  repeat: Infinity,
                  times: Array.from(
                    { length: items.length + items.length + 1 },
                    (_, i) => {
                      if (i % 2 === 0) {
                        return (
                          (Math.floor(i / 2) * textDuration +
                            Math.floor(i / 2) * moveDuration) /
                          animationDuration
                        );
                      } else {
                        return (
                          (Math.ceil(i / 2) * textDuration +
                            Math.floor(i / 2) * moveDuration) /
                          animationDuration
                        );
                      }
                    }
                  ),
                }}
                animate={{
                  //   opacity: 1,
                  //   scale: 1,
                  y: Array.from({ length: items.length * 2 + 1 }, (_, i) => {
                    if (i % 2 === 0) {
                      return `-${Math.floor(i / 2) * itemHeight}rem`;
                    } else {
                      return `-${(Math.ceil(i / 2) - 1) * itemHeight}rem`;
                    }
                  }),
                }}
                onUpdate={({ y }) => {
                  // Call the function on every keyframe update.
                  //   if (parseFloat(y) % 2.5 === 0) {
                  //     setTimeout(() => {
                  //       sizeAnimation(15);
                  //     }, 1100);
                  //   }
                }}
              >
                {items.concat(items[0]).map((text, index) => {
                  // prettier-ignore
                  const fadeIn = index * textDuration + (index - 1) * moveDuration
                  const showIn = fadeIn + moveDuration;
                  const showOut = showIn + textDuration;
                  const fadeOut = showOut + moveDuration * fadeDuration;

                  const times = [
                    0,
                    Math.max((fadeIn + moveDuration * (1 - fadeDuration)) / animationDuration, 0), // prettier-ignore
                    showIn / animationDuration,
                    Math.min(showOut / animationDuration, 1),
                    Math.min(fadeOut / animationDuration, 1),
                    1,
                  ];

                  return (
                    <motion.div
                      key={index}
                      transition={{
                        repeat: Infinity,
                        duration: animationDuration,
                        times: times,
                        ease: "linear",
                      }}
                      animate={{
                        // scale: [1.5, 1.5, 1, 1, 1.5, 1.5],
                        // rotate: [-180, -180, 0, 0, 180, 180],
                        opacity:
                          index === 0
                            ? [1, 1, 1, 1, 0, 0] // First item stays fully visible longer
                            : index === items.length
                            ? [0, 0, 1, 1, 1, 1] // Last item fades in at the end
                            : [0, 0, 1, 1, 0, 0], // Intermediate items fade in and out
                      }}
                      className="h-10 w-full text-2xl flex items-center justify-center"
                    >
                      {text}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
