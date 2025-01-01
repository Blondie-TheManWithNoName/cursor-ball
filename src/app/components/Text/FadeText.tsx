import React from "react";
import { motion } from "framer-motion";
import { useCursorBall } from "@/app/hooks/useCursorBall";
import useFadeText from "./useFadeText";

export default function FadeText({
  words,
  sizeAnimation,
}: {
  words: string[];
  sizeAnimation: (size: number, moveDuration: number) => void;
}) {
  const { calculateTimes, calculateY, calculateOpacity } = useFadeText();
  const textDuration = 1;
  const moveDuration = 0.25;
  const fadeDuration = 0.8; // [0, 1]
  const itemHeight = 2.5; //
  const animationSize = 5;
  const ease = "easeInOut"; //"backOut", [0.68, -0.6, 0.32, 1.6],
  const animationDuration =
    words.length * textDuration + words.length * moveDuration;

  return (
    <div className="h-10 w-full relative overflow-visible">
      <motion.div
        className="text-center w-full absolute flex flex-col items-center justify-center"
        transition={{
          duration: animationDuration,
          ease: ease,
          repeat: Infinity,
          times: calculateTimes(
            words,
            textDuration,
            moveDuration,
            animationDuration
          ),
        }}
        animate={{
          y: calculateY(words, itemHeight),
        }}
        onUpdate={({ y }) => {
          // Call the function on every keyframe update.
          if (parseFloat(y) % 2.5 === 0) {
            setTimeout(() => {
              sizeAnimation(animationSize, moveDuration / 2);
            }, textDuration * 1000);
          }
        }}
      >
        {words.concat(words[0]).map((text, index) => (
          <motion.div
            key={index}
            transition={{
              repeat: Infinity,
              duration: animationDuration,
              times: calculateOpacity({
                index,
                textDuration,
                moveDuration,
                animationDuration,
                fadeDuration,
              }),
              ease: "linear",
            }}
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
            }}
            className="h-10 w-full text-2xl flex items-center justify-center"
          >
            {text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
