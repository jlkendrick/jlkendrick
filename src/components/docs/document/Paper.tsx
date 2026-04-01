import { CursorProvider } from "../interactive/CursorContext";

export default function Paper({ children }: { children: React.ReactNode }) {
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
            .paper-page {
              padding: 48px 40px !important;
            }
          }
          @media (max-width: 400px) {
            .paper-page {
              padding: 32px 24px !important;
            }
          }
        `}</style>
        {children}
      </div>
    </CursorProvider>
  );
}
