import { useEffect, useState } from 'react'
import { fetchAssets, type SiteAssets } from '../lib/api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function CV() {
  const [assets, setAssets] = useState<SiteAssets | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAssets()
      .then(setAssets)
      .catch(() => setError('Could not load the CV right now.'))
  }, [])

  const cv = assets?.cv_file

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-paper">
          CV
        </h1>
        {cv && (
          <a
            href={cv.url}
            target="_blank"
            rel="noreferrer"
            download
            className="rounded-full bg-copper px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-copper-dim"
          >
            Download PDF
          </a>
        )}
      </div>

      {cv && (
        <p className="mt-2 font-mono text-xs text-ink/50 dark:text-paper/50">
          Last updated {formatDate(cv.updated_at)}
        </p>
      )}

      {error && (
        <p className="mt-6 rounded-md border border-copper/40 bg-copper/5 px-4 py-3 text-sm text-ink/70 dark:text-paper/70">
          {error}
        </p>
      )}

      {!assets && !error && (
        <div className="mt-6 h-[600px] animate-pulse rounded-lg bg-ink/5 dark:bg-paper/5" />
      )}

      {assets && !cv && (
        <p className="mt-6 text-ink/60 dark:text-paper/60">
          No CV has been uploaded yet — check back soon.
        </p>
      )}

      {cv && (
        <object
          data={cv.url}
          type="application/pdf"
          className="mt-8 h-[800px] w-full rounded-lg border border-ink/10 dark:border-paper/10"
          aria-label="CV preview"
        >
          <p className="p-6 text-sm text-ink/70 dark:text-paper/70">
            Your browser can&apos;t preview PDFs inline —{' '}
            <a href={cv.url} className="text-copper underline">
              download the CV
            </a>{' '}
            instead.
          </p>
        </object>
      )}
    </section>
  )
}
