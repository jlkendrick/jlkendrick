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
const EMAIL = "jameslkendrick05@gmail.com";
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
          style={{ background: "rgba(0,0,0,0.3)" }}
          onClick={() => setShowWordCount(false)}
        >
          <div
            className="rounded shadow-xl p-6 w-72"
            style={{ background: "var(--docs-chrome)", border: "1px solid var(--docs-chrome-border)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-sm font-semibold mb-4" style={{ color: "var(--docs-text)" }}>
              Word count
            </div>
            <div className="space-y-1 text-sm" style={{ color: "var(--docs-text)" }}>
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
              className="mt-5 w-full text-sm py-1.5 rounded"
              style={{
                background: "var(--docs-accent)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
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
          style={{ background: "rgba(0,0,0,0.3)" }}
          onClick={() => setShowDownloadConfirm(false)}
        >
          <div
            className="rounded shadow-xl p-6 w-80"
            style={{ background: "var(--docs-chrome)", border: "1px solid var(--docs-chrome-border)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-sm font-semibold mb-1" style={{ color: "var(--docs-text)" }}>
              Download resume
            </div>
            <p className="text-xs mb-5" style={{ color: "var(--docs-text-muted)", lineHeight: 1.6 }}>
              This will download <span style={{ color: "var(--docs-text)" }}>{RESUME_FILENAME}</span> to your device.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowDownloadConfirm(false)}
                className="text-sm px-4 py-1.5 rounded"
                style={{
                  background: "transparent",
                  color: "var(--docs-text-muted)",
                  border: "1px solid var(--docs-chrome-border)",
                  cursor: "pointer",
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
                className="text-sm px-4 py-1.5 rounded"
                style={{
                  background: "var(--docs-accent)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
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
        position="bottom-left"
        theme="dark"
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
