"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const PEOPLE = {
  "Alex R.": { color: "#1A73E8", slotCount: 2, interval: 12000, initialDelay: 1000 },
  "Kim L.":  { color: "#E8710A", slotCount: 2, interval: 10000, initialDelay: 3200 },
  "M. Park": { color: "#1E8E3E", slotCount: 2, interval: 14000, initialDelay: 5500 },
} as const;

export type PersonName = keyof typeof PEOPLE;

// -1 means "in transit" (briefly hidden while switching slots)
type ActiveSlots = Record<PersonName, number>;

interface CursorCtx {
  activeSlots: ActiveSlots;
  isMobile: boolean;
}

const CursorContext = createContext<CursorCtx>({
  activeSlots: { "Alex R.": 0, "Kim L.": 0, "M. Park": 0 },
  isMobile: false,
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlots, setActiveSlots] = useState<ActiveSlots>({
    "Alex R.": 0,
    "Kim L.": 0,
    "M. Park": 0,
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Track current real slot per person outside of state so the interval always sees fresh values
    const currentSlot: Record<PersonName, number> = {
      "Alex R.": 0,
      "Kim L.": 0,
      "M. Park": 0,
    };

    const intervalIds: ReturnType<typeof setInterval>[] = [];
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    (Object.keys(PEOPLE) as PersonName[]).forEach(name => {
      const { interval, initialDelay, slotCount } = PEOPLE[name];

      const delayId = setTimeout(() => {
        const id = setInterval(() => {
          const next = (currentSlot[name] + 1) % slotCount;
          currentSlot[name] = next;

          // Fade out current slot, then fade in next slot
          setActiveSlots(prev => ({ ...prev, [name]: -1 }));
          const switchId = setTimeout(() => {
            setActiveSlots(prev => ({ ...prev, [name]: next }));
          }, 220);
          timeoutIds.push(switchId);
        }, interval + Math.random() * 3000);

        intervalIds.push(id);
      }, initialDelay);

      timeoutIds.push(delayId);
    });

    return () => {
      intervalIds.forEach(clearInterval);
      timeoutIds.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <CursorContext.Provider value={{ activeSlots, isMobile }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  return useContext(CursorContext);
}
