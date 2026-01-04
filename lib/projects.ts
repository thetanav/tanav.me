export interface Project {
  img: string;
  name: string;
  brief: string;
  git?: string;
  web?: string;
  info?: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    img: "/images/vidora.png",
    git: "https://github.com/thetanav/uber",
    info: "https://x.com/tanavtwt/status/2007356766284329173?s=20",
    name: "Vidora - complete video streaming",
    brief:
      "a complete mux like video transcoding and streaming platform with a web interface.",
    tech: ["NextJs", "FFMPEG", "Docker", "Redis", "R2"],
  },
  {
    img: "/images/uber.png",
    git: "https://github.com/thetanav/uber",
    name: "End to end uber clone",
    brief:
      "a end 2 end uber clone made with latest tech stack and best practices.",
    tech: ["ElysiaJS", "NextJS", "Socketio", "Redis"],
  },
  {
    img: "/images/scoutly.png",
    info: "https://x.com/tanavtwt/status/1994856020099920261?s=20",
    git: "https://github.com/thetanav/road-vision/",
    name: "scoutly - a reseach rag",
    brief: "a dead simple perplexity clone with docling and web scraping.",
    tech: ["Python", "Langchain", "Vector DB", "Embeddings"],
  },
  {
    img: "/images/crawler.png",
    git: "https://github.com/thetanav/road-vision/",
    info: "https://x.com/tanavtwt/status/2001326270731444275?s=20",
    name: "crawler - search engine",
    brief:
      "a tiny serch engine that scrapes all the pages in a domain and maps to their title for searching",
    tech: ["BunJS", "React"],
  },
  {
    img: "/images/chess-app.png",
    git: "https://github.com/thetanav/chess",
    name: "multiplayer chess",
    brief: "multiplayer chess game with websockets.",
    tech: ["WebSocket", "NextJs", "ChessJs", "Turborepo"],
  },
  {
    img: "/images/trading.png",
    git: "https://github.com/thetanav/trading-system",
    name: "trade exchange",
    brief: "real-time trading app with live order book.",
    tech: ["Express", "NextJs", "Redis", "ChartJs", "WebSocket"],
  },
  {
    img: "/images/linkmash.png",
    web: "https://linkmash.netlify.app/",
    name: "linkmash",
    brief: "compare your linkedin profile with others.",
    tech: ["React", "Convex"],
  },
];
