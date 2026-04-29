"use client";

const SHORTCUTS: { action: string; keys: string[] }[] = [
  { action: "Print", keys: ["⌘", "P"] },
  { action: "Save (just kidding)", keys: ["⌘", "S"] },
  { action: "Toggle Focus Mode", keys: ["⌘", "\\"] },
  { action: "Exit Focus Mode", keys: ["Esc"] },
  { action: "Keyboard shortcuts", keys: ["⌘", "/"] },
];

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: "rgba(15, 23, 42, 0.32)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--docs-chrome)",
          border: "1px solid var(--docs-chrome-border)",
          borderRadius: "12px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)",
          padding: "20px 22px",
          width: "22rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="font-semibold"
          style={{
            color: "var(--docs-text)",
            fontSize: "0.9375rem",
            marginBottom: "14px",
            letterSpacing: "-0.01em",
          }}
        >
          Keyboard shortcuts
        </div>
        <div
          style={{
            color: "var(--docs-text)",
            fontSize: "0.8125rem",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {SHORTCUTS.map(s => (
            <div key={s.action} className="flex items-center justify-between">
              <span style={{ color: "var(--docs-text-muted)" }}>{s.action}</span>
              <span className="flex items-center gap-1">
                {s.keys.map((k, i) => (
                  <kbd
                    key={i}
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      padding: "2px 7px",
                      minWidth: 22,
                      textAlign: "center",
                      background: "#F1F3F4",
                      border: "1px solid var(--docs-chrome-border)",
                      borderRadius: 5,
                      color: "var(--docs-text)",
                      display: "inline-block",
                    }}
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--docs-accent-hi)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--docs-accent)"; }}
          className="w-full"
          style={{
            marginTop: "20px",
            background: "var(--docs-accent)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.8125rem",
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "999px",
            transition: "background 0.15s ease",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
