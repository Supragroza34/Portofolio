import { SectionHeading } from '../layout/SectionHeading'
import { projects } from '../../data/profile'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl border-t border-ink/10 px-4 py-20 sm:px-6 dark:border-paper/10"
    >
      <SectionHeading index="03 — Projects" title="Featured projects" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
