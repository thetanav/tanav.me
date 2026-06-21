"use client";

import { Marquee } from "@/components/ui/marquee";
import { techlist } from "@/lib/tech";

export const TechMarquee = () => {
  const firstRow = techlist.slice(0, techlist.length / 2);
  const secondRow = techlist.slice(techlist.length / 2);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((itm) => (
          <div
            key={itm.name}
            className="flex items-center gap-2 mx-2 text-(--text-muted)"
          >
            <span aria-hidden="true">{itm.logo}</span>
            <p className="font-semibold text-sm">{itm.name}</p>
          </div>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {secondRow.map((itm) => (
          <div
            key={itm.name}
            className="flex items-center gap-2 mx-2 text-(--text-muted)"
          >
            <span aria-hidden="true">{itm.logo}</span>
            <p className=" font-semibold text-sm">{itm.name}</p>
          </div>
        ))}
      </Marquee>
      <div
        aria-hidden="true"
        className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"
      />
      <div
        aria-hidden="true"
        className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"
      />
    </div>
  );
};
