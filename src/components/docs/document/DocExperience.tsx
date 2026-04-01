import { experience } from "@/data/content";
import InlineCursor from "../interactive/InlineCursor";

function MetaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 100 100" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <ellipse cx="50" cy="50" rx="48" ry="48" fill="none" stroke="var(--docs-accent)" strokeWidth="4" />
      <text x="50" y="67" textAnchor="middle" fontSize="52" fontWeight="700" fill="var(--docs-accent)" fontFamily="Arial, sans-serif">M</text>
    </svg>
  );
}

export default function DocExperience() {
  return (
    <section className="mb-5">
      <h2 className="docs-section-heading">Experience</h2>
      <hr className="docs-rule" />

      <div className="space-y-5" style={{ marginTop: "6px" }}>
        {experience.map((exp, i) => (
          <div key={i}>
            <div className="flex justify-between items-start flex-wrap gap-1">
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--docs-text)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  <MetaIcon />{" "}
                  <span style={{ marginLeft: "4px" }}>{exp.company}</span>
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--docs-text-muted)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  · {exp.role}
                </span>
                {exp.status === "incoming" && (
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      color: "var(--docs-accent)",
                      border: "1px solid var(--docs-accent)",
                      borderRadius: "3px",
                      padding: "0 5px",
                      lineHeight: "16px",
                      letterSpacing: "0.03em",
                    }}
                  >
                    INCOMING
                  </span>
                )}
              </div>
              <div className="text-right">
                <p
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--docs-text-muted)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  {exp.period}
                </p>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--docs-text-muted)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  {exp.location}
                </p>
              </div>
            </div>

            {exp.status !== "incoming" && exp.bullets.length > 0 && (
              <ul
                style={{
                  marginTop: "5px",
                  paddingLeft: "16px",
                  listStyleType: "disc",
                }}
              >
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--docs-text)",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      lineHeight: 1.65,
                      marginBottom: "2px",
                    }}
                  >
                    {bullet}
                    {j === 1 && <InlineCursor initialIdx={1} delay={2500} interval={14000} />}
                    {j === 3 && <InlineCursor initialIdx={0} delay={7000} interval={12000} />}
                  </li>
                ))}
              </ul>
            )}

            {exp.status === "incoming" && (
              <p
                style={{
                  marginTop: "4px",
                  fontSize: "0.6875rem",
                  color: "var(--docs-text-muted)",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontStyle: "italic",
                }}
              >
                Incoming for {exp.period} off-cycle.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
