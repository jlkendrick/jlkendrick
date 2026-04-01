"use client";

import { useState, useEffect, useRef } from "react";

const CURSORS = [
  { name: "Alex R.", color: "#1A73E8" },
  { name: "Kim L.",  color: "#E8710A" },
  { name: "M. Park", color: "#1E8E3E" },
];

interface InlineCursorProps {
  // Which cursor shows first (0=Alex, 1=Kim, 2=Park)
  initialIdx?: number;
  // ms before first appearance — use this to stagger placements
  delay?: number;
  // Base cycle interval in ms (actual interval adds up to +4s of jitter)
  interval?: number;
}

export default function InlineCursor({
  initialIdx = 0,
  delay = 0,
  interval = 11000,
}: InlineCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [cursorIdx, setCursorIdx] = useState(initialIdx);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Use a ref so the interval callback always sees the latest cursorIdx
  const idxRef = useRef(cursorIdx);
  idxRef.current = cursorIdx;

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;

    // Appear after initial delay
    const initTimer = setTimeout(() => {
      setVisible(true);

      const cycleTimer = setInterval(() => {
        // Fade out
        setVisible(false);

        // 25% chance: stay hidden for a full extra cycle (simulates person stepping away)
        const awayChance = Math.random() < 0.25;
        const comeBackDelay = awayChance
          ? interval * 0.9 + Math.random() * interval * 0.5
          : 200 + Math.random() * 300;

        setTimeout(() => {
          // Advance to next cursor person
          setCursorIdx((idxRef.current + 1) % CURSORS.length);
          setVisible(true);
        }, comeBackDelay);
      }, interval + Math.random() * 4000);

      return () => clearInterval(cycleTimer);
    }, delay);

    return () => clearTimeout(initTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isMobile]);

  if (!mounted || isMobile) return null;

  const cursor = CURSORS[cursorIdx];

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        position: "relative",
        // Zero width — cursor takes up no horizontal space in the text flow
        width: 0,
        overflow: "visible",
        verticalAlign: "text-bottom",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* Name badge — floats above the cursor line */}
      <span
        style={{
          position: "absolute",
          bottom: "100%",
          left: "1px",
          background: cursor.color,
          color: "#fff",
          fontSize: "0.5rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          padding: "1px 5px 2px",
          borderRadius: "2px 2px 2px 0",
          whiteSpace: "nowrap",
          lineHeight: 1.4,
          marginBottom: "1px",
        }}
      >
        {cursor.name}
      </span>

      {/* Blinking vertical line */}
      <span
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          display: "block",
          width: "2px",
          height: "1em",
          background: cursor.color,
          borderRadius: "1px",
          animation: "blink-cursor 1s step-start infinite",
        }}
      />
    </span>
  );
}
