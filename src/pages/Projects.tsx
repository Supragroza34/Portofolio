import { ProjectGrid } from '../components/projects/ProjectGrid'
import { GitHubRepos } from '../components/github/GitHubRepos'
import { PlaygroundShell } from '../components/playground/PlaygroundShell'

export function Projects() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-paper">
          Projects
        </h1>
        <p className="mt-2 max-w-2xl text-ink/70 dark:text-paper/70">
          Things I&apos;ve built for fun, to learn something specific, or to see if an idea
          actually works — starting with a few live, interactive demos below.
        </p>
      </section>

      <PlaygroundShell />
      <ProjectGrid />
      <GitHubRepos />
    </div>
  )
}
