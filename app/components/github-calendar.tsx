"use client";

import GitHubCalendar from "react-github-calendar";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export default function GithubCalendarClient({
  username = "thetanav",
  blockSize = 1,
}: {
  username?: string;
  blockSize?: number;
}) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // prefer class-based theming (html.classList contains 'dark') used by next-themes
    const classBased = document.documentElement.classList.contains("dark");
    const saved = classBased
      ? "dark"
      : document.documentElement.getAttribute("data-theme") ||
        localStorage.getItem("theme") ||
        "light";

    setTheme(saved);

    // observe class or data-theme attribute changes so the calendar updates when theme changes
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes") {
          if (m.attributeName === "class") {
            const isDark = document.documentElement.classList.contains("dark");
            setTheme(isDark ? "dark" : "light");
          } else if (m.attributeName === "data-theme") {
            const newTheme =
              document.documentElement.getAttribute("data-theme") || "light";
            setTheme(newTheme);
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-fit left-1/2 -translate-x-1/2 overflow-visible bg-background">
      <GitHubCalendar
        loading={false}
        style={{
          width: "full",
        }}
        blockRadius={0}
        username={username}
        colorScheme={theme === "dark" ? "dark" : "light"}
        blockSize={blockSize}
      />
    </div>
  );
}
