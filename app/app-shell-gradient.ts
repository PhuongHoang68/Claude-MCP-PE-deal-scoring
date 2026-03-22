import type { CSSProperties } from "react";

/**
 * Full-viewport background (fixed). Inline styles so the gradient always applies
 * regardless of CSS merge / Tailwind order issues.
 */
export const appShellGradientLayerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  pointerEvents: "none",
  backgroundColor: "#070d18",
  backgroundImage: [
    "repeating-linear-gradient(0deg, transparent 0, transparent 47px, rgba(148,163,184,0.04) 47px, rgba(148,163,184,0.04) 48px)",
    "repeating-linear-gradient(90deg, transparent 0, transparent 47px, rgba(148,163,184,0.035) 47px, rgba(148,163,184,0.035) 48px)",
    "radial-gradient(ellipse 130% 95% at 50% -5%, rgba(34,211,238,0.26), transparent 65%)",
    "radial-gradient(ellipse 90% 75% at 100% 20%, rgba(129,140,248,0.22), transparent 55%)",
    "radial-gradient(ellipse 95% 80% at 0% 85%, rgba(6,182,212,0.18), transparent 60%)",
    "radial-gradient(ellipse 110% 90% at 50% 108%, rgba(99,102,241,0.15), transparent 62%)",
    "radial-gradient(ellipse 65% 55% at 92% 94%, rgba(167,139,250,0.14), transparent 58%)",
    "linear-gradient(175deg, #0f1a2e 0%, #0c1524 25%, #0a1628 50%, #0b1522 72%, #081018 100%)"
  ].join(", "),
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat"
};
