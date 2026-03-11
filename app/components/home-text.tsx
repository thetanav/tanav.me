"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export default function HomeText({ className = "" }: { className?: string }) {
  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="flex justify-center select-none">
      {"Hi! I am".split("").map((current, i) => (
        <motion.div
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          custom={i}
          className={cn(
            "text-3xl font-semibold text-(--text-muted)",
            className,
          )}
        >
          {current == " " ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
      <div className="w-2" />
      {"Tanav".split("").map((current, i) => (
        <motion.div
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          custom={i}
          className={cn("text-3xl font-semibold text-(--text)", className)}
        >
          {current == " " ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
}
