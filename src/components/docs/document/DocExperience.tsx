import Image from "next/image";
import { experience } from "@/data/content";
import InlineCursor from "../interactive/InlineCursor";

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
                  <Image src="/meta-logo.png" width={20} height={20} alt="Meta" style={{ display: "inline-block", verticalAlign: "middle" }} />{" "}
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
                    {j === 1 && <InlineCursor person="Kim L." slot={0} />}
                    {j === 3 && <InlineCursor person="Alex R." slot={1} />}
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
