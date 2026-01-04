import type { Metadata } from "next";
import { projects } from "../../lib/projects";
import type { Project } from "../../lib/projects";
import Image from "next/image";
import { Github, Globe, TwitterIcon } from "lucide-react";
import { Geist_Mono } from "next/font/google";

const mono = Geist_Mono({
  subsets: ["latin"],
});

function ProjectCard({ img, name, brief, tech, web, git, info }: Project) {
  return (
    <div className="group flex flex-col">
      <div className="relative">
        <Image
          width={1000}
          height={1000}
          src={img}
          alt={name}
          draggable={false}
          className="w-fit object-cover max-h-72 select-none border border-(--border)"
        />
        <div className="absolute bottom-4 right-4 flex flex-col items-center justify-start gap-2 bg-background p-2 rounded">
          {web && (
            <a href={web} target="_blank" rel="noopener">
              <Globe className="w-4 h-4 opacity-40 hover:opacity-100 transition" />
            </a>
          )}
          {git && (
            <a href={git} target="_blank" rel="noopener">
              <Github className="w-4 h-4 opacity-40 hover:opacity-100 transition" />
            </a>
          )}
          {info && (
            <a href={info} target="_blank" rel="noopener">
              <TwitterIcon className="w-4 h-4 opacity-40 hover:opacity-100 transition" />
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-1">
        <h3 className="text-md font-semibold text-[var(--text)] capitalize first-letter:text-lg">
          {name}
        </h3>
        <div
          className={`flex flex-wrap divide-x-1 divide-(--text-muted)/30 mb-1 ${mono.className} gap-1`}>
          {tech.map((t) => (
            <span
              key={t}
              className="transition text-xs text-(--text-muted) pr-1">
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm text-[var(--text-muted)] first-letter:capitalize">
          {brief}
        </p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <section className="flex flex-col gap-6 px-3 sm:px-6">
      <h1 className="text-2xl font-medium tracking-tight text-[var(--text)]">
        Completed Projects
      </h1>
      <div className="grid sm:grid-cols-2 space-y-4 space-x-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
