export interface DemoMeta {
  id: string
  label: string
  description: string
  sourceFile: string
}

export const DEMOS: DemoMeta[] = [
  {
    id: 'orbital',
    label: 'Orbital Mechanics',
    description: 'Canvas N-body simulator — drag to place planets, tune gravity, watch trails.',
    sourceFile: 'OrbitalSimDemo.tsx',
  },
  {
    id: 'kanban',
    label: 'Kanban Board',
    description: 'Drag-and-drop board with full keyboard support, persisted to localStorage.',
    sourceFile: 'KanbanDemo.tsx',
  },
  {
    id: 'dashboard',
    label: 'Claims Dashboard',
    description: 'Animated, filterable charts over a mock insurance claims pipeline.',
    sourceFile: 'ClaimsDashboardDemo.tsx',
  },
  {
    id: 'gallery',
    label: 'Component Gallery',
    description: 'Accessible design-system primitives — buttons, inputs, modal, toast, tabs.',
    sourceFile: 'ComponentGalleryDemo.tsx',
  },
  {
    id: 'pathfinding',
    label: 'Pathfinding (A*)',
    description: 'Draw walls on a grid and watch A* search for the shortest path.',
    sourceFile: 'PathfindingDemo.tsx',
  },
]

const REPO_BASE =
  'https://github.com/Supragroza34/Portofolio/blob/master/src/components/playground/demos'

export function sourceUrl(file: string) {
  return `${REPO_BASE}/${file}`
}

interface PlaygroundNavProps {
  activeId: string
  onSelect: (id: string) => void
}

export function PlaygroundNav({ activeId, onSelect }: PlaygroundNavProps) {
  return (
    <div
      role="tablist"
      aria-label="Playground demos"
      className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
    >
      {DEMOS.map((demo) => {
        const active = demo.id === activeId
        return (
          <button
            key={demo.id}
            type="button"
            role="tab"
            id={`tab-${demo.id}`}
            aria-selected={active}
            aria-controls={`panel-${demo.id}`}
            onClick={() => onSelect(demo.id)}
            className={`shrink-0 rounded-md px-4 py-3 text-left text-sm transition-colors lg:shrink ${
              active
                ? 'bg-copper/10 text-copper'
                : 'text-ink/70 hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/5'
            }`}
          >
            <span className="block font-medium">{demo.label}</span>
            <span className="mt-0.5 hidden text-xs text-ink/50 lg:block dark:text-paper/50">
              {demo.description}
            </span>
          </button>
        )
      })}
    </div>
  )
}
