import "./globals.css";
import type { ReactNode } from "react";
import { appShellGradientLayerStyle } from "./app-shell-gradient";

export const metadata = {
  title: "PE Deal Intake Copilot",
  description: "One-screen deterministic PE deal triage demo"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: "#070d18", minHeight: "100%" }}>
      <body className="deals-app-shell antialiased">
        {/* Inline styles = gradient always paints (not dependent on globals.css merge order) */}
        <div style={appShellGradientLayerStyle} aria-hidden />
        {children}
      </body>
    </html>
  );
}
