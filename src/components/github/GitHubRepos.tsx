import { useMemo, useState } from 'react'
import { SectionHeading } from '../layout/SectionHeading'
import { projects, github } from '../../data/profile'
import { useGitHubRepos } from './useGitHubRepos'
import { RepoCard } from './RepoCard'

export function GitHubRepos() {
  const { repos, loading, error } = useGitHubRepos()
  const [search, setSearch] = useState('')
  const [languageFilter, setLanguageFilter] = useState<string | null>(null)

  const languages = useMemo(() => {
    const set = new Set<string>()
    repos.forEach((repo) => {
      if (repo.language) set.add(repo.language)
    })
    return Array.from(set).sort()
  }, [repos])

  const filtered = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        !search || repo.name.toLowerCase().includes(search.toLowerCase())
      const matchesLanguage = !languageFilter || repo.language === languageFilter
      return matchesSearch && matchesLanguage
    })
  }, [repos, search, languageFilter])

  return (
    <section
      id="github"
      className="mx-auto max-w-6xl border-t border-ink/10 px-4 py-20 sm:px-6 dark:border-paper/10"
    >
      <SectionHeading
        index="03 — GitHub"
        title="Live from GitHub"
        description={`Pulled at runtime from github.com/${github.username} — forks and the profile repo are hidden.`}
      />

      {error ? (
        <div>
          <p className="mb-6 rounded-md border border-copper/40 bg-copper/5 px-4 py-3 text-sm text-ink/70 dark:text-paper/70">
            Couldn&apos;t reach the GitHub API right now — showing featured projects instead.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-lg border border-ink/10 p-5 dark:border-paper/10"
              >
                <h3 className="font-display text-lg font-semibold text-ink dark:text-paper">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-ink/70 dark:text-paper/70">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative w-full sm:max-w-xs">
              <span className="sr-only">Search repositories</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search repositories…"
                className="w-full rounded-full border border-ink/15 bg-transparent px-4 py-2 text-sm text-ink placeholder:text-ink/40 dark:border-paper/20 dark:text-paper dark:placeholder:text-paper/40"
              />
            </label>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by language">
              <button
                type="button"
                onClick={() => setLanguageFilter(null)}
                aria-pressed={languageFilter === null}
                className={`rounded-full border px-3 py-1 text-xs font-mono transition-colors ${
                  languageFilter === null
                    ? 'border-teal bg-teal/10 text-teal'
                    : 'border-ink/15 text-ink/60 hover:border-teal dark:border-paper/20 dark:text-paper/60'
                }`}
              >
                All
              </button>
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => setLanguageFilter(language)}
                  aria-pressed={languageFilter === language}
                  className={`rounded-full border px-3 py-1 text-xs font-mono transition-colors ${
                    languageFilter === language
                      ? 'border-teal bg-teal/10 text-teal'
                      : 'border-ink/15 text-ink/60 hover:border-teal dark:border-paper/20 dark:text-paper/60'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-36 animate-pulse rounded-lg border border-ink/10 bg-ink/5 dark:border-paper/10 dark:bg-paper/5"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-ink/60 dark:text-paper/60">No repositories match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
