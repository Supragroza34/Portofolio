import { SectionHeading } from '../layout/SectionHeading'
import { kclGrades, awards, certifications, about } from '../../data/profile'

export function EducationAchievements() {
  return (
    <section
      id="education"
      className="mx-auto max-w-6xl border-t border-ink/10 px-4 py-20 sm:px-6 dark:border-paper/10"
    >
      <SectionHeading index="07 — Education & Achievements" title="Record" />

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-copper">
            {about.education.institution} — module grades
          </h3>
          <dl className="mt-4 divide-y divide-ink/10 dark:divide-paper/10">
            {kclGrades.map((item) => (
              <div
                key={item.module}
                className="flex items-center justify-between gap-4 py-2.5"
              >
                <dt className="text-sm text-ink/80 dark:text-paper/80">{item.module}</dt>
                <dd className="font-mono text-sm text-ink dark:text-paper">{item.grade}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-copper">Awards</h3>
          <ul className="mt-4 space-y-3">
            {awards.map((award) => (
              <li
                key={award.title}
                className="flex items-start justify-between gap-4 rounded-md border border-ink/10 px-4 py-3 dark:border-paper/10"
              >
                <span className="text-sm text-ink/85 dark:text-paper/85">{award.title}</span>
                <span className="shrink-0 font-mono text-xs text-copper">{award.year}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-mono text-xs uppercase tracking-widest text-copper">
            Certifications
          </h3>
          <ul className="mt-4 space-y-3">
            {certifications.map((cert) => (
              <li
                key={cert.title}
                className="flex items-start justify-between gap-4 rounded-md border border-ink/10 px-4 py-3 dark:border-paper/10"
              >
                <span className="text-sm text-ink/85 dark:text-paper/85">{cert.title}</span>
                <span className="shrink-0 font-mono text-xs text-teal">{cert.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
