import { useEffect, useState } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): WindowSize {
  // Initialize state with undefined width and height
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Check if window is defined (it will be undefined on the server)
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize(): void {
        // Update state with new window dimensions
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Call handler immediately to set initial size
      handleResize();

      // Cleanup event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
