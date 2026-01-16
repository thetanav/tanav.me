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
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80">
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent
        className="border border-(--border) dark:border-neutral-500"
        sideOffset={10}>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
