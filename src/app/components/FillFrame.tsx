import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useCursorBall } from "../hooks/useCursorBall";
import { useCursorBallContext } from "../contexts/CursorBallContext";
import useMousePosition from "../hooks/listeners/useMousePosition";

export default function FillFrame({ children, className, onClick, style }) { 
  const refFrame = useRef(null);
  const refWrapper = useRef(null);
  // const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const [showBall, setShowBall] = useState(false); // State to control the delayed display
  const [dynamicScale, setDynamicScale] = useState(1);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const { setBlockBallPos, animateBall, setBallSize, setBallScale } = useCursorBall();
  const { ballBlockPos, ballPos, ballSize, latestBallSizeRef } = useCursorBallContext();

  // useEffect(() => {
  //   if (isHoveredRef.current && refFrame.current) {
  //     // Calculate dynamic scale
  //     console.log("HOLA")

  //     const { width, height, left, top } = refFrame.current.getBoundingClientRect();
  //     setHoverPos({ x: ballPos.x - left, y: ballPos.y - top });
  //     const baseSize = 20; // Base size of the black ball (diameter, in pixels)
  //     const maxScale = Math.max(width * 2, height * 2) / baseSize;
  //     console.log(maxScale)
  //     setDynamicScale(maxScale);
  //   }
  // }, [isHoveredRef.current]);

  useEffect(() => {
    const { width, height, left, top } =
    refFrame.current.getBoundingClientRect();
  setHoverPos({ x: ballPos.x - left, y: ballPos.y - top });
  }, [ballPos]);

  useEffect(() => {
    let timer;
  
    if (isHoveredRef.current && refFrame.current) {
      // Delay showing the ball
      timer = setTimeout(() => {
        setShowBall(true);
        const { width, height, left, top } =
        refFrame.current.getBoundingClientRect();
      setHoverPos({ x: ballPos.x - left, y: ballPos.y - top });
        // Calculate dynamic scale

        const baseSize = ballSize.size; // Base size of the black ball (diameter, in pixels)
        const maxScale = Math.max(width * 2, height * 2) / baseSize;
        setDynamicScale(10);
      }, 0); // 1-second delay
    } else {
      setDynamicScale(1)
      setBallScale(1);
      animateBall({
              size: ballSize.size,
              duration: 200,
              pos: { x: hoverPos.x, y: hoverPos.y },
            });
          
      clearTimeout(timer);
      setShowBall(false); // Hide the ball when not hovered
    }
    return () => clearTimeout(timer); // Cleanup timeout
  }, [isHoveredRef.current]);

  return (
    <motion.div
      ref={refWrapper}
      onMouseEnter={() => {

      }}
      onMouseLeave={() => {
        setBallScale(1);
      }}
      onMouseMove={(e) => {
        if (!isHoveredRef.current)
        {
          const { width, height, left, top } = refWrapper.current.getBoundingClientRect();

          // Calculate the center of the element
          const centerX = left + width / 2;
          const centerY = top + height / 2;
    
          // Calculate the current direction vector to the center
          const directionX = centerX - e.clientX;
          const directionY = centerY - e.clientY;
    
          // console.log(directionX);
          // Calculate the relative movement (linearly by traveled pixels)
          // const traveledPixels = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2));
          const traveledX = Math.abs(Math.abs(directionX) - width/2)
          const traveledY = Math.abs(Math.abs(directionY) - height/2)
    
          // console.log("traveledX", traveledX) 
          // console.log("traveledY",traveledY) 
            // console.log(
            //   "Math.max", latestBallSizeRef.current + traveledX * 0.1, latestBallSizeRef.current + traveledY * 0.1
            // )
          // Linearly scale the size based on traveled pixels
          const newSize = Math.max(latestBallSizeRef.current, Math.min(Math.min(latestBallSizeRef.current + traveledX * 3, latestBallSizeRef.current + traveledY * 3), 150)); // Example: max size of 150 const
    
          // setBallSize(newSize, true);
          setBallScale(newSize / latestBallSizeRef.current);
          
          // setHoverPos({ x: ballPos.x - left, y: ballPos.y - top });
        }
        else {
            // setBallSize(1, true);
          }
        
      }}
  
      className="bg-red-400/0 flex flex-col items-center justify-center p-5 rounded-full"
    >
    <motion.div
      onClick={onClick}
      style={style}
      className={className + " overflow-hidden relative "}
      ref={refFrame}
      onMouseEnter={() => {
        console.log("hola0")
        const { width, height, left, top } =
          refFrame.current.getBoundingClientRect();
        let x = 0,
          y = 0;

        // x = ballPos.x - ballSize.size / 2;
        // y = ballPos.y - ballSize.size / 2;
        // console.log(ballPos.y,top + height + 10,  top - 10) 
        if (ballPos.x >= left + width - 10) x = ballPos.x - ballSize.size / 2; // prettier-ignore
        else if (ballPos.x < left + 10) x = ballPos.x + ballSize.size / 2;
        else x = ballPos.x;
        
        if (ballPos.y >= top + height - 10) y = ballPos.y - ballSize.size / 2; // prettier-ignore
        else if (ballPos.y < top + 10) y = ballPos.y + ballSize.size / 2;
        else y = ballPos.y;
        // console.log(x, y);
        setBlockBallPos(true, {
          x: x,
          y: y,
        });
        isHoveredRef.current = true; // Show the ball on hover 
        // setBallSize(1, true);
        setBallScale(0);
      }}
      onMouseLeave={() => {
        setBallScale(1);
        isHoveredRef.current = false;
        // setIsHovered(false); // Hide the ball when not hovered
        setBlockBallPos(false);
      }}
    >
      {/* <AnimatePresence> */}
          <motion.div
            className="bg-[#2A1F2D] rounded-full absolute m-auto"
            // style={{  }}
            initial={{ width: ballSize.size, height: ballSize.size}}
            animate={{
              left: hoverPos.x - latestBallSizeRef.current / 2, top: hoverPos.y - latestBallSizeRef.current / 2,
              width: latestBallSizeRef.current, height: latestBallSizeRef.current,
              scale: dynamicScale, 
              // x: hoverPos.x - ballSize.size / 2, y: hoverPos.y - ballSize.size / 2,
              transition:{
              type: "tween",
              ease: "circOut",
              // ease: "backOut",
                duration: isHoveredRef.current ? 1 : 0.2, // Reduced for a quicker start
            }}}
            exit={{  

              transition:{
                type: "tween",
                ease: "easeOut",
                  duration: 0.3, // Reduced for a quicker start
              }
             }}
            
          ></motion.div>
        

          
      {/* </AnimatePresence> */}
      {children}
    </motion.div>
    </motion.div>


  );
}
