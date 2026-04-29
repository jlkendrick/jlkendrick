"use client";

import { useState, useCallback, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { person, projects, experience, education, skills } from "@/data/content";
import TitleBar from "./chrome/TitleBar";
import MenuBar from "./chrome/MenuBar";
import FormattingToolbar from "./chrome/FormattingToolbar";
import Ruler from "./chrome/Ruler";
import DocumentArea from "./document/DocumentArea";
import StatusBar from "./status/StatusBar";
import ShortcutsModal from "./ShortcutsModal";
import { DocsSettingsProvider } from "./DocsSettingsContext";

const RESUME_PATH = "/resume.pdf";
const RESUME_FILENAME = "James-Kendrick-Resume.pdf";
const EMAIL = "kendrickj5@yahoo.com";
const REPO_URL = "https://github.com/jlkendrick/jlkendrick";

function computeWordCount(): number {
  const chunks: string[] = [
    person.name, person.title, person.subtitle, person.bio,
    education.school, education.degree, education.gpa,
    ...education.courses,
    ...experience.flatMap(e => [e.company, e.role, e.location, e.period, ...e.bullets]),
    ...projects.flatMap(p => [p.title, p.description, p.longDescription, ...p.highlights, ...p.tech]),
    ...skills.flatMap(s => [s.label, ...s.items]),
  ];
  const totalChars = chunks.join(" ").length;
  return Math.round(totalChars / 5);
}

const WORD_COUNT = computeWordCount();

function doDownload() {
  const a = document.createElement("a");
  a.href = RESUME_PATH;
  a.download = RESUME_FILENAME;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function printDoc() {
  window.print();
}

export default function DocsShell() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [showWordCount, setShowWordCount] = useState(false);
  const [showRuler, setShowRuler] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);

  const toggleProject = useCallback((id: string) => {
    setExpandedProjectId(prev => (prev === id ? null : id));
  }, []);

  const toggleMenu = useCallback((key: string) => {
    setOpenMenuKey(prev => (prev === key ? null : key));
  }, []);

  const closeMenus = useCallback(() => setOpenMenuKey(null), []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied to clipboard");
    } catch {
      toast("Copy failed — " + url);
    }
  }, []);

  useEffect(() => {
    const projectIds = new Set(projects.map(p => p.id));

    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      const match = hash.match(/^project-(.+)$/);
      if (!match || !projectIds.has(match[1])) return;

      setExpandedProjectId(match[1]);
      requestAnimationFrame(() => {
        document.getElementById(`project-${match[1]}`)?.scrollIntoView({ block: "start" });
      });
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        toast("All changes saved to Drive");
        return;
      }
      if (mod && e.key === "\\") {
        e.preventDefault();
        setFocusMode(f => !f);
        return;
      }
      if (mod && e.key === "/") {
        e.preventDefault();
        setShowShortcuts(true);
        return;
      }
      if (e.key === "Escape" && focusMode) {
        e.preventDefault();
        setFocusMode(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusMode]);

  return (
    <DocsSettingsProvider>
    <div className="flex flex-col h-dvh overflow-hidden" style={{ background: "var(--docs-bg)" }}>
      {!focusMode && <TitleBar onShare={handleShare} />}
      {!focusMode && (
        <MenuBar
          openKey={openMenuKey}
          onToggle={toggleMenu}
          onClose={closeMenus}
          onFocusMode={() => { setFocusMode(true); closeMenus(); }}
          onWordCount={() => { setShowWordCount(true); closeMenus(); }}
          onDownload={() => { setShowDownloadConfirm(true); closeMenus(); }}
          onPrint={() => { printDoc(); closeMenus(); }}
          onEmail={() => { window.location.href = `mailto:${EMAIL}`; closeMenus(); }}
          onMakeCopy={() => { window.open(REPO_URL, "_blank", "noopener,noreferrer"); closeMenus(); }}
          onToggleRuler={() => { setShowRuler(r => !r); closeMenus(); }}
          onShowShortcuts={() => { setShowShortcuts(true); closeMenus(); }}
          showRuler={showRuler}
        />
      )}
      {!focusMode && <FormattingToolbar onPrint={printDoc} />}
      {!focusMode && showRuler && <Ruler />}

      <DocumentArea
        expandedProjectId={expandedProjectId}
        onToggleProject={toggleProject}
        focusMode={focusMode}
      />

      {!focusMode && <StatusBar wordCount={WORD_COUNT} />}

      {/* Focus mode exit bar */}
      {focusMode && (
        <button
          onClick={() => setFocusMode(false)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded-full shadow-md z-50"
          style={{
            background: "var(--docs-chrome)",
            border: "1px solid var(--docs-chrome-border)",
            color: "var(--docs-text-muted)",
          }}
        >
          Exit Focus Mode
        </button>
      )}

      {/* Word Count Modal */}
      {showWordCount && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(15, 23, 42, 0.32)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
          onClick={() => setShowWordCount(false)}
        >
          <div
            className="w-80"
            style={{
              background: "var(--docs-chrome)",
              border: "1px solid var(--docs-chrome-border)",
              borderRadius: "12px",
              boxShadow: "0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)",
              padding: "20px 22px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="font-semibold"
              style={{
                color: "var(--docs-text)",
                fontSize: "0.9375rem",
                marginBottom: "14px",
                letterSpacing: "-0.01em",
              }}
            >
              Word count
            </div>
            <div
              style={{
                color: "var(--docs-text)",
                fontSize: "0.8125rem",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div className="flex justify-between">
                <span style={{ color: "var(--docs-text-muted)" }}>Words</span>
                <span>{WORD_COUNT.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--docs-text-muted)" }}>Characters</span>
                <span>{(WORD_COUNT * 5).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--docs-text-muted)" }}>Pages</span>
                <span>2</span>
              </div>
            </div>
            <button
              onClick={() => setShowWordCount(false)}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--docs-accent-hi)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--docs-accent)"; }}
              className="w-full"
              style={{
                marginTop: "20px",
                background: "var(--docs-accent)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "999px",
                transition: "background 0.15s ease",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Download Confirmation Modal */}
      {showDownloadConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(15, 23, 42, 0.32)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
          onClick={() => setShowDownloadConfirm(false)}
        >
          <div
            style={{
              background: "var(--docs-chrome)",
              border: "1px solid var(--docs-chrome-border)",
              borderRadius: "12px",
              boxShadow: "0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)",
              padding: "20px 22px",
              width: "22rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="font-semibold"
              style={{
                color: "var(--docs-text)",
                fontSize: "0.9375rem",
                marginBottom: "6px",
                letterSpacing: "-0.01em",
              }}
            >
              Download resume
            </div>
            <p
              style={{
                color: "var(--docs-text-muted)",
                fontSize: "0.8125rem",
                lineHeight: 1.55,
                marginBottom: "18px",
              }}
            >
              This will download <span style={{ color: "var(--docs-text)" }}>{RESUME_FILENAME}</span> to your device.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowDownloadConfirm(false)}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--docs-bg)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                style={{
                  background: "transparent",
                  color: "var(--docs-text)",
                  border: "1px solid var(--docs-chrome-border)",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  padding: "7px 16px",
                  borderRadius: "999px",
                  transition: "background 0.15s ease",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDownloadConfirm(false);
                  doDownload();
                  toast("Downloading resume…");
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = "var(--docs-accent-hi)";
                  el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = "var(--docs-accent)";
                  el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.08)";
                }}
                style={{
                  background: "var(--docs-accent)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  padding: "7px 18px",
                  borderRadius: "999px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                  transition: "background 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <ShortcutsModal open={showShortcuts} onClose={() => setShowShortcuts(false)} />

      <Toaster
        position="bottom-right"
        theme="light"
        toastOptions={{
          style: {
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.8125rem",
          },
        }}
      />
    </div>
    </DocsSettingsProvider>
  );
}
