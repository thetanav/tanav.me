"use client";

import { FormEvent, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Streamdown } from "streamdown";
import Link from "next/link";
import { ArrowUpRight, Divide, Loader2, Sparkles } from "lucide-react";
import Shimmer from "../components/nav";

export default function AIPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    sendMessage({
      parts: [{ type: "text", text: value }],
    });

    setInput("");
  };

  return (
    <section className="">
      <div className="h-[76vh] overflow-y-auto p-4 sm:p-5 py-0 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="text-sm text-(--text-muted)">
            Try:{" "}
            <span className="text-(--text)">
              “Summarize Tanav's work experience.”
            </span>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-full ${
              message.role === "user" ? "self-end opacity-70" : "self-start"
            }`}
          >
            {message.parts.map((part) => {
              switch (part.type) {
                case "text":
                  return (
                    <Streamdown key={`${message.id}-text`}>
                      {part.text}
                    </Streamdown>
                  );
                case "tool-bash":
                  return (
                    <div className="text-muted-foreground text-sm">
                      Bash: {part.input?.command ?? ""}
                    </div>
                  );
                case "tool-readFile":
                  return (
                    <div className="text-muted-foreground text-sm">
                      Read: {part.input?.content ?? ""}
                    </div>
                  );
              }
            })}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="border-t border-(--border) p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Tanav's work..."
            rows={2}
            className="w-full resize-none text-sm outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || input.trim().length === 0}
            className="text-sm disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors cursor-pointer flex gap-1 items-center"
          >
            {isLoading && <Loader2 className="animate-spin size-3" />}
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
