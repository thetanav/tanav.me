import { ChartNoAxesColumn, EyeIcon } from "lucide-react";
import axios from "axios";

export default async function ViewsLast24() {
  const { data } = await axios("https://tanav.me/api/view-count");

  return (
    <div className="flex gap-1 items-center justify-center opacity-40">
      <ChartNoAxesColumn className="w-4 h-4" />
      <span className="text-(--text) text-sm font-semibold">{data.count}</span>
    </div>
  );
}
