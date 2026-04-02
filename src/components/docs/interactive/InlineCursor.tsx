"use client";

import { useState, useEffect } from "react";
import { useCursorContext, PEOPLE, type PersonName } from "./CursorContext";

interface InlineCursorProps {
  person: PersonName;
  slot: number;
}

export default function InlineCursor({ person, slot }: InlineCursorProps) {
  const { activeSlots, isMobile } = useCursorContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || isMobile) return null;

  const isActive = activeSlots[person] === slot;
  const { color } = PEOPLE[person];

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        position: "relative",
        width: 0,
        overflow: "visible",
        verticalAlign: "text-bottom",
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.2s ease",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* Name badge */}
      <span
        style={{
          position: "absolute",
          bottom: "100%",
          left: "3px",
          background: color,
          color: "#fff",
          fontSize: "0.5rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          padding: "1px 5px 2px",
          borderRadius: "2px 2px 2px 0",
          whiteSpace: "nowrap",
          lineHeight: 1.4,
          marginBottom: "10px",
        }}
      >
        {person}
      </span>

      {/* Blinking vertical line */}
      <span
        style={{
          position: "absolute",
          top: "-12px",
          left: "0",
          display: "block",
          width: "2px",
          height: "1em",
          background: color,
          borderRadius: "1px",
          animation: "blink-cursor 1s step-start infinite",
        }}
      />
    </span>
  );
}
