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
      style={{ background: "rgba(0,0,0,0.3)" }}
      onClick={onClose}
    >
      <div
        className="rounded shadow-xl p-6 w-80"
        style={{ background: "var(--docs-chrome)", border: "1px solid var(--docs-chrome-border)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-sm font-semibold mb-4" style={{ color: "var(--docs-text)" }}>
          Keyboard shortcuts
        </div>
        <div className="space-y-2 text-sm" style={{ color: "var(--docs-text)" }}>
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
                      padding: "2px 6px",
                      minWidth: 22,
                      textAlign: "center",
                      background: "#F1F3F4",
                      border: "1px solid var(--docs-chrome-border)",
                      borderRadius: 3,
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
          className="mt-5 w-full text-sm py-1.5 rounded"
          style={{
            background: "var(--docs-accent)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
