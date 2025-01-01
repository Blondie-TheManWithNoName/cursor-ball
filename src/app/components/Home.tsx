"use client";

import React, { use, useEffect, useRef, useState } from "react";

import FillFrame from "./FillFrame";
import MagneticFramer from "./MagneticFramer";
import { useCursorBall } from "../hooks/useCursorBall";
import { useCursorBallContext } from "../contexts/CursorBallContext";
import useWindowSize from "../hooks/listeners/useWindowSize";

export default function Home() {
  const windowSize = useWindowSize();
  const [scaleButton, setScaleButton] = useState(1);

  const { animateBall } = useCursorBall();
  const {
    setBallSize,
    setBallText,
    setCursorBall,
    setBallPos,
    setBlockBallPos,
    setBallRounded,
  } = useCursorBall();

  // useEffect(() => {
  //   if (windowSize.width && windowSize.height) {
  //     animateBall({
  //       size: 500,
  //       duration: 5000,
  //       pos: { x: windowSize.width / 2, y: windowSize.height / 2 },
  //       text: "Hola",
  //     });
  //   }
  // }, [windowSize.width, windowSize.height]);

  return (
    <div className="flex flex-col h-[200vh] w-screen bg-gray-100">
      <main
        className="h-[80vh] w-screen grid grid-cols-3"
        onMouseEnter={() => setCursorBall(true)}
        onMouseLeave={() => {
          setBallSize(25);
          setBallText("");
        }}
      >
        <div
          className="w-full h-full bg-yellow-400"
          onMouseEnter={() => {
            setBallSize(200);
            setBallText("Hola");
          }}
          onMouseLeave={() => setBallSize(75)}
        ></div>
        {/* <div
          className="w-1/3 h-full flex items-center justify-center bg-blue-500"
          ref={ref}
          onMouseEnter={() => {
            setBlockBallPos(true, {
              x: ref.current.offsetLeft + ref.current.offsetWidth / 2,
              y: ref.current.offsetTop + ref.current.offsetHeight / 2,
            });
            setBallSize(100);
            setBallText("");
          }}
          onMouseLeave={() => {
            setBallSize(100);

            setBlockBallPos(false);
          }}
        > */}
        <MagneticFramer
          className={
            "w-full h-full flex items-center justify-center bg-blue-500 hover:cursor-pointer"
          }
        >
          <div className="w-24 h-24 z-50 hover:cursor-pointer border-[2px] font-bold border-white rounded-full flex items-center justify-center mix-blend-lighten">
            View
          </div>
        </MagneticFramer>
        {/* </div> */}

        <div
          className="w-full h-full bg-green-400"
          onMouseEnter={() => {
            setBallSize(200);
            setBallText("Hola");
            // setBallRounded(false);
          }}
          onMouseLeave={() => {
            // setBallRounded(true);
            setBallSize(75);
          }}
        ></div>
        <div
          className="w-full h-full bg-green-400"
          onMouseEnter={() => {
            setBallSize(100);
            setBallText("Hola");
          }}
          onMouseLeave={() => setBallSize(75)}
        ></div>
        <div className="w-full h-full bg-white flex items-center justify-center">
          <FillFrame
            className={`border-[1px] border-gray-600 rounded-full flex items-center justify-center text-center px-10 py-2 cursor-pointer ease-[cubic-bezier(0.36, 0, 0.66, -0.56)] duration-200`}
            // style={{ transform: `scale(${scaleButton})` }}
            // onClick={() => {
            //   setScaleButton(1.2);
            //   setTimeout(() => setScaleButton(1), 300);
            // }}
          >
            <p className="z-50 mix-blend-difference text-white">
              Noah Guardiola
            </p>
          </FillFrame>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer> */}
    </div>
  );
}
