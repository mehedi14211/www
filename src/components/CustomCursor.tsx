import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  theme: "light" | "midnight";
}

export default function CustomCursor({ theme }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics setup for the premium lagging "magnetic/fluid" ring effect
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if the device supports a precise pointer (desktop cursor)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      // Find out if hovering an interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-pointer") ||
        target.closest("[role='button']");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block" id="custom-cursor-container">
      {/* Lagging outer magnetic ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 28 : 14,
          height: isHovered ? 28 : 14,
          backgroundColor: isHovered 
            ? "rgba(225, 6, 0, 0.08)" // Signature Signal Red tint on hover
            : theme === "midnight" 
              ? "rgba(255, 255, 255, 0.02)" 
              : "rgba(99, 102, 241, 0.02)",
          borderColor: isHovered 
            ? "rgba(225, 6, 0, 0.8)" // Signal Red magnetic boundary on hover
            : theme === "midnight" 
              ? "rgba(244, 244, 245, 0.35)" // Light ring for Midnight
              : "rgba(39, 39, 42, 0.3)", // Slate gray resting border for Light
          borderWidth: isHovered ? "1.5px" : "1px",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.25 }}
        className="fixed rounded-full border border-solid pointer-events-none flex items-center justify-center backdrop-blur-[0.5px]"
        id="custom-cursor-ring"
      />

      {/* Precise center dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.3 : 1,
          backgroundColor: isHovered 
            ? "#FFFFFF" // Crisp white core on hover so it never disappears on red buttons!
            : theme === "midnight" 
              ? "#F4F4F5" // Light resting dot for Midnight
              : "#09090b", // Dark resting dot for Light
        }}
        className="fixed w-1 h-1 rounded-full pointer-events-none"
        id="custom-cursor-dot"
      />
    </div>
  );
}
