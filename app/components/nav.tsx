"use client";

import {
  BrainCircuit,
  BrainCircuitIcon,
  ChevronLeft,
  Ghost,
  GhostIcon,
  Home,
  HomeIcon,
  Notebook,
  NotebookIcon,
  Presentation,
  PresentationIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useHotkey } from "@tanstack/react-hotkeys";

const navItems = {
  "/": {
    name: "Home",
    icon: <Home />,
    short: "h",
  },
  "/blog": {
    name: "Blogs",
    icon: <Notebook />,
    short: "b",
  },
  "/projects": {
    name: "Projects",
    icon: <Presentation />,
    short: "p",
  },
  "/experience": {
    name: "Experience",
    icon: <Ghost />,
    short: "e",
  },
  // "/ai": {
  //   name: "AI",
  //   icon: <BrainCircuit />,
  //   short: "a",
  // },
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // useHotkey("A", () => router.push("/ai"));
  useHotkey("P", () => router.push("/projects"));
  useHotkey("E", () => router.push("/experience"));
  useHotkey("B", () => router.push("/blog"));
  useHotkey("H", () => router.push("/"));

  return (
    <nav className="flex items-center justify-center gap-4 text-xs sm:text-sm font-medium overflow-hiddens ml-2">
      {Object.entries(navItems).map(([path, { name, icon, short }], index) => {
        return (
          <Tooltip key={path}>
            <TooltipTrigger asChild>
              <Link href={path}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`group transition-colors text-muted-foreground hover:text-primary flex gap-1 items-center justify-center duration-300 size-4 ${pathname == path && "text-primary"}`}
                >
                  {icon}
                </motion.div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {name}{" "}
                <KbdGroup>
                  <Kbd>{short.toUpperCase()}</Kbd>
                </KbdGroup>
              </p>
            </TooltipContent>
          </Tooltip>
        );
      })}
      <Shimmer text={"Open to work"} />
    </nav>
  );
}

export default function Shimmer({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`inline-block select-none ${className}`}>
      <div className="relative overflow-hidden">
        {/* Base text */}
        <span className="text-(--text)/40">{text}</span>

        {/* Shimmering overlay */}
        <div
          className="absolute bg-clip-text text-transparent bg-gradient-to-r from-transparent via-(--text) to-transparent z-10 top-0 left-0 right-0 [background-size:50%_100%] [background-repeat:no-repeat]"
          style={{
            animation: "wave 2s linear infinite",
          }}
        >
          <style jsx>{`
            @keyframes wave {
              0% {
                background-position: -150% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
          `}</style>
          {text}
        </div>
      </div>
    </div>
  );
}
