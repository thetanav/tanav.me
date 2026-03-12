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
import { motion, AnimatePresence } from "motion/react";

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
          className="relative inline-flex h-7 w-7 items-center justify-center text-(--text) cursor-pointer outline-none overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mounted && current === "light" ? (
              <motion.div
                key="moon"
                initial={{ filter: "blur(1px)", opacity: 0.5, rotate: 45 }}
                animate={{ filter: "blur(0px)", opacity: 1, rotate: 0 }}
                exit={{ filter: "blur(1px)", opacity: 0.5, rotate: -45 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <MoonIcon className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ filter: "blur(1px)", opacity: 0.5, rotate: 45 }}
                animate={{ filter: "blur(0px)", opacity: 1, rotate: 0 }}
                exit={{ filter: "blur(1px)", opacity: 0.5, rotate: -45 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <SunIcon className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
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
