"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useWebHaptics } from "web-haptics/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { trigger, cancel } = useWebHaptics();

  useEffect(() => {
    setMounted(true);
    cancel();
  }, []);

  const current = resolvedTheme || theme || "light";

  const toggleTheme = () => {
    trigger([{ duration: 35 }], { intensity: 1 });
    setTheme(current === "light" ? "dark" : "light");
  };

  useHotkey("D", () => {
    toggleTheme();
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleTheme}
          className="inline-flex h-7 w-7 items-center justify-center text-(--text) active:translate-y-px cursor-pointer outline-none"
        >
          {mounted && current === "light" ? (
            <MoonIcon className="w-4 h-4" />
          ) : (
            <SunIcon className="w-4 h-4" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          Toggle Theme{" "}
          <KbdGroup>
            <Kbd>D</Kbd>
          </KbdGroup>
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
