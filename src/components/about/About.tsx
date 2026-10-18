import { SectionHeading } from '../layout/SectionHeading'
import { about } from '../../data/profile'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading index="01 — About" title="Profile" />
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <p className="text-lg leading-relaxed text-ink/80 dark:text-paper/80">
          {about.summary}
        </p>
        <div className="rounded-lg border border-ink/10 p-6 font-mono text-sm dark:border-paper/10">
          <p className="text-ink/50 dark:text-paper/50">education</p>
          <p className="mt-2 text-ink dark:text-paper">{about.education.institution}</p>
          <p className="text-ink/70 dark:text-paper/70">{about.education.degree}</p>
          <p className="mt-1 text-copper">{about.education.years}</p>
          <p className="mt-3 inline-block rounded-full bg-copper/10 px-3 py-1 text-xs text-copper">
            {about.education.predicted}
          </p>
        </div>
      </div>
    </section>
  )
}
