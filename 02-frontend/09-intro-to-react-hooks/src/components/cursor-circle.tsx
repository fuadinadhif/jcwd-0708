"use client";

import { useEffect, useState } from "react";

export default function CursorCirle() {
  // const [xPosition, setXPosition] = useState(0);
  // const [yPosition, setYPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`w-10 h-10 rounded-full bg-red-300 fixed pointer-events-none`}
      style={{ top: mousePosition.y - 16, left: mousePosition.x - 16 }}
    ></div>
  );
}
