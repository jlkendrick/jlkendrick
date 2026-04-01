import { skills } from "@/data/content";
import InlineCursor from "../interactive/InlineCursor";

export default function DocSkills() {
  return (
    <section className="mb-2">
      <h2 className="docs-section-heading">Technical Skills</h2>
      <hr className="docs-rule" />

      <div
        className="space-y-2"
        style={{ marginTop: "6px" }}
      >
        {skills.map((category, ci) => (
          <div
            key={category.label}
            className="flex flex-wrap items-baseline gap-x-1"
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: "var(--docs-text)",
                minWidth: "100px",
                flexShrink: 0,
              }}
            >
              {category.label}:
            </span>
            <span style={{ color: "var(--docs-text-muted)" }}>
              {category.items.map((item, i) => (
                <span key={item}>
                  <span
                    style={{ cursor: "default" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(212,136,42,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "var(--docs-accent)";
                      (e.currentTarget as HTMLElement).style.borderRadius = "2px";
                      (e.currentTarget as HTMLElement).style.padding = "0 2px";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--docs-text-muted)";
                      (e.currentTarget as HTMLElement).style.padding = "0";
                    }}
                  >
                    {item}
                  </span>
                  {i < category.items.length - 1 && (
                    <span style={{ color: "var(--docs-chrome-border)", margin: "0 2px" }}>·</span>
                  )}
                  {/* Cursor after last item in Languages (ci=0) and Concepts (ci=3) */}
                  {i === category.items.length - 1 && ci === 0 && (
                    <InlineCursor initialIdx={2} delay={3500} interval={10000} />
                  )}
                  {i === category.items.length - 1 && ci === 3 && (
                    <InlineCursor initialIdx={1} delay={8000} interval={15000} />
                  )}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
