import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState({
    width: undefined,
  });
  useEffect(() => {
    // Set innerwidth
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    // only calling the function onresize
    window.addEventListener("resize", handleResize);
    handleResize();
    // Cleanup function
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowWidth;
}
