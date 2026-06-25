"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function IconLink({
  tooltip,
  link,
  children,
}: {
  tooltip: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tooltip}
            className="opacity-80 hover:opacity-100 hover:scale-105 text-neutral-700 dark:text-neutral-300 overflow-y-visible transition"
          >
            {children}
          </a>
        }
      />
      <TooltipContent side="bottom">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
