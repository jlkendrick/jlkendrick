"use client";

import { CursorProvider } from "../interactive/CursorContext";
import { useDocsSettings, FONT_OPTIONS } from "../DocsSettingsContext";

export default function Paper({ children }: { children: React.ReactNode }) {
  const { fontFamily, fontSize } = useDocsSettings();
  const fontStack = FONT_OPTIONS.find(f => f.label === fontFamily)?.stack ?? null;

  return (
    <CursorProvider>
      <div
        style={{
          background: "var(--docs-paper)",
          width: "100%",
          minHeight: "1056px",
          padding: "96px",
          boxShadow: "0 1px 3px var(--docs-page-shadow), 0 4px 12px rgba(0,0,0,0.08)",
          position: "relative",
        }}
        className="paper-page"
      >
        <style>{`
          @media (max-width: 600px) {
            .paper-page { padding: 48px 40px !important; }
          }
          @media (max-width: 400px) {
            .paper-page { padding: 32px 24px !important; }
          }
          ${fontStack ? `.paper-page, .paper-page * { font-family: ${fontStack} !important; }` : ""}
        `}</style>
        {/* Font-size wrapper: scales content proportionally without changing paper dimensions */}
        <div style={{ zoom: fontSize / 11 }}>
          {children}
        </div>
      </div>
    </CursorProvider>
  );
}
