"use client";

import { createContext, useContext, useState } from "react";

// stack: null means "leave inline styles as-is" (original mixed Cormorant/Inter look)
export const FONT_OPTIONS = [
  { label: "Default", stack: null },
  { label: "Cormorant Garamond", stack: "var(--font-cormorant), Georgia, serif" },
  { label: "Inter", stack: "var(--font-inter), system-ui, sans-serif" },
  { label: "Georgia", stack: "Georgia, Times New Roman, serif" },
  { label: "Arial", stack: "Arial, Helvetica, sans-serif" },
  { label: "Times New Roman", stack: '"Times New Roman", Times, serif' },
  { label: "Courier New", stack: '"Courier New", Courier, monospace' },
];

export const FONT_SIZE_OPTIONS = [8, 9, 10, 11, 12, 14, 18, 24, 36];

export const ZOOM_OPTIONS = [50, 75, 90, 100, 110, 125, 150, 200];

interface DocsSettings {
  fontFamily: string;
  fontSize: number;
  zoom: number;
  setFontFamily: (f: string) => void;
  setFontSize: (n: number) => void;
  setZoom: (z: number) => void;
}

const DocsSettingsContext = createContext<DocsSettings>({
  fontFamily: "Default",
  fontSize: 11,
  zoom: 100,
  setFontFamily: () => {},
  setFontSize: () => {},
  setZoom: () => {},
});

export function DocsSettingsProvider({ children }: { children: React.ReactNode }) {
  const [fontFamily, setFontFamily] = useState("Default");
  const [fontSize, setFontSize] = useState(11);
  const [zoom, setZoom] = useState(100);

  return (
    <DocsSettingsContext.Provider value={{ fontFamily, fontSize, zoom, setFontFamily, setFontSize, setZoom }}>
      {children}
    </DocsSettingsContext.Provider>
  );
}

export const useDocsSettings = () => useContext(DocsSettingsContext);
