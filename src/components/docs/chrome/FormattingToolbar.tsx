// Decorative Google Docs-style formatting toolbar

function BoldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 3h4.5a3 3 0 0 1 0 6H4V3zm0 6h5a3 3 0 0 1 0 6H4V9z" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M6 3h6v1.5H9.5l-2 7H10V13H4v-1.5h2.5l2-7H6V3z" />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 13h10v1H3zm1.5-9h1.5v4.5a2 2 0 1 0 4 0V4H11.5v4.5a3.5 3.5 0 0 1-7 0V4z" />
    </svg>
  );
}

function AlignLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="3" width="12" height="1.5" rx="0.75" />
      <rect x="2" y="6.5" width="8" height="1.5" rx="0.75" />
      <rect x="2" y="10" width="12" height="1.5" rx="0.75" />
      <rect x="2" y="13.5" width="6" height="1.5" rx="0.75" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4" />
      <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M2 3h12v8H9l-3 3V11H2V3z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function ToolbarBtn({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <button className="docs-toolbar-btn" title={title} tabIndex={-1}>
      {children}
    </button>
  );
}

function ToolbarSelect({ value, width = 100 }: { value: string; width?: number }) {
  return (
    <div
      className="flex items-center gap-0.5 px-1.5 h-[26px] rounded cursor-default select-none"
      style={{
        border: "1px solid transparent",
        width,
        fontSize: "0.75rem",
        color: "var(--docs-text)",
        background: "transparent",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "#F1F3F4")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <span className="flex-1 truncate text-xs">{value}</span>
      <ChevronDownIcon />
    </div>
  );
}

export default function FormattingToolbar() {
  return (
    <div
      className="docs-chrome-row flex items-center px-3 gap-0.5 flex-shrink-0 flex-wrap"
      style={{ minHeight: "40px", paddingTop: "4px", paddingBottom: "4px" }}
    >
      {/* Undo / Redo */}
      <ToolbarBtn title="Undo">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M3 7.5A5 5 0 0 1 8 3a5 5 0 0 1 5 5 5 5 0 0 1-5 5H5" />
          <path d="M3 4.5v3h3" fill="currentColor" stroke="none" />
          <path d="M3 7.5V4.5H6" fill="none" strokeLinejoin="round" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn title="Redo">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ transform: "scaleX(-1)" }}>
          <path d="M3 7.5A5 5 0 0 1 8 3a5 5 0 0 1 5 5 5 5 0 0 1-5 5H5" />
          <path d="M3 7.5V4.5H6" fill="none" strokeLinejoin="round" />
        </svg>
      </ToolbarBtn>

      <ToolbarBtn title="Print">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
          <rect x="4" y="2" width="8" height="5" />
          <path d="M4 7H2v6h12V7h-2" />
          <rect x="4" y="10" width="8" height="4" />
        </svg>
      </ToolbarBtn>

      <ToolbarBtn title="Spell check">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 11.5L6.5 5h3L12 11.5h-2L9.5 10h-3L6 11.5H4zm2.2-2.5h3.6L8 6.2 6.2 9z" />
          <path d="M1 14h8v1H1z" style={{ fill: "var(--docs-accent)" }} />
        </svg>
      </ToolbarBtn>

      <div className="docs-toolbar-divider" />

      {/* Zoom */}
      <ToolbarSelect value="100%" width={68} />

      <div className="docs-toolbar-divider" />

      {/* Style selector */}
      <ToolbarSelect value="Normal text" width={110} />

      <div className="docs-toolbar-divider" />

      {/* Font family */}
      <ToolbarSelect value="Cormorant Garamond" width={148} />

      <div className="docs-toolbar-divider" />

      {/* Font size */}
      <ToolbarSelect value="11" width={52} />

      <div className="docs-toolbar-divider" />

      {/* Bold, Italic, Underline */}
      <ToolbarBtn title="Bold"><BoldIcon /></ToolbarBtn>
      <ToolbarBtn title="Italic"><ItalicIcon /></ToolbarBtn>
      <ToolbarBtn title="Underline"><UnderlineIcon /></ToolbarBtn>

      <div className="docs-toolbar-divider" />

      {/* Text color chip */}
      <ToolbarBtn title="Text color">
        <div className="flex flex-col items-center gap-0.5">
          <span style={{ fontSize: "0.75rem", fontWeight: 700, lineHeight: 1 }}>A</span>
          <div style={{ width: 14, height: 3, background: "var(--docs-accent)", borderRadius: 1 }} />
        </div>
      </ToolbarBtn>

      {/* Highlight color */}
      <ToolbarBtn title="Highlight color">
        <div className="flex flex-col items-center gap-0.5">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2" y="2" width="9" height="7" rx="1" />
            <path d="M4.5 11h4" />
          </svg>
          <div style={{ width: 14, height: 3, background: "#FFF9C4", borderRadius: 1, border: "1px solid #E0DEDA" }} />
        </div>
      </ToolbarBtn>

      <div className="docs-toolbar-divider" />

      {/* Alignment */}
      <ToolbarBtn title="Align left"><AlignLeftIcon /></ToolbarBtn>

      {/* Line spacing */}
      <ToolbarBtn title="Line & paragraph spacing">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="5" y="3" width="9" height="1.2" rx="0.6" />
          <rect x="5" y="6.4" width="9" height="1.2" rx="0.6" />
          <rect x="5" y="9.8" width="9" height="1.2" rx="0.6" />
          <path d="M3 3.5L1.5 5.5 3 7.5M3 3.5h-1.5M3 7.5h-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" />
        </svg>
      </ToolbarBtn>

      {/* List */}
      <ToolbarBtn title="Bulleted list">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="3" cy="4.5" r="1.2" />
          <circle cx="3" cy="8" r="1.2" />
          <circle cx="3" cy="11.5" r="1.2" />
          <rect x="6" y="3.8" width="8" height="1.4" rx="0.7" />
          <rect x="6" y="7.3" width="8" height="1.4" rx="0.7" />
          <rect x="6" y="10.8" width="8" height="1.4" rx="0.7" />
        </svg>
      </ToolbarBtn>

      <div className="docs-toolbar-divider" />

      {/* Link / Comment */}
      <ToolbarBtn title="Insert link"><LinkIcon /></ToolbarBtn>
      <ToolbarBtn title="Insert comment"><CommentIcon /></ToolbarBtn>
    </div>
  );
}
