import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Chat with Tanav's resume.",
};

export default function AILayout({ children }: { children: React.ReactNode }) {
  return children;
}
