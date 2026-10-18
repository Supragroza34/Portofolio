import type { Project } from '../../data/profile'

const SIZE_CLASSES: Record<Project['size'], string> = {
  lg: 'md:col-span-2',
  md: 'md:col-span-1',
  sm: 'md:col-span-1',
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`group flex flex-col justify-between rounded-lg border border-ink/10 p-6 transition-colors hover:border-copper/60 dark:border-paper/10 ${SIZE_CLASSES[project.size]}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink dark:text-paper">
            {project.name}
          </h3>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.name} source on GitHub`}
              className="shrink-0 text-ink/50 transition-colors hover:text-copper dark:text-paper/50"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          )}
        </div>
        <p className="mt-3 text-sm text-ink/70 dark:text-paper/70">{project.description}</p>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-xs text-ink/70 dark:bg-paper/10 dark:text-paper/70"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}
