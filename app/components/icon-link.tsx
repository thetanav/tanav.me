"use client";

import { Tooltip } from "@/components/ui/tooltip-card";

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
    <Tooltip
      containerClassName="text-neutral-600 dark:text-neutral-400 p-0"
      content={<TooltipCard />}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-80 hover:opacity-100">
        {children}
      </a>
    </Tooltip>
  );
}

const TooltipCard = () => {
  return (
    <div>
      <img
        src="https://assets.aceternity.com/screenshots/tyler.webp"
        className="aspect-video w-full rounded-sm"
      />
    </div>
  );
};
