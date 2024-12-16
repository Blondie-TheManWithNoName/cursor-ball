"use client";

import React, { use, useEffect } from "react";

import Ball from "./Ball";
import { motion } from "framer-motion";
import { useCursorBall } from "../hooks/useCursorBall";
import { useCursorBallContext } from "../contexts/CursorBallContext";

export default function CursorBall() {
  const { cursorBall, ballSize, ballText, ballPos, ballTextSize } =
    useCursorBallContext();
  return (
    <>
      <Ball duration={0.5} sticky={0.16} />
      <Ball duration={0.49} sticky={0.14} />
      <Ball duration={0.48} sticky={0.12} />
      <Ball duration={0.47} sticky={0.1} />
      <Ball duration={0.42} sticky={0.2} text={ballText} />
    </>
  );
}
