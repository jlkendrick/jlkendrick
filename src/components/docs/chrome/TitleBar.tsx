"use client";

// Google Docs-style title bar: icon, document name, share button, viewer avatars

import { useState } from "react";

const VIEWERS = [
  { initials: "AR", color: "var(--docs-cursor-1)", name: "Alex R." },
  { initials: "KL", color: "var(--docs-cursor-2)", name: "Kim L." },
  { initials: "MP", color: "var(--docs-cursor-3)", name: "M. Park" },
];

interface TitleBarProps {
  onShare: () => void;
}

export default function TitleBar({ onShare }: TitleBarProps) {
  const [starred, setStarred] = useState(false);

  return (
    <div
      className="docs-chrome-row flex items-center px-3 gap-2 flex-shrink-0"
      style={{ height: "40px" }}
    >
      {/* Google Docs icon */}
      <div className="flex-shrink-0">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="2" width="18" height="26" rx="2" fill="#4285F4" />
          <path d="M18 2L24 8H18V2Z" fill="#1A65C0" />
          <rect x="9" y="12" width="12" height="1.5" rx="0.75" fill="white" />
          <rect x="9" y="15.5" width="12" height="1.5" rx="0.75" fill="white" />
          <rect x="9" y="19" width="8" height="1.5" rx="0.75" fill="white" />
        </svg>
      </div>

      {/* Document title + subtitle */}
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <span
          className="text-sm font-medium leading-tight truncate"
          style={{ color: "var(--docs-text)", fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          James Kendrick — Portfolio
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          {/* Star icon */}
          <button
            onClick={() => setStarred(s => !s)}
            title={starred ? "Remove from starred" : "Add to starred"}
            style={{
              background: "transparent",
              border: "none",
              padding: 2,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: starred ? "#F9AB00" : "var(--docs-text-muted)",
              lineHeight: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill={starred ? "#F9AB00" : "none"}>
              <path d="M6 1L7.5 4.5H11L8.5 6.8L9.5 10.5L6 8.5L2.5 10.5L3.5 6.8L1 4.5H4.5L6 1Z"
                stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Cloud saved */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "var(--docs-text-muted)" }}>
            <path d="M9 5.5A2.5 2.5 0 1 0 6.5 3a3 3 0 0 0-3 3H3a1.5 1.5 0 0 0 0 3h6a1.5 1.5 0 0 0 0-3H9Z"
              stroke="currentColor" strokeWidth="0.8" fill="none" />
          </svg>
        </div>
      </div>

      {/* Viewer avatars */}
      <div className="flex items-center -space-x-1.5 flex-shrink-0">
        {VIEWERS.map(v => (
          <div
            key={v.initials}
            className="relative group"
            title={v.name}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white cursor-default select-none"
              style={{ background: v.color, fontSize: "0.6rem" }}
            >
              {v.initials}
            </div>
          </div>
        ))}
      </div>

      {/* Share button */}
      <button
        onClick={onShare}
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.background = "var(--docs-accent-hi)";
          el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.08)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget;
          el.style.background = "var(--docs-accent)";
          el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.08)";
        }}
        className="flex-shrink-0 flex items-center gap-1.5"
        style={{
          background: "var(--docs-accent)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.8125rem",
          fontWeight: 500,
          padding: "7px 18px",
          borderRadius: "999px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
          transition: "background 0.15s ease, box-shadow 0.15s ease",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="11" cy="3" r="1.5" stroke="white" strokeWidth="1.2" />
          <circle cx="11" cy="11" r="1.5" stroke="white" strokeWidth="1.2" />
          <circle cx="3" cy="7" r="1.5" stroke="white" strokeWidth="1.2" />
          <line x1="4.3" y1="6.2" x2="9.7" y2="3.8" stroke="white" strokeWidth="1.2" />
          <line x1="4.3" y1="7.8" x2="9.7" y2="10.2" stroke="white" strokeWidth="1.2" />
        </svg>
        Share
      </button>
    </div>
  );
}
