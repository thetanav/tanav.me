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
    <div className="w-full flex items-center justify-center overflow-clip bg-background">
      <GitHubCalendar
        loading={false}
        style={{
          width: "fit-content",
        }}
        blockRadius={2}
        username={username}
        colorScheme={theme === "dark" ? "dark" : "light"}
        theme={{
          light: ["#e5e5e5", "#a3a3a3", "#737373", "#525252", "#111111"],
          dark: ["#262626", "#52525b", "#71717a", "#a1a1aa", "#ededed"],
        }}
        blockSize={blockSize}
      />
    </div>
  );
}
