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
import type { ReactNode } from "react";

interface DocumentAreaProps {
  expandedProjectId: string | null;
  onToggleProject: (id: string) => void;
  focusMode: boolean;
}

const COMMENTS: { text: ReactNode; author: string; color: string; topOffset: number }[] = [
  {
    text: (
      <>
        Prefer a PDF?{" "}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ color: "var(--docs-accent)", textDecoration: "underline", fontWeight: 600 }}
        >
          jlkendrick.dev/resume.pdf
        </a>
      </>
    ),
    author: "James K.",
    color: "var(--docs-accent)",
    topOffset: 60,
  },
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
