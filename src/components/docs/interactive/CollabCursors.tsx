"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CursorConfig {
  name: string;
  color: string;
  waypoints: { x: number; y: number }[];
  duration: number;
}

// Waypoints as % of viewport (0-100)
const CURSORS: CursorConfig[] = [
  {
    name: "Alex R.",
    color: "var(--docs-cursor-1)",
    duration: 38,
    waypoints: [
      { x: 45, y: 15 },
      { x: 50, y: 22 },
      { x: 48, y: 30 },
      { x: 53, y: 42 },
      { x: 46, y: 55 },
      { x: 52, y: 65 },
      { x: 47, y: 75 },
      { x: 45, y: 15 },
    ],
  },
  {
    name: "Kim L.",
    color: "var(--docs-cursor-2)",
    duration: 52,
    waypoints: [
      { x: 55, y: 60 },
      { x: 49, y: 70 },
      { x: 54, y: 80 },
      { x: 48, y: 50 },
      { x: 51, y: 35 },
      { x: 56, y: 20 },
      { x: 55, y: 60 },
    ],
  },
  {
    name: "M. Park",
    color: "var(--docs-cursor-3)",
    duration: 45,
    waypoints: [
      { x: 52, y: 85 },
      { x: 47, y: 90 },
      { x: 50, y: 70 },
      { x: 53, y: 55 },
      { x: 49, y: 40 },
      { x: 52, y: 25 },
      { x: 52, y: 85 },
    ],
  },
];

function CursorArrow({ color }: { color: string }) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path
        d="M2 2L14 9L8 10.5L6 17L2 2Z"
        fill={color}
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CollabCursors() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {CURSORS.map((cursor, ci) => (
        <CollabCursor key={cursor.name} cursor={cursor} delay={ci * 8} />
      ))}
    </>
  );
}

function CollabCursor({ cursor, delay }: { cursor: CursorConfig; delay: number }) {
  const xKeyframes = cursor.waypoints.map(w => `${w.x}vw`);
  const yKeyframes = cursor.waypoints.map(w => `${w.y}vh`);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
      animate={{
        x: xKeyframes,
        y: yKeyframes,
      }}
      transition={{
        duration: cursor.duration,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
    >
      <CursorArrow color={cursor.color} />
      <div
        style={{
          background: cursor.color,
          color: "#fff",
          fontSize: "0.55rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          padding: "1px 5px",
          borderRadius: "2px",
          marginTop: "2px",
          whiteSpace: "nowrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        {cursor.name}
      </div>
    </motion.div>
  );
}
