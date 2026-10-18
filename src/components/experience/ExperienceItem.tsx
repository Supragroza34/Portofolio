import { motion } from 'framer-motion'
import type { ExperienceEntry } from '../../data/profile'

export function ExperienceItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="relative pb-12 pl-8 last:pb-0"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-copper bg-paper dark:bg-ink"
      />
      <span
        aria-hidden="true"
        className="absolute left-[4px] top-4 bottom-0 w-px bg-ink/10 last:hidden dark:bg-paper/10"
      />

      <p className="font-mono text-xs tracking-wide text-copper">{entry.period}</p>
      <h3 className="mt-1 font-display text-xl font-semibold text-ink dark:text-paper">
        {entry.role}
      </h3>
      <p className="text-ink/60 dark:text-paper/60">{entry.org}</p>
      <p className="mt-3 max-w-2xl text-ink/80 dark:text-paper/80">{entry.summary}</p>
      <ul className="mt-3 space-y-1.5">
        {entry.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-2 text-sm text-ink/70 dark:text-paper/70"
          >
            <span aria-hidden="true" className="text-copper">
              ·
            </span>
            {highlight}
          </li>
        ))}
      </ul>
    </motion.li>
  )
}
