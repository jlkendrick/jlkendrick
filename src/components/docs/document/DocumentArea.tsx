import Paper from "./Paper";
import DocHeader from "./DocHeader";
import DocAbout from "./DocSummary";
import DocEducation from "./DocEducation";
import DocExperience from "./DocExperience";
import DocProjects from "./DocProjects";
import DocSkills from "./DocSkills";
import DocInterests from "./DocAbout";
import PageBreak from "./PageBreak";
import BlinkingCursor from "../interactive/BlinkingCursor";
import MarginComment from "../interactive/MarginComment";
import CollabCursors from "../interactive/CollabCursors";

interface DocumentAreaProps {
  expandedProjectId: string | null;
  onToggleProject: (id: string) => void;
  focusMode: boolean;
}

const COMMENTS = [
  { text: "This font pairing is *chef's kiss*", author: "Alex R.", color: "var(--docs-cursor-1)", topOffset: 60 },
  { text: "Terabytes? Casual.", author: "Kim L.", color: "var(--docs-cursor-2)", topOffset: 520 },
  { text: "Wait, 10⁹ combinations??", author: "Alex R.", color: "var(--docs-cursor-1)", topOffset: 860 },
  { text: "Rust AND Haskell? Show-off.", author: "M. Park", color: "var(--docs-cursor-3)", topOffset: 1280 },
];

export default function DocumentArea({ expandedProjectId, onToggleProject, focusMode }: DocumentAreaProps) {
  return (
    <div
      className="flex-1 overflow-y-auto relative"
      style={{
        background: "var(--docs-bg)",
        paddingTop: "24px",
        paddingBottom: "80px",
      }}
    >
      {/* Centered paper column */}
      <div className="flex justify-center">
        <div className="relative w-full" style={{ maxWidth: "816px", margin: "0 24px" }}>
          <Paper>
            <BlinkingCursor />
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

      {/* Margin comments — positioned relative to document area */}
      {!focusMode && COMMENTS.map((c, i) => (
        <MarginComment
          key={i}
          text={c.text}
          author={c.author}
          color={c.color}
          topOffset={c.topOffset}
        />
      ))}

      {/* Collaborative cursors */}
      {!focusMode && <CollabCursors />}
    </div>
  );
}
