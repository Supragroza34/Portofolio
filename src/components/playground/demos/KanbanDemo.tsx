import { useEffect, useRef, useState } from 'react'

interface Card {
  id: string
  text: string
}

interface Column {
  id: string
  title: string
  cards: Card[]
}

const STORAGE_KEY = 'playground-kanban-v1'

const DEFAULT_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'To do',
    cards: [
      { id: 'c1', text: 'Design claims intake form' },
      { id: 'c2', text: 'Write API contract' },
    ],
  },
  {
    id: 'doing',
    title: 'In progress',
    cards: [{ id: 'c3', text: 'Build fraud-check rule engine' }],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [{ id: 'c4', text: 'Set up CI pipeline' }],
  },
]

function loadColumns(): Column[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_COLUMNS
    return JSON.parse(raw) as Column[]
  } catch {
    return DEFAULT_COLUMNS
  }
}

export default function KanbanDemo() {
  const [columns, setColumns] = useState<Column[]>(loadColumns)
  const [dragCard, setDragCard] = useState<{ cardId: string; fromCol: string } | null>(null)
  const [focusedCard, setFocusedCard] = useState<string | null>(null)
  const [newCardText, setNewCardText] = useState('')
  const [activeAddCol, setActiveAddCol] = useState<string | null>(null)
  const liveRegionRef = useRef<HTMLDivElement>(null)
  const addInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
  }, [columns])

  useEffect(() => {
    if (activeAddCol) addInputRef.current?.focus()
  }, [activeAddCol])

  const announce = (message: string) => {
    if (liveRegionRef.current) liveRegionRef.current.textContent = message
  }

  const moveCard = (cardId: string, fromCol: string, toCol: string, toIndex?: number) => {
    if (fromCol === toCol && toIndex === undefined) return
    setColumns((prev) => {
      const source = prev.find((c) => c.id === fromCol)
      const card = source?.cards.find((c) => c.id === cardId)
      if (!card) return prev
      return prev.map((col) => {
        if (col.id === fromCol && col.id === toCol) return col
        if (col.id === fromCol) return { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
        if (col.id === toCol) {
          const cards = [...col.cards]
          cards.splice(toIndex ?? cards.length, 0, card)
          return { ...col, cards }
        }
        return col
      })
    })
  }

  const moveColumnDirection = (cardId: string, fromCol: string, direction: 1 | -1) => {
    const colIndex = columns.findIndex((c) => c.id === fromCol)
    const target = columns[colIndex + direction]
    if (!target) return
    moveCard(cardId, fromCol, target.id)
    announce(`Moved card to ${target.title}`)
    requestAnimationFrame(() => setFocusedCard(cardId))
  }

  const addCard = (colId: string) => {
    const text = newCardText.trim()
    if (!text) return
    const id = `c-${crypto.randomUUID()}`
    setColumns((prev) =>
      prev.map((col) => (col.id === colId ? { ...col, cards: [...col.cards, { id, text }] } : col)),
    )
    setNewCardText('')
    setActiveAddCol(null)
  }

  const deleteCard = (cardId: string, colId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === colId ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) } : col,
      ),
    )
    announce('Card deleted')
  }

  return (
    <div>
      <div ref={liveRegionRef} aria-live="polite" className="sr-only" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              if (dragCard) {
                moveCard(dragCard.cardId, dragCard.fromCol, col.id)
                setDragCard(null)
              }
            }}
            className="flex min-h-[220px] flex-col gap-2 rounded-md border border-ink/10 bg-ink/[0.02] p-3 dark:border-paper/10 dark:bg-paper/[0.02]"
          >
            <h4 className="font-mono text-xs uppercase tracking-wide text-ink/60 dark:text-paper/60">
              {col.title} <span className="text-ink/30 dark:text-paper/30">({col.cards.length})</span>
            </h4>

            <ul className="flex flex-col gap-2" aria-label={`${col.title} cards`}>
              {col.cards.map((card) => (
                <li key={card.id}>
                  <div
                    draggable
                    tabIndex={0}
                    role="button"
                    aria-label={`${card.text}. Press left or right arrow to move between columns, delete to remove.`}
                    onDragStart={() => setDragCard({ cardId: card.id, fromCol: col.id })}
                    onFocus={() => setFocusedCard(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') {
                        e.preventDefault()
                        moveColumnDirection(card.id, col.id, 1)
                      } else if (e.key === 'ArrowLeft') {
                        e.preventDefault()
                        moveColumnDirection(card.id, col.id, -1)
                      } else if (e.key === 'Delete' || e.key === 'Backspace') {
                        e.preventDefault()
                        deleteCard(card.id, col.id)
                      }
                    }}
                    className={`cursor-grab rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm text-ink shadow-sm transition-shadow dark:border-paper/10 dark:bg-ink dark:text-paper ${
                      focusedCard === card.id ? 'ring-2 ring-copper' : ''
                    }`}
                  >
                    {card.text}
                  </div>
                </li>
              ))}
            </ul>

            {activeAddCol === col.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  addCard(col.id)
                }}
                className="flex gap-1"
              >
                <input
                  ref={addInputRef}
                  value={newCardText}
                  onChange={(e) => setNewCardText(e.target.value)}
                  onBlur={() => !newCardText && setActiveAddCol(null)}
                  placeholder="Card text…"
                  className="w-full rounded border border-ink/15 bg-transparent px-2 py-1 text-sm text-ink dark:border-paper/20 dark:text-paper"
                />
                <button
                  type="submit"
                  className="rounded border border-copper px-2 text-xs text-copper"
                >
                  Add
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setActiveAddCol(col.id)}
                className="rounded-md border border-dashed border-ink/20 py-1.5 text-xs text-ink/50 transition-colors hover:border-copper hover:text-copper dark:border-paper/20 dark:text-paper/50"
              >
                + Add card
              </button>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink/50 dark:text-paper/50">
        Drag cards between columns, or focus a card and use ← / → to move it, Delete to remove it.
        State persists to localStorage.
      </p>
    </div>
  )
}
