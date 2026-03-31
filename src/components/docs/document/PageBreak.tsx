// Decorative page break divider — bleeds to full paper width

export default function PageBreak() {
  return (
    <div
      style={{
        height: "36px",
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid var(--docs-chrome-border)",
        borderBottom: "1px solid var(--docs-chrome-border)",
        background: "var(--docs-bg)",
        margin: "28px -96px",
        paddingLeft: "8px",
      }}
      className="page-break-divider"
    >
      <style>{`
        @media (max-width: 600px) {
          .page-break-divider {
            margin: 20px -40px !important;
          }
        }
        @media (max-width: 400px) {
          .page-break-divider {
            margin: 16px -24px !important;
          }
        }
      `}</style>
      <span
        style={{
          fontSize: "0.6rem",
          color: "var(--docs-text-dim)",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          userSelect: "none",
        }}
      >
        — Page Break —
      </span>
    </div>
  );
}
