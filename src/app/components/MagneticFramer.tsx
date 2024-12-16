import { use, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useCursorBall } from "../hooks/useCursorBall";
import useMousePosition from "../hooks/listeners/useMousePosition";

export default function Framer({ children, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mousePosition = useMousePosition();
  const {
    setBallSize,
    setBallText,
    setCursorBall,
    setBallPos,
    setBlockBallPos,
  } = useCursorBall();

  const handleMouse = () => {
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = mousePosition.x - (left + width / 2);
    const middleY = mousePosition.y - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      className={className}
      ref={ref}
      onMouseEnter={() => {
        const { height, width, left, top } =
          ref.current.getBoundingClientRect();
        setBlockBallPos(true, {
          x: left + width / 2,
          y: top + height / 2,
        });
        setBallSize(100);
        setBallText("");
        handleMouse();
      }}
      onMouseMove={() => {
        handleMouse();
      }}
      onMouseLeave={() => {
        reset();
        setBallSize(100);

        setBlockBallPos(false);
      }}
    >
      <motion.div
        style={{ position: "relative", zIndex: 50 }}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 300, damping: 50, mass: 1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
