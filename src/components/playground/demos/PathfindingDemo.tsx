import { useCallback, useRef, useState } from 'react'

const ROWS = 15
const COLS = 25

type CellState = 'empty' | 'wall' | 'start' | 'end' | 'path' | 'visited' | 'frontier'

interface Point {
  row: number
  col: number
}

function key(p: Point) {
  return `${p.row},${p.col}`
}

function heuristic(a: Point, b: Point) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

function neighbors(p: Point): Point[] {
  return [
    { row: p.row - 1, col: p.col },
    { row: p.row + 1, col: p.col },
    { row: p.row, col: p.col - 1 },
    { row: p.row, col: p.col + 1 },
  ].filter((n) => n.row >= 0 && n.row < ROWS && n.col >= 0 && n.col < COLS)
}

function createEmptyGrid(): Set<string> {
  return new Set<string>()
}

const START: Point = { row: 7, col: 3 }
const END: Point = { row: 7, col: 21 }

export default function PathfindingDemo() {
  const [walls, setWalls] = useState<Set<string>>(createEmptyGrid)
  const [visited, setVisited] = useState<Set<string>>(createEmptyGrid)
  const [frontier, setFrontier] = useState<Set<string>>(createEmptyGrid)
  const [path, setPath] = useState<Set<string>>(createEmptyGrid)
  const [running, setRunning] = useState(false)
  const [found, setFound] = useState<boolean | null>(null)
  const drawingRef = useRef<'add' | 'remove' | null>(null)
  const cancelRef = useRef(false)

  const cellState = (p: Point): CellState => {
    const k = key(p)
    if (p.row === START.row && p.col === START.col) return 'start'
    if (p.row === END.row && p.col === END.col) return 'end'
    if (path.has(k)) return 'path'
    if (walls.has(k)) return 'wall'
    if (frontier.has(k)) return 'frontier'
    if (visited.has(k)) return 'visited'
    return 'empty'
  }

  const toggleWall = (p: Point, mode: 'add' | 'remove') => {
    if (p.row === START.row && p.col === START.col) return
    if (p.row === END.row && p.col === END.col) return
    setWalls((prev) => {
      const next = new Set(prev)
      if (mode === 'add') next.add(key(p))
      else next.delete(key(p))
      return next
    })
  }

  const clearRun = () => {
    setVisited(createEmptyGrid())
    setFrontier(createEmptyGrid())
    setPath(createEmptyGrid())
    setFound(null)
  }

  const clearWalls = () => {
    setWalls(createEmptyGrid())
    clearRun()
  }

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const runAStar = useCallback(async () => {
    clearRun()
    setRunning(true)
    cancelRef.current = false

    const open = new Map<string, Point>([[key(START), START]])
    const cameFrom = new Map<string, string>()
    const gScore = new Map<string, number>([[key(START), 0]])
    const fScore = new Map<string, number>([[key(START), heuristic(START, END)]])
    const visitedSet = new Set<string>()

    while (open.size > 0) {
      if (cancelRef.current) return

      let currentKey = ''
      let lowest = Infinity
      for (const k of open.keys()) {
        const score = fScore.get(k) ?? Infinity
        if (score < lowest) {
          lowest = score
          currentKey = k
        }
      }
      const current = open.get(currentKey)!
      open.delete(currentKey)

      if (current.row === END.row && current.col === END.col) {
        const pathSet = new Set<string>()
        let cur = currentKey
        while (cameFrom.has(cur)) {
          pathSet.add(cur)
          cur = cameFrom.get(cur)!
        }
        setPath(pathSet)
        setFound(true)
        setRunning(false)
        return
      }

      visitedSet.add(currentKey)
      setVisited(new Set(visitedSet))
      setFrontier(new Set(open.keys()))
      await sleep(12)

      for (const neighbor of neighbors(current)) {
        const nKey = key(neighbor)
        if (walls.has(nKey) || visitedSet.has(nKey)) continue
        const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1
        if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
          cameFrom.set(nKey, currentKey)
          gScore.set(nKey, tentativeG)
          fScore.set(nKey, tentativeG + heuristic(neighbor, END))
          if (!open.has(nKey)) open.set(nKey, neighbor)
        }
      }
    }

    setFound(false)
    setRunning(false)
  }, [walls])

  const cells = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      cells.push({ row, col })
    }
  }

  const STATE_CLASSES: Record<CellState, string> = {
    empty: 'bg-transparent',
    wall: 'bg-ink/70 dark:bg-paper/60',
    start: 'bg-teal',
    end: 'bg-copper',
    path: 'bg-copper/50',
    visited: 'bg-ink/15 dark:bg-paper/15',
    frontier: 'bg-teal/25',
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={runAStar}
          disabled={running}
          className="rounded-full bg-copper px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {running ? 'Searching…' : 'Run A*'}
        </button>
        <button
          type="button"
          onClick={clearRun}
          className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 dark:border-paper/20 dark:text-paper/70"
        >
          Clear path
        </button>
        <button
          type="button"
          onClick={clearWalls}
          className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 dark:border-paper/20 dark:text-paper/70"
        >
          Clear walls
        </button>
        {found === false && (
          <span className="font-mono text-xs text-copper">No path found</span>
        )}
      </div>

      <div
        role="img"
        aria-label="Grid for A-star pathfinding. Click and drag to draw or erase walls."
        onPointerUp={() => (drawingRef.current = null)}
        onPointerLeave={() => (drawingRef.current = null)}
        className="grid touch-none select-none gap-[2px] overflow-x-auto"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(16px, 1fr))` }}
      >
        {cells.map((p) => {
          const state = cellState(p)
          const isFixed = state === 'start' || state === 'end'
          return (
            <div
              key={key(p)}
              onPointerDown={() => {
                if (isFixed) return
                const mode = walls.has(key(p)) ? 'remove' : 'add'
                drawingRef.current = mode
                toggleWall(p, mode)
              }}
              onPointerEnter={() => {
                if (isFixed || !drawingRef.current) return
                toggleWall(p, drawingRef.current)
              }}
              className={`aspect-square rounded-[2px] border border-ink/5 transition-colors duration-150 dark:border-paper/5 ${STATE_CLASSES[state]} ${
                isFixed ? '' : 'cursor-pointer'
              }`}
            />
          )
        })}
      </div>
      <p className="mt-3 text-xs text-ink/50 dark:text-paper/50">
        Teal = start, copper = end. Click and drag on the grid to draw walls, then run the search.
      </p>
    </div>
  )
}
