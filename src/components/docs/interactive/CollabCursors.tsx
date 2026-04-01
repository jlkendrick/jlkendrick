"use client";

import { useEffect, useState } from "react";

// Safe positions within the Paper div (top/left from Paper's top-left corner).
// Paper has 96px padding, content area is 96–720px horizontally.
// Each position is chosen to land in whitespace: after section rules,
// between bullets, or at line-ends — never mid-paragraph above text.
const POSITIONS = [
  { top: 178, left: 350 },   // after DocHeader amber rule, before About
  { top: 178, left: 480 },   // same row, different column
  { top: 320, left: 220 },   // end of About paragraph, left column
  { top: 320, left: 520 },   // end of About paragraph, right column
  { top: 418, left: 160 },   // in DocEducation body
  { top: 418, left: 500 },   // in DocEducation body, right
  { top: 498, left: 380 },   // end of DocEducation
  { top: 628, left: 290 },   // mid DocExperience bullets
  { top: 700, left: 480 },   // near end of Experience bullets
  { top: 700, left: 200 },   // near end of Experience bullets, left
  { top: 862, left: 260 },   // in DocProjects header area
  { top: 862, left: 530 },   // in DocProjects, right
  { top: 944, left: 160 },   // between project entries
  { top: 944, left: 430 },   // between project entries, right
  { top: 1086, left: 350 },  // in DocSkills
  { top: 1150, left: 220 },  // end of DocSkills
];

const CURSORS = [
  { name: "Alex R.",  color: "#1A73E8", initialIdx: 0,  interval: 11000 },
  { name: "Kim L.",   color: "#E8710A", initialIdx: 7,  interval: 14000 },
  { name: "M. Park",  color: "#1E8E3E", initialIdx: 13, interval: 9000  },
];

interface CursorProps {
  name: string;
  color: string;
  initialIdx: number;
  interval: number;
  takenIndices: number[];
  onMove: (prev: number, next: number) => void;
}

function DocCursor({ name, color, initialIdx, interval, takenIndices, onMove }: CursorProps) {
  const [posIdx, setPosIdx] = useState(initialIdx);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // Pick a new index not currently used by any cursor
      const available = POSITIONS
        .map((_, i) => i)
        .filter(i => i !== posIdx && !takenIndices.includes(i));

      if (available.length === 0) return;

      const next = available[Math.floor(Math.random() * available.length)];
      // Brief flash-out/in to sell the "teleport"
      setVisible(false);
      setTimeout(() => {
        onMove(posIdx, next);
        setPosIdx(next);
        setVisible(true);
      }, 150);
    }, interval + Math.random() * 3000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posIdx, interval]);

  const pos = POSITIONS[posIdx];

  return (
    <div
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease",
        zIndex: 5,
      }}
    >
      {/* Name label — above and to the right of the cursor line */}
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          left: "3px",
          background: color,
          color: "#fff",
          fontSize: "0.55rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          padding: "1px 5px 2px",
          borderRadius: "2px 2px 2px 0",
          whiteSpace: "nowrap",
          marginBottom: "1px",
          lineHeight: 1.4,
        }}
      >
        {name}
      </div>

      {/* Cursor line */}
      <div
        style={{
          width: "2px",
          height: "14px",
          background: color,
          borderRadius: "1px",
          animation: "blink-cursor 1s step-start infinite",
        }}
      />
    </div>
  );
}

export default function CollabCursors() {
  const [isMobile, setIsMobile] = useState(false);
  // Track which position indices are currently occupied
  const [occupied, setOccupied] = useState<number[]>(CURSORS.map(c => c.initialIdx));

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  const handleMove = (prev: number, next: number) => {
    setOccupied(curr => curr.map(idx => (idx === prev ? next : idx)));
  };

  return (
    <>
      {CURSORS.map((c, i) => (
        <DocCursor
          key={c.name}
          name={c.name}
          color={c.color}
          initialIdx={c.initialIdx}
          interval={c.interval}
          // Other cursors' current positions
          takenIndices={occupied.filter((_, j) => j !== i)}
          onMove={handleMove}
        />
      ))}
    </>
  );
}
