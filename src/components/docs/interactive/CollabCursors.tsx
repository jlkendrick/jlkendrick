"use client";

import { useEffect, useState } from "react";

// All positions are absolute within the Paper div (position: relative, 96px padding).
// Paper content starts at top=96, left=96. Content width ≈ 624px (816 - 2×96).
// Each position is chosen to land on a text line, never in whitespace above text.
//
// Layout estimates (paper-internal top values):
//   DocHeader:     96–185px   (name ~96, subtitle ~128, rule ~148, contact ~162)
//   DocSummary:    202–400px  (heading ~202, paragraph starts ~227)
//   PageBreak 1:   428–492px
//   DocEducation:  492–580px  (heading ~492, school ~507, courses ~543, irrelevant ~561)
//   PageBreak 2:   608–672px
//   DocExperience: 672–975px  (heading ~672, incoming ~693, completed bullets ~780–950)
//   PageBreak 3:   1003–1067px
//   DocProjects:   1067–1230px (entries: ~1103, ~1137, ~1168, ~1199)
//   PageBreak 4:   1258–1322px
//   DocSkills:     1322–1430px (rows: ~1338, ~1360, ~1382, ~1404)
//   PageBreak 5:   1458–1522px
//   DocAbout/Interests: 1522–2000px (paragraph starts ~1552)

const POSITIONS: { top: number; left: number }[] = [
  // Summary paragraph
  { top: 245, left: 150 },  // 0 — line 2
  { top: 283, left: 390 },  // 1 — line 4
  { top: 321, left: 220 },  // 2 — line 6
  { top: 378, left: 310 },  // 3 — last line of Summary
  // Education
  { top: 507, left: 200 },  // 4 — school name
  { top: 543, left: 280 },  // 5 — relevant courses line
  { top: 561, left: 180 },  // 6 — not-so-relevant courses line
  // Experience bullets
  { top: 792, left: 200 },  // 7 — bullet 1 (pipeline generator)
  { top: 830, left: 210 },  // 8 — bullet 2 (terabytes / DP)
  { top: 868, left: 310 },  // 9 — bullet 3
  { top: 906, left: 240 },  // 10 — bullet 4 (attribution)
  { top: 944, left: 190 },  // 11 — bullet 5 (Dataswarm)
  // Projects (collapsed row text)
  { top: 1108, left: 180 }, // 12 — Court Vision row
  { top: 1142, left: 280 }, // 13 — Dirvana row
  { top: 1173, left: 210 }, // 14 — SQLMate row
  { top: 1204, left: 350 }, // 15 — Reco-Forge row
  // Skills
  { top: 1338, left: 190 }, // 16 — Languages row
  { top: 1360, left: 340 }, // 17 — Infrastructure row
  { top: 1382, left: 240 }, // 18 — Frameworks row
  { top: 1404, left: 310 }, // 19 — Concepts row
  // About Me paragraph
  { top: 1571, left: 170 }, // 20 — line 2
  { top: 1609, left: 360 }, // 21 — line 4
  { top: 1685, left: 200 }, // 22 — line 8
  { top: 1761, left: 290 }, // 23 — line 12
];

const CURSORS = [
  { name: "Alex R.",  color: "#1A73E8", initialIdx: 2,  interval: 11000 },
  { name: "Kim L.",   color: "#E8710A", initialIdx: 9,  interval: 14000 },
  { name: "M. Park",  color: "#1E8E3E", initialIdx: 17, interval: 9000  },
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
      const available = POSITIONS
        .map((_, i) => i)
        .filter(i => i !== posIdx && !takenIndices.includes(i));

      if (available.length === 0) return;

      const next = available[Math.floor(Math.random() * available.length)];
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
      {/* Name label above and to the right */}
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

      {/* Blinking cursor line */}
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
          takenIndices={occupied.filter((_, j) => j !== i)}
          onMove={handleMove}
        />
      ))}
    </>
  );
}
