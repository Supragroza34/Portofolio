import { motion } from 'framer-motion'
import type { ReactElement } from 'react'
import { personal } from '../../data/profile'
import { HeroCanvasBackground } from './HeroCanvasBackground'

const ICONS: Record<string, ReactElement> = {
  github: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 7a1.94 1.94 0 1 0 0-3.88 1.94 1.94 0 0 0 0 3.88ZM20.44 20h-3.37v-5.6c0-1.34-.48-2.25-1.68-2.25-.92 0-1.47.62-1.71 1.22-.09.21-.11.5-.11.8V20h-3.37s.05-9.87 0-11.5h3.37v1.63a3.35 3.35 0 0 1 3.03-1.67c2.21 0 3.84 1.44 3.84 4.54V20Z" />
    </svg>
  ),
  email: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-ink/10 dark:border-paper/10"
    >
      <HeroCanvasBackground />
      <div className="relative mx-auto flex min-h-[82vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-widest text-copper"
        >
          SOFTWARE ENGINEER — LONDON, UK
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl md:text-7xl dark:text-paper"
        >
          {personal.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-ink/75 sm:text-xl dark:text-paper/75"
        >
          {personal.pitch}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {personal.links.map((link) => (
            <a
              key={link.kind}
              href={link.href}
              target={link.kind === 'email' ? undefined : '_blank'}
              rel={link.kind === 'email' ? undefined : 'noreferrer'}
              className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-copper hover:text-copper dark:border-paper/20 dark:text-paper dark:hover:border-copper dark:hover:text-copper"
            >
              {ICONS[link.kind]}
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
