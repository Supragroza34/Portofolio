import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAssets } from '../lib/api'
import { about, personal, experience, skills, awards, deansCommendations } from '../data/profile'
import type { SocialLink } from '../data/profile'

function SocialIcon({ kind }: { kind: SocialLink['kind'] }) {
  if (kind === 'email') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    )
  }
  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.6v1.8h.05c.5-.9 1.8-1.9 3.7-1.9 3.9 0 4.65 2.6 4.65 5.9V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export function About() {
  const [photoUrl, setPhotoUrl] = useState<string>('/avatar.jpg')

  useEffect(() => {
    fetchAssets()
      .then((assets) => {
        if (assets.profile_photo?.url) setPhotoUrl(assets.profile_photo.url)
      })
      .catch(() => {})
  }, [])

  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <img
            src={photoUrl}
            alt={personal.name}
            className="h-28 w-28 shrink-0 rounded-full border border-ink/10 object-cover dark:border-paper/10"
          />
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-paper">
                {personal.name}
              </h1>
              <div className="flex items-center gap-2">
                {personal.links.map((link) => (
                  <a
                    key={link.kind}
                    href={link.href}
                    target={link.kind === 'email' ? undefined : '_blank'}
                    rel={link.kind === 'email' ? undefined : 'noreferrer'}
                    aria-label={link.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-copper hover:text-copper dark:border-paper/20 dark:text-paper/70"
                  >
                    <SocialIcon kind={link.kind} />
                  </a>
                ))}
              </div>
            </div>
            <p className="mt-1 text-ink/70 dark:text-paper/70">{personal.pitch}</p>
            <p className="mt-1 font-mono text-xs text-ink/50 dark:text-paper/50">
              {personal.location}
            </p>
          </div>
        </div>

        <div className="prose-blog mt-10">
          <p>
            I&apos;m a Computer Science student at{' '}
            <a href={about.education.institutionUrl} target="_blank" rel="noreferrer">
              King&apos;s College London
            </a>
            , currently on a software engineering industrial placement at{' '}
            <a
              href={experience.find((e) => e.id === 'lloyds')?.orgUrl}
              target="_blank"
              rel="noreferrer"
            >
              Lloyds Banking Group
            </a>
            , working on an agile team modernising and scaling the Home Insurance Customer
            Claims Platform. I care about systems that stay fast and correct under real load,
            and about writing frontend code that feels as considered as the backend behind it.
          </p>
          <p>
            Before that I&apos;ve worked across backend APIs, database integration, and frontend
            engineering — at AARN Limited, Essential Healthcare, CoolEat and SANMITA — and
            co-founded a small product studio, OpusNoctis, selling laser-cut jigsaw coasters at
            trade fairs.
          </p>
          <p>
            Outside of work I build small simulations and interactive web demos for fun — see{' '}
            <Link to="/projects">Projects</Link> for the current lineup.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl border-t border-ink/10 px-4 py-16 sm:px-6 dark:border-paper/10">
        <h2 className="font-display text-2xl font-semibold text-ink dark:text-paper">
          Experience
        </h2>
        <ol className="mt-8 max-w-2xl">
          {experience.map((entry) => (
            <li key={entry.id} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-copper bg-paper dark:bg-ink"
              />
              <span
                aria-hidden="true"
                className="absolute left-[4px] top-4 bottom-0 w-px bg-ink/10 last:hidden dark:bg-paper/10"
              />
              <p className="font-mono text-xs tracking-wide text-copper">{entry.period}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink dark:text-paper">
                {entry.role}
              </h3>
              <p className="text-ink/60 dark:text-paper/60">
                {entry.orgUrl ? (
                  <a
                    href={entry.orgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-copper/40 hover:decoration-copper"
                  >
                    {entry.org}
                  </a>
                ) : (
                  entry.org
                )}
              </p>
              <p className="mt-2 max-w-2xl text-sm text-ink/80 dark:text-paper/80">
                {entry.summary}
              </p>
              <ul className="mt-2 space-y-1">
                {entry.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-ink/70 dark:text-paper/70">
                    <span className="text-copper">·</span>
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl border-t border-ink/10 px-4 py-16 sm:px-6 dark:border-paper/10">
        <h2 className="font-display text-2xl font-semibold text-ink dark:text-paper">
          Awards
        </h2>

        <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-copper">
          KCL Dean&apos;s Commendations
        </h3>
        <div className="mt-4 grid grid-cols-3 gap-4 max-w-md">
          {deansCommendations.map((cert) => (
            <a
              key={cert.label}
              href={cert.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-md border border-ink/10 transition hover:border-copper dark:border-paper/10"
              title={cert.label}
            >
              <img
                src={cert.thumbnailUrl}
                alt={`${cert.label} Dean's Commendation certificate`}
                className="aspect-[827/1170] w-full object-cover transition group-hover:opacity-80"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        <ul className="mt-6 max-w-2xl space-y-2">
          {awards.map((award) => (
            <li
              key={award.title}
              className="flex items-start justify-between gap-4 rounded-md border border-ink/10 px-4 py-2.5 dark:border-paper/10"
            >
              <span className="text-sm text-ink/85 dark:text-paper/85">
                {award.pdfUrl ? (
                  <a
                    href={award.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-copper/40 hover:decoration-copper"
                  >
                    {award.title}
                  </a>
                ) : (
                  award.title
                )}
              </span>
              <span className="shrink-0 font-mono text-xs text-copper">{award.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl border-t border-ink/10 px-4 py-16 sm:px-6 dark:border-paper/10">
        <h2 className="font-display text-2xl font-semibold text-ink dark:text-paper">
          Toolbox
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {skills.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-copper">
                {group.label}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-ink/80 dark:text-paper/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
