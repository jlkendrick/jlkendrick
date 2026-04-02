"use client";

import { useEffect, useRef } from "react";

// Animated CSS grid placeholder for project demos — swappable with a real GIF via `gif` prop or video via `video` prop

interface DocDemoPlaceholderProps {
  gif?: string;
  alt?: string;
  video?: string;
  isExpanded?: boolean;
}

const COLS = 8;
const ROWS = 4;

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "300px",
  overflow: "hidden",
  border: "1px solid var(--docs-chrome-border)",
  borderRadius: "2px",
  marginBottom: "12px",
};

export default function DocDemoPlaceholder({ gif, alt, video, isExpanded }: DocDemoPlaceholderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isExpanded) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isExpanded]);

  if (video) {
    return (
      <div style={containerStyle}>
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          controls
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  if (gif) {
    return (
      <div style={containerStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gif}
          alt={alt ?? "Project demo"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        border: "1px solid var(--docs-chrome-border)",
        borderRadius: "2px",
        marginBottom: "12px",
        background: "#FAFAFA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated cell grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: "4px",
          padding: "16px",
          width: "100%",
        }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <div
            key={i}
            style={{
              height: "8px",
              background: "var(--docs-accent)",
              borderRadius: "2px",
              opacity: 0.15,
              animation: "demo-pulse 2s ease-in-out infinite",
              animationDelay: `${(i * 0.08) % 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <p
        style={{
          position: "absolute",
          bottom: "8px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "0.6rem",
          color: "var(--docs-text-dim)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          letterSpacing: "0.06em",
          userSelect: "none",
        }}
      >
        [ DEMO PREVIEW ]
      </p>
    </div>
  );
}
