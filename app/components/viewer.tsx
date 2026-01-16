"use client";
import { EyeIcon, Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewsLast24() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/view-count")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(null));
  }, []);

  return (
    <div className="flex gap-2 items-center justify-center opacity-40">
      <EyeIcon className="w-4 h-4" />
      {!count || count === undefined ? (
        <Loader className="text(--text-muted) animate-spin w-4" />
      ) : (
        <span className="text-(--text) text-sm font-semibold">{count}</span>
      )}
    </div>
  );
}
