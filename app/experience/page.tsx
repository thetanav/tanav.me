import type { Metadata } from "next";
import { experience } from "../../lib/experience";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Experience",
  description: "My work experience.",
};

export default function ExperiencePage() {
  return (
    <section className="flex flex-col gap-8 px-3 sm:px-6">
      <h1 className="text-2xl font-medium tracking-tight text-[var(--text)]">
        Experience
      </h1>
      <div className="flex flex-col gap-8">
        {experience.map((job) => (
          <div className="flex gap-3 w-full" key={job.url}>
            <Image
              alt={job.company}
              width={80}
              height={80}
              className="w-10 h-10 rounded-md border border-[var(--border)]"
              src={job.img}
            />
            <div key={job.company} className="flex flex-2 flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <a
                    href={job.url}
                    className="font-bold text-[var(--text)] hover:underline">
                    {job.company}
                  </a>
                  <p className="text-sm text-[var(--text-muted)]">{job.role}</p>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <span className="text-sm text-[var(--text-muted)]">
                    {job.period}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    {job.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[var(--text-muted)]">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
