// Horizontal ruler mimicking Google Docs ruler

export default function Ruler() {
  // Paper width = 816px, margins = 96px each side
  // Ruler ticks at every 96px (1 inch) within the page-width portion
  const ticks = Array.from({ length: 9 }, (_, i) => i); // 0–8 inches

  return (
    <div
      className="docs-chrome-row flex-shrink-0 relative overflow-hidden"
      style={{
        height: "22px",
        background: "var(--docs-bg)",
        borderBottom: "1px solid var(--docs-chrome-border)",
      }}
    >
      {/* Inner ruler: centered, paper-width */}
      <div
        className="absolute inset-y-0 flex items-end"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(816px, calc(100vw - 48px))",
        }}
      >
        {/* Left margin area */}
        <div
          className="flex-shrink-0"
          style={{ width: 96, height: "100%", background: "var(--docs-ruler)" }}
        />

        {/* Page area with ticks */}
        <div
          className="flex-1 relative"
          style={{ background: "white", height: "100%", borderLeft: "1px solid var(--docs-chrome-border)", borderRight: "1px solid var(--docs-chrome-border)" }}
        >
          {ticks.map(i => (
            <div
              key={i}
              className="absolute bottom-0"
              style={{ left: i * 96 }}
            >
              {/* Major tick */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 1,
                  height: i === 0 ? 0 : 7,
                  background: "var(--docs-text-dim)",
                }}
              />
              {/* Inch label */}
              {i > 0 && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 7,
                    left: 3,
                    fontSize: "0.5rem",
                    color: "var(--docs-text-dim)",
                    lineHeight: 1,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {i}
                </span>
              )}
              {/* Half-inch tick */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 48,
                  width: 1,
                  height: 4,
                  background: "var(--docs-text-dim)",
                }}
              />
            </div>
          ))}

          {/* Left margin drag handle (decorative) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "8px solid var(--docs-text-muted)",
            }}
          />
          {/* Right margin drag handle (decorative) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "8px solid var(--docs-text-muted)",
            }}
          />
        </div>

        {/* Right margin area */}
        <div
          className="flex-shrink-0"
          style={{ width: 96, height: "100%", background: "var(--docs-ruler)" }}
        />
      </div>
    </div>
  );
}
