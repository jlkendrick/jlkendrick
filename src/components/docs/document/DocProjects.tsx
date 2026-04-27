import { projects } from "@/data/content";
import DocProjectEntry from "./DocProjectEntry";

interface DocProjectsProps {
  expandedProjectId: string | null;
  onToggle: (id: string) => void;
}

export default function DocProjects({ expandedProjectId, onToggle }: DocProjectsProps) {
  return (
    <section id="projects" className="mb-5" style={{ scrollMarginTop: "8px" }}>
      <h2 className="docs-section-heading">Projects</h2>
      <hr className="docs-rule" />

      <p
        style={{
          fontSize: "0.6rem",
          color: "var(--docs-text-dim)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          marginBottom: "6px",
          fontStyle: "italic",
        }}
      >
        Click a project to expand details →
      </p>

      <div>
        {projects.map(project => (
          <DocProjectEntry
            key={project.id}
            project={project}
            isExpanded={expandedProjectId === project.id}
            onToggle={() => onToggle(project.id)}
          />
        ))}
      </div>
    </section>
  );
}
