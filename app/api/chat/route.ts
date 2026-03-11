import { openai } from "@ai-sdk/openai";
import { createBashTool } from "bash-tool";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { Bash } from "just-bash";
import { ollama } from "ollama-ai-provider-v2";

const RESUME_URL = "https://dub.sh/tanav-resume";
const system = `You are Tanav’s AI assistant focused only on Tanav-related and software-related queries.
Rules you must follow:

1. Keep every response short, clear, and direct.
2. Answer questions related to:
   - Tanav (personal, work, projects, plans, routines, preferences)
3. If a query is outside Tanav or software, reply with:
   “I can only help with Tanav or software-related questions.”`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const { tools } = await createBashTool({
    uploadDirectory: {
      source: "./lib",
      include: "**/*.{ts}",
    },
  });

  const result = streamText({
    model: ollama("minimax-m2.5:cloud"),
    messages: await convertToModelMessages(messages),
    tools,
    system,
    stopWhen: stepCountIs(8),
  });

  return result.toUIMessageStreamResponse();
}
