import { AnimatePresence, m, motion } from "framer-motion";
import React, { use, useEffect } from "react";

import FadeText from "./Text/FadeText";
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
  const {
    cursorBall,
    ballSize,
    ballPos,
    ballBlockPos,
    animation,
    ballRounded,
    ballScale,
  } = useCursorBallContext();
  const { speed, sizeAnimation } = useCursorBall({ sticky: sticky });
  const mousePosition = useMousePosition();

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
        className={`${
          text === undefined
            ? "bg-[#F00] overflow-hidden opacity-1"
            : "flex items-center justify-center overflow-hidden "
        }  absolute rounded-full`}
        animate={
          !animation.current.block
            ? {
                scale: ballScale,
                width: ballSize.size,
                height: ballSize.size,
              }
            : {
                scale: ballScale,
                width: cursorBall
                  ? ballSize.size -
                    Math.sqrt(
                      // TO DO: MOVE LOGIC TO USECURSORBALL
                      (mousePosition.x - ballBlockPos.x) *
                        (mousePosition.x - ballBlockPos.x) +
                        (mousePosition.y - ballBlockPos.y) *
                          (mousePosition.y - ballBlockPos.y)
                    ) *
                      0.075 +
                    "px"
                  : 0,
                height: cursorBall
                  ? ballSize.size -
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
        transition={{
          borderRadius: {
            type: "tween",
            ease: "circOut",
            duration: 0.5,
          },
        }}
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
              <FadeText
                words={["Hola", "Hello", "Ciao", "Hallo", "Bonjour", "Hej"]}
                sizeAnimation={sizeAnimation}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
