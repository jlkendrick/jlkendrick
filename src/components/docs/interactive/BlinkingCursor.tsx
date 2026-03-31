// Blinking text insertion cursor at the start of the document

export default function BlinkingCursor() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "1px",
        height: "1.15em",
        background: "var(--docs-text)",
        verticalAlign: "text-bottom",
        marginRight: "2px",
        animation: "blink-cursor 1s step-start infinite",
        borderRadius: "0.5px",
      }}
    />
  );
}
