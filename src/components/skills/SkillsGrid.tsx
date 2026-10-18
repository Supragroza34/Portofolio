import { SectionHeading } from '../layout/SectionHeading'
import { skills } from '../../data/profile'

export function SkillsGrid() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl border-t border-ink/10 px-4 py-20 sm:px-6 dark:border-paper/10"
    >
      <SectionHeading index="06 — Skills" title="Toolbox" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <div key={group.label}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-copper">
              {group.label}
            </h3>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-ink/80 dark:text-paper/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
