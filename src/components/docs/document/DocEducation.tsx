import { education } from "@/data/content";

export default function DocEducation() {
  return (
    <section className="mb-5">
      <h2 className="docs-section-heading">Education</h2>
      <hr className="docs-rule" />

      <div
        className="flex justify-between items-start flex-wrap gap-1"
        style={{ marginTop: "6px" }}
      >
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--docs-text)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            {education.school}
          </p>
          <p
            style={{
              fontSize: "0.6875rem",
              color: "var(--docs-text)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              marginTop: "1px",
            }}
          >
            {education.degree}
          </p>
          <p
            style={{
              fontSize: "0.6875rem",
              color: "var(--docs-text-muted)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              marginTop: "1px",
            }}
          >
            GPA: {education.gpa}
          </p>
        </div>
        <div className="text-right">
          <p
            style={{
              fontSize: "0.6875rem",
              color: "var(--docs-text-muted)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            {education.period}
          </p>
        </div>
      </div>

      <p
        style={{
          fontSize: "0.6875rem",
          color: "var(--docs-text-muted)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          marginTop: "5px",
        }}
      >
        <span style={{ color: "var(--docs-text)", fontWeight: 500 }}>Relevant Courses: </span>
        {education.courses.join(" · ")}
      </p>
    </section>
  );
}
