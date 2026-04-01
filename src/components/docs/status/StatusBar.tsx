"use client";

// Google Docs-style bottom status bar

import { useDocsSettings, ZOOM_OPTIONS } from "../DocsSettingsContext";
import { useState, useRef, useEffect } from "react";

interface StatusBarProps {
  wordCount: number;
}

export default function StatusBar({ wordCount }: StatusBarProps) {
  const { zoom, setZoom } = useDocsSettings();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-4"
      style={{
        height: "24px",
        background: "var(--docs-chrome)",
        borderTop: "1px solid var(--docs-chrome-border)",
        fontSize: "0.7rem",
        color: "var(--docs-text-muted)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      {/* Left: page count */}
      <span>Page 1 of 2</span>

      {/* Center: word count */}
      <span>~{wordCount.toLocaleString()} words</span>

      {/* Right: zoom */}
      <div ref={containerRef} style={{ position: "relative" }}>
        <div
          className="flex items-center gap-1.5"
          style={{ cursor: "default", userSelect: "none", padding: "2px 4px", borderRadius: "3px" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#F1F3F4")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          onClick={() => setOpen(o => !o)}
        >
          <span>{zoom}%</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 4L5 7L8 4" />
          </svg>
        </div>

        {open && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 2px)",
              right: 0,
              background: "var(--docs-chrome)",
              border: "1px solid var(--docs-chrome-border)",
              borderRadius: "4px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              zIndex: 200,
              overflow: "hidden",
            }}
          >
            {ZOOM_OPTIONS.map(z => (
              <div
                key={z}
                onClick={() => { setZoom(z); setOpen(false); }}
                style={{
                  padding: "5px 16px",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  color: "var(--docs-text)",
                  background: z === zoom ? "#E8F0FE" : "transparent",
                  cursor: "default",
                  whiteSpace: "nowrap",
                  textAlign: "right",
                }}
                onMouseEnter={e => { if (z !== zoom) e.currentTarget.style.background = "#F1F3F4"; }}
                onMouseLeave={e => { e.currentTarget.style.background = z === zoom ? "#E8F0FE" : "transparent"; }}
              >
                {z}%
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
