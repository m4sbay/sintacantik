import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "simoe",
  description: "Platform latihan soal pribadi untuk belajar, menguji pemahaman, dan mengevaluasi jawaban.",
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("sintacantik-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "light" || stored === "dark" ? stored : (systemDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
