import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-10 px-4 sm:px-6">{children}</div>;
}
