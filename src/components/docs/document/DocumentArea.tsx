"use client";

import Paper from "./Paper";
import DocHeader from "./DocHeader";
import DocAbout from "./DocSummary";
import DocEducation from "./DocEducation";
import DocExperience from "./DocExperience";
import DocProjects from "./DocProjects";
import DocSkills from "./DocSkills";
import DocInterests from "./DocAbout";
import PageBreak from "./PageBreak";
import MarginComment from "../interactive/MarginComment";
import { useDocsSettings } from "../DocsSettingsContext";

interface DocumentAreaProps {
  expandedProjectId: string | null;
  onToggleProject: (id: string) => void;
  focusMode: boolean;
}

const COMMENTS = [
  { text: "Terabytes? Casual.", author: "Kim L.", color: "var(--docs-cursor-2)", topOffset: 830 },
  { text: "Wait, 10⁹ combinations??", author: "Alex R.", color: "var(--docs-cursor-1)", topOffset: 1178 },
  { text: "Go AND Haskell? Show-off.", author: "M. Park", color: "var(--docs-cursor-3)", topOffset: 1438 },
];

export default function DocumentArea({ expandedProjectId, onToggleProject, focusMode }: DocumentAreaProps) {
  const { zoom } = useDocsSettings();

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ background: "var(--docs-bg)" }}
    >
      {/* Zoom wrapper — scales paper and comments together */}
      <div
        className="relative"
        style={{
          zoom: zoom / 100,
          paddingTop: "24px",
          paddingBottom: "80px",
        }}
      >
        {/* Centered paper column */}
        <div className="flex justify-center">
          <div className="relative w-full" style={{ maxWidth: "816px", margin: "0 24px" }}>
            <Paper>
              <DocHeader />
              <DocAbout />
              <PageBreak />
              <DocEducation />
              <PageBreak />
              <DocExperience />
              <PageBreak />
              <DocProjects
                expandedProjectId={expandedProjectId}
                onToggle={onToggleProject}
              />
              <PageBreak />
              <DocSkills />
              <PageBreak />
              <DocInterests />
            </Paper>
          </div>
        </div>

        {/* Margin comments — inside zoom wrapper so they scale with the document */}
        {!focusMode && COMMENTS.map((c, i) => (
          <MarginComment
            key={i}
            text={c.text}
            author={c.author}
            color={c.color}
            topOffset={c.topOffset}
          />
        ))}
      </div>
    </div>
  );
}
