import type { Repo } from '../../lib/github'

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  Swift: '#F05138',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function RepoCard({ repo }: { repo: Repo }) {
  const dotColor = repo.language ? LANGUAGE_COLORS[repo.language] ?? '#8b8b8b' : null

  return (
    <article className="flex flex-col justify-between rounded-lg border border-ink/10 p-5 transition-colors hover:border-teal/60 dark:border-paper/10">
      <div>
        <div className="flex items-center justify-between gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="font-display text-lg font-semibold text-ink hover:text-teal dark:text-paper"
          >
            {repo.name}
          </a>
          <span className="flex items-center gap-1 font-mono text-xs text-ink/60 dark:text-paper/60">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.5 15 9l6.8.6-5.1 4.6L18.3 21 12 17.3 5.7 21l1.6-6.8-5.1-4.6L9.2 9 12 2.5Z" />
            </svg>
            {repo.stargazers_count}
          </span>
        </div>
        <p className="mt-2 min-h-[2.5rem] text-sm text-ink/70 dark:text-paper/70">
          {repo.description ?? 'No description provided.'}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-xs text-ink/50 dark:text-paper/50">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: dotColor ?? undefined }}
            />
            {repo.language}
          </span>
        ) : (
          <span />
        )}
        <span>Updated {formatDate(repo.updated_at)}</span>
      </div>
    </article>
  )
}
