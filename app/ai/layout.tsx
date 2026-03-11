import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Chat with Tanav's AI assistant using resume-aware context.",
};

export default function AILayout({ children }: { children: React.ReactNode }) {
  return children;
}
