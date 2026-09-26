"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;

      if (currentY <= 180) {
        setVisible(false);
      } else if (scrollingDown) {
        setVisible(true);
      } else {
        // Hide while the user is moving back upward so the control
        // never sits over content while they are already heading home.
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
      className={[
        "fixed left-1/2 bottom-5 z-[60] -translate-x-1/2",
        "flex h-10 w-10 items-center justify-center rounded-full",
        "border border-white/25 bg-slate-950/45 text-white/80",
        "shadow-lg backdrop-blur-sm",
        "transition-all duration-200 ease-out",
        "hover:bg-slate-950/65 hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
        "active:scale-95",
        visible
          ? "pointer-events-auto translate-y-0 opacity-65"
          : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2.25} />
    </button>
  );
}
