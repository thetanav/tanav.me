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
    <div className="group flex">
      <Image
        width={1000}
        height={1000}
        src={img}
        alt={name}
        draggable={false}
        className="w-fit object-cover aspect-video h-36 select-none  border-4 border-double border-(--border) rounded-2xl"
      />
      <div className="flex flex-col w-full px-3 py-2 justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-[var(--text)] capitalize first-letter:text-lg">
            {name}
          </h3>
          <p className="text-sm text-[var(--text-muted)] first-letter:capitalize w-full wrap-anywhere">
            {brief}
          </p>
          <div className={`flex flex-wrap ${mono.className} gap-1 opacity-70`}>
            {tech.map((t) => (
              <span
                key={t}
                className="transition text-xs text-(--text-muted) pr-1"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-start gap-2">
          {web && (
            <a href={web} target="_blank" rel="noopener">
              <Globe className="w-5 h-5 opacity-40 hover:opacity-100 transition" />
            </a>
          )}
          {git && (
            <a href={git} target="_blank" rel="noopener">
              <Github className="w-5 h-5 opacity-40 hover:opacity-100 transition" />
            </a>
          )}
          {info && (
            <a href={info} target="_blank" rel="noopener">
              <TwitterIcon className="w-5 h-5 opacity-40 hover:opacity-100 transition" />
            </a>
          )}
        </div>
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
      <div className="flex flex-col space-y-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
