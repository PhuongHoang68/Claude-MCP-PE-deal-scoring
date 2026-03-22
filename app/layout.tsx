import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "PE Deal Intake Copilot",
  description: "One-screen deterministic PE deal triage demo"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
