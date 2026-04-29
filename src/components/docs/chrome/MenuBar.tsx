"use client";

import { useEffect, useRef } from "react";

const MENU_LABELS = ["File", "Edit", "View", "Insert", "Format", "Tools", "Help"];

const DECORATIVE_ITEMS: Record<string, string[]> = {
  Edit: ["Undo", "Redo", "—", "Cut", "Copy", "Paste", "—", "Select all", "Find and replace"],
  Insert: ["Image", "Table", "Drawing", "Chart", "—", "Link", "Comment", "Footnote"],
  Format: ["Text", "Paragraph styles", "—", "Align & indent", "Line & paragraph spacing", "—", "Bullets & numbering"],
};

interface MenuBarProps {
  openKey: string | null;
  onToggle: (key: string) => void;
  onClose: () => void;
  onFocusMode: () => void;
  onWordCount: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onEmail: () => void;
  onMakeCopy: () => void;
  onToggleRuler: () => void;
  onShowShortcuts: () => void;
  showRuler: boolean;
}

export default function MenuBar({
  openKey,
  onToggle,
  onClose,
  onFocusMode,
  onWordCount,
  onDownload,
  onPrint,
  onEmail,
  onMakeCopy,
  onToggleRuler,
  onShowShortcuts,
  showRuler,
}: MenuBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openKey) return;
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openKey, onClose]);

  return (
    <div
      ref={barRef}
      className="docs-chrome-row flex items-center px-3 gap-0.5 flex-shrink-0 relative"
      style={{ height: "28px" }}
    >
      {MENU_LABELS.map(label => (
        <div key={label} className="relative">
          <button
            className="docs-menu-item text-xs"
            style={{
              background: openKey === label ? "#F1F3F4" : "transparent",
              borderRadius: "2px",
              padding: "3px 8px",
              border: "none",
              cursor: "pointer",
              color: "var(--docs-text)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
            onClick={() => onToggle(label)}
          >
            {label}
          </button>

          {openKey === label && (
            <div
              className="menu-dropdown absolute left-0 top-full mt-0.5 rounded shadow-lg z-50 py-1 min-w-40"
              style={{
                background: "var(--docs-chrome)",
                border: "1px solid var(--docs-chrome-border)",
              }}
            >
              {label === "File" ? (
                <>
                  {["New", "Open", "Make a copy"].map(item =>
                    item === "Make a copy" ? (
                      <MenuDropdownItem key={item} label={item} onClick={onMakeCopy} />
                    ) : (
                      <MenuDropdownItem key={item} label={item} onClick={onClose} muted />
                    )
                  )}
                  <Divider />
                  <MenuDropdownItem label="Download" onClick={onDownload} />
                  <MenuDropdownItem label="Email" onClick={onEmail} />
                  <Divider />
                  <MenuDropdownItem label="Print" onClick={onPrint} />
                </>
              ) : label === "View" ? (
                <>
                  <MenuDropdownItem label="Focus Mode" onClick={onFocusMode} />
                  <MenuDropdownItem
                    label={`${showRuler ? "✓ " : "    "}Show ruler`}
                    onClick={onToggleRuler}
                  />
                  <Divider />
                  {["Print layout", "Show equation toolbar", "Full screen"].map(item => (
                    <MenuDropdownItem key={item} label={item} onClick={onClose} muted />
                  ))}
                </>
              ) : label === "Tools" ? (
                <>
                  <MenuDropdownItem label="Word count" onClick={onWordCount} />
                  <Divider />
                  {["Spelling and grammar", "Review suggested edits", "Compare documents", "—", "Script editor"].map(item =>
                    item === "—" ? <Divider key="sep" /> : (
                      <MenuDropdownItem key={item} label={item} onClick={onClose} muted />
                    )
                  )}
                </>
              ) : label === "Help" ? (
                <>
                  <MenuDropdownItem label="Keyboard shortcuts" onClick={onShowShortcuts} />
                  <Divider />
                  {["Docs Help", "Report a problem", "Report abuse"].map(item => (
                    <MenuDropdownItem key={item} label={item} onClick={onClose} muted />
                  ))}
                </>
              ) : (
                (DECORATIVE_ITEMS[label] ?? []).map((item, i) =>
                  item === "—" ? <Divider key={i} /> : (
                    <MenuDropdownItem key={item} label={item} onClick={onClose} muted />
                  )
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid var(--docs-chrome-border)", margin: "4px 0" }} />;
}

function MenuDropdownItem({
  label,
  onClick,
  muted = false,
}: {
  label: string;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      className="docs-menu-item w-full text-left text-xs block"
      style={{
        color: muted ? "var(--docs-text-muted)" : "var(--docs-text)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        border: "none",
        background: "transparent",
        width: "100%",
        cursor: muted ? "default" : "pointer",
        whiteSpace: "pre",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
