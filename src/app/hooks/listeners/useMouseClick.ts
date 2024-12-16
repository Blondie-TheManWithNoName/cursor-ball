import { useEffect, useState } from "react";

function useMouseClick() {
  const [isLeftClick, setIsLeftClick] = useState(false);

  useEffect(() => {
    // Event listener for mouse down
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        // Left mouse button is 0
        setIsLeftClick(true);
      }
    };

    // Event listener for mouse up
    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 0) {
        // Left mouse button is 0
        setIsLeftClick(false);
      }
    };

    // Attach event listeners to the window
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return isLeftClick;
}

export default useMouseClick;
