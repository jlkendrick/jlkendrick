"use client";

import { useState } from "react";

interface MarginCommentProps {
  text: string;
  author: string;
  color: string;
  topOffset: number;
}

export default function MarginComment({ text, author, color, topOffset }: MarginCommentProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="margin-comment"
      style={{
        position: "absolute",
        // Position just outside the right edge of the paper
        // Paper is centered, max 816px wide; offset 24px beyond its right edge
        left: "calc(50% + 432px + 16px)",
        top: topOffset + 24, // +24 for document area padding-top
        width: expanded ? "200px" : "160px",
        cursor: "pointer",
        transition: "width 0.2s ease",
        zIndex: 10,
      }}
      onClick={() => setExpanded(e => !e)}
    >
      <div
        style={{
          background: "var(--docs-comment-bg)",
          border: `1px solid ${color}`,
          borderLeft: `3px solid ${color}`,
          borderRadius: "3px",
          padding: expanded ? "8px 10px" : "5px 8px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          transition: "padding 0.2s ease",
        }}
      >
        {/* Author line */}
        <div className="flex items-center gap-1.5 mb-1">
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.5rem",
              color: "#fff",
              fontWeight: 700,
              fontFamily: "var(--font-inter), sans-serif",
              flexShrink: 0,
            }}
          >
            {author.charAt(0)}
          </div>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              color: "var(--docs-text)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {author}
          </span>
        </div>

        {/* Comment text */}
        <p
          style={{
            fontSize: "0.6rem",
            color: "var(--docs-text)",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            lineHeight: 1.5,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: expanded ? 10 : 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {text}
        </p>

        {!expanded && (
          <p
            style={{
              fontSize: "0.55rem",
              color: "var(--docs-text-dim)",
              marginTop: "3px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            click to expand
          </p>
        )}
      </div>

      {/* Tail pointing left toward the document */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "-7px",
          width: 0,
          height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderRight: `7px solid ${color}`,
        }}
      />
    </div>
  );
}
