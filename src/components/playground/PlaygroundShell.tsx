import { Suspense, lazy, useState, type ComponentType } from 'react'
import { SectionHeading } from '../layout/SectionHeading'
import { DEMOS, PlaygroundNav, sourceUrl } from './PlaygroundNav'

const OrbitalSimDemo = lazy(() => import('./demos/OrbitalSimDemo'))
const KanbanDemo = lazy(() => import('./demos/KanbanDemo'))
const ClaimsDashboardDemo = lazy(() => import('./demos/ClaimsDashboardDemo'))
const ComponentGalleryDemo = lazy(() => import('./demos/ComponentGalleryDemo'))
const PathfindingDemo = lazy(() => import('./demos/PathfindingDemo'))

const DEMO_COMPONENTS: Record<string, ComponentType> = {
  orbital: OrbitalSimDemo,
  kanban: KanbanDemo,
  dashboard: ClaimsDashboardDemo,
  gallery: ComponentGalleryDemo,
  pathfinding: PathfindingDemo,
}

function DemoFallback() {
  return (
    <div className="flex h-[480px] items-center justify-center rounded-lg border border-ink/10 dark:border-paper/10">
      <p className="font-mono text-sm text-ink/50 dark:text-paper/50">Loading demo…</p>
    </div>
  )
}

export function PlaygroundShell() {
  const [activeId, setActiveId] = useState(DEMOS[0].id)
  const activeDemo = DEMOS.find((d) => d.id === activeId) ?? DEMOS[0]
  const ActiveComponent = DEMO_COMPONENTS[activeId]

  return (
    <section
      id="playground"
      className="mx-auto max-w-6xl border-t border-ink/10 px-4 py-20 sm:px-6 dark:border-paper/10"
    >
      <SectionHeading
        index="01 — Playground"
        title="Live, interactive demos"
        description="Five small, production-quality demos — each lazy-loaded, each with its source on GitHub."
      />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <PlaygroundNav activeId={activeId} onSelect={setActiveId} />

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink dark:text-paper">
                {activeDemo.label}
              </h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">
                {activeDemo.description}
              </p>
            </div>
            <a
              href={sourceUrl(activeDemo.sourceFile)}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 font-mono text-xs text-ink/70 transition-colors hover:border-copper hover:text-copper dark:border-paper/20 dark:text-paper/70"
            >
              View source
            </a>
          </div>

          <div
            role="tabpanel"
            id={`panel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
            className="rounded-lg border border-ink/10 p-4 dark:border-paper/10"
          >
            <Suspense fallback={<DemoFallback />}>
              <ActiveComponent />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
