import { SectionHeading } from '../layout/SectionHeading'
import { experience } from '../../data/profile'
import { ExperienceItem } from './ExperienceItem'

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl border-t border-ink/10 px-4 py-20 sm:px-6 dark:border-paper/10"
    >
      <SectionHeading
        index="02 — Experience"
        title="Where I've worked"
        description="From a trade-fair product to backend systems inside a regulated bank."
      />
      <ol className="max-w-2xl">
        {experience.map((entry, index) => (
          <ExperienceItem key={entry.id} entry={entry} index={index} />
        ))}
      </ol>
    </section>
  )
}
