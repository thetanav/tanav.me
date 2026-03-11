"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const navItems = {
  "/": {
    name: "Home",
  },
  "/blog": {
    name: "Blogs",
  },
  "/projects": {
    name: "Projects",
  },
  "/experience": {
    name: "Experience",
  },
  "/ai": {
    name: "AI",
  },
};

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="flex items-center gap-4 text-xs sm:text-sm font-medium overflow-hidden">
      {Object.entries(navItems).map(([path, { name }], index) => {
        return (
          <div key={path}>
            <Link
              href={path}
              className="transition-colors text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              {name}
            </Link>
          </div>
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
