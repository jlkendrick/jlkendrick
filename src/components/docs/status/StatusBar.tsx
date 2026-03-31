// Google Docs-style bottom status bar

interface StatusBarProps {
  wordCount: number;
}

export default function StatusBar({ wordCount }: StatusBarProps) {
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
      <div className="flex items-center gap-1.5">
        <span>100%</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2 4L5 7L8 4" />
        </svg>
      </div>
    </div>
  );
}
