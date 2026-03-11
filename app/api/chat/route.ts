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
    stopWhen: stepCountIs(8),
  });

  return result.toUIMessageStreamResponse();
}
