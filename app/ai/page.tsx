"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Streamdown } from "streamdown";
import { Loader2 } from "lucide-react";

export default function AIPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const submit = (e: any) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    sendMessage({
      parts: [{ type: "text", text: value }],
    });

    setInput("");
  };

  return (
    <section className="h-full -my-6 relative">
      <div className="h-[70vh] overflow-y-scroll no-scrollbar p-4 sm:p-5 py-0 flex flex-col gap-4 py-2">
        {messages.length === 0 && (
          <div className="text-sm text-(--text-muted)">
            Try:{" "}
            <span className="text-(--text)">
              “Summarize Tanav's work experience.”
            </span>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`max-w-full ${
              message.role === "user" ? "self-end opacity-70" : "self-start"
            }`}
          >
            {message.parts.map((part, partIndex) => {
              switch (part.type) {
                case "text":
                  return (
                    <Streamdown key={`${partIndex}-text`} className="text-sm">
                      {part.text}
                    </Streamdown>
                  );
                case "tool-bash":
                  return (
                    <div
                      className="text-muted-foreground text-xs font-mono"
                      key={`${partIndex}-bash`}
                    >
                      Bash: {part.input?.command ?? ""}
                    </div>
                  );
                case "tool-readFile":
                  return (
                    <div
                      className="text-muted-foreground text-xs font-mono"
                      key={`${partIndex}-read`}
                    >
                      Read: {part.input?.path ?? ""}
                    </div>
                  );
              }
            })}
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="w-full border-y border-(--border) p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Tanav's work..."
            rows={3}
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
