"use client";

import { Share1Icon } from "@radix-ui/react-icons";

export const Share = () => {
  return (
    <button
      type="button"
      onClick={async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: document.title,
              text: "Check out this page!",
              url: window.location.href,
            });
          } catch (err) {
            console.log("Sharing cancelled", err);
          }
        } else {
          alert(
            "Your browser doesn’t support Web Share API. Copy link: " +
              window.location.href,
          );
        }
      }}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-background px-4 text-xs font-medium uppercase tracking-[0.3em] text-foreground transition-colors hover:bg-muted"
    >
      <Share1Icon className="h-4 w-4" aria-hidden="true" />
      share
    </button>
  );
};
