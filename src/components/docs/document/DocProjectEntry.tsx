"use client";


import { AnimatePresence, motion } from "framer-motion";
import { type Project } from "@/data/content";
import DocDemoPlaceholder from "./DocDemoPlaceholder";

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.07 9h2.44c.1.85.3 1.65.56 2.37A6.02 6.02 0 0 1 1.07 9zm0-2h3c.1-.85.3-1.65.56-2.37A6.02 6.02 0 0 1 1.07 7zm5.96 7.93C5.94 14.16 5.07 12.69 4.56 11h4.88c-.51 1.69-1.38 3.16-2.41 3.93zM4.28 9h7.44a9.7 9.7 0 0 1-.1 2H4.38A9.7 9.7 0 0 1 4.28 9zm0-2a9.7 9.7 0 0 1 .1-2h7.24a9.7 9.7 0 0 1 .1 2H4.28zM6.97.07C7.98.84 8.86 2.31 9.38 4H4.62C5.14 2.31 6.02.84 7.03.07zM11.44 5c.26.72.46 1.52.56 2.37H14.93A6.02 6.02 0 0 0 11.44 5zm.56 4c-.1.85-.3 1.65-.56 2.37A6.02 6.02 0 0 0 14.93 9h-2.93zm-1.56 5.93C9.38 14.16 8.5 12.69 7.97 11h4.46c-.51 1.69-1.38 3.16-2.41 3.93z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
        flexShrink: 0,
      }}
    >
      <path d="M4 2.5L8 6L4 9.5" />
    </svg>
  );
}

interface DocProjectEntryProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function DocProjectEntry({ project, isExpanded, onToggle }: DocProjectEntryProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--docs-chrome-border)",
        paddingBottom: isExpanded ? "0" : "6px",
        marginBottom: "2px",
      }}
    >
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left"
        style={{
          background: "transparent",
          border: "none",
          padding: "6px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          gap: "6px",
        }}
      >
        {/* Chevron */}
        <span style={{ color: "var(--docs-text-muted)", paddingTop: "2px", flexShrink: 0 }}>
          <ChevronIcon open={isExpanded} />
        </span>

        {/* Title column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0, flex: 1 }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            {/* Title */}
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: isExpanded ? "var(--docs-accent)" : "var(--docs-text)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                transition: "color 0.15s ease",
              }}
            >
              {project.title}
            </span>

            {/* GitHub link */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  color: "var(--docs-text-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--docs-accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--docs-text-muted)")}
                title={`View ${project.title} on GitHub`}
              >
                <GitHubIcon />
              </a>
            )}

            {/* Live site link */}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  color: "var(--docs-text-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--docs-accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--docs-text-muted)")}
                title={`View ${project.title} live`}
              >
                <GlobeIcon />
              </a>
            )}

            {/* Tech tags */}
            <span className="flex items-center gap-1 flex-wrap">
              {project.tech.slice(0, 3).map(t => (
                <span key={t} className="doc-tag">{t}</span>
              ))}
              {project.tech.length > 3 && (
                <span
                  style={{
                    fontSize: "0.6rem",
                    color: "var(--docs-text-dim)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  +{project.tech.length - 3}
                </span>
              )}
            </span>
          </div>

          {/* Short description */}
          <span
            style={{
              fontSize: "0.6875rem",
              color: "var(--docs-text-muted)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.description}
          </span>
        </div>
      </button>

      {/* Always-visible: demo + description */}
      <div style={{ padding: "8px 0 0 18px" }}>
        {project.demo && <DocDemoPlaceholder video={project.demo} />}

        <p
          style={{
            fontSize: "0.6875rem",
            color: "var(--docs-text)",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            lineHeight: 1.65,
            marginBottom: "8px",
            whiteSpace: "pre-line",
          }}
        >
          {project.longDescription}
        </p>
      </div>

      {/* Expandable: tech + highlights + links */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 0 16px 18px" }}>
              {/* All tech tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.map(t => (
                  <span key={t} className="doc-tag">{t}</span>
                ))}
              </div>

              {/* Highlights */}
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--docs-text)",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  marginBottom: "4px",
                }}
              >
                Highlights
              </p>
              <ul style={{ paddingLeft: "16px", listStyleType: "disc" }}>
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--docs-text)",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      lineHeight: 1.6,
                      marginBottom: "2px",
                    }}
                  >
                    {h}
                  </li>
                ))}
              </ul>

              {/* Bottom links */}
              <div className="flex items-center gap-4 mt-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5"
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--docs-accent)",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
                  >
                    <GitHubIcon />
                    View on GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5"
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--docs-accent)",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
                  >
                    <GlobeIcon />
                    Live site
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
