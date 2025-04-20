import { useEffect, useState } from "react";

export function useMouseCoordinates() {
  const [coords, setCoords] = useState({ clientX: 0, clientY: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setCoords({ clientX: e.clientX, clientY: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return coords;
}
