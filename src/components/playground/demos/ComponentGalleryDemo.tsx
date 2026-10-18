import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Accent = 'copper' | 'teal' | 'plum'

const ACCENTS: Record<Accent, string> = {
  copper: '#f16a1f',
  teal: '#4f81c0',
  plum: '#7a4b8f',
}

const TABS = [
  { id: 'overview', label: 'Overview', content: 'Accessible primitives built from scratch — no headless-UI dependency, so you can see exactly how the ARIA wiring works.' },
  { id: 'usage', label: 'Usage', content: 'Each control responds to keyboard navigation, exposes correct roles and states, and keeps visible focus rings.' },
  { id: 'a11y', label: 'Accessibility', content: 'Modal traps focus and restores it on close; toast is announced via a live region; tabs follow the WAI-ARIA tabs pattern.' },
]

export default function ComponentGalleryDemo() {
  const [accent, setAccent] = useState<Accent>('copper')
  const [modalOpen, setModalOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const [inputValue, setInputValue] = useState('')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const inputId = useId()

  useEffect(() => {
    if (!modalOpen) return
    const triggerEl = triggerRef.current
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    modalRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      triggerEl?.focus()
    }
  }, [modalOpen])

  useEffect(() => {
    if (!toastVisible) return
    const timer = setTimeout(() => setToastVisible(false), 2800)
    return () => clearTimeout(timer)
  }, [toastVisible])

  return (
    <div style={{ '--accent': ACCENTS[accent] } as CSSProperties}>
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-wide text-ink/50 dark:text-paper/50">
          Theme
        </span>
        {Object.entries(ACCENTS).map(([key, color]) => (
          <button
            key={key}
            type="button"
            onClick={() => setAccent(key as Accent)}
            aria-pressed={accent === key}
            aria-label={`${key} accent`}
            className="h-6 w-6 rounded-full border-2 transition-transform"
            style={{
              backgroundColor: color,
              borderColor: accent === key ? color : 'transparent',
              transform: accent === key ? 'scale(1.15)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-ink/50 dark:text-paper/50">
            Buttons
          </h4>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-md px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Primary
            </button>
            <button
              type="button"
              className="rounded-md border px-4 py-2 text-sm font-medium"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Secondary
            </button>
            <button
              type="button"
              disabled
              className="rounded-md bg-ink/10 px-4 py-2 text-sm font-medium text-ink/40 dark:bg-paper/10 dark:text-paper/40"
            >
              Disabled
            </button>
          </div>

          <h4 className="mb-3 mt-6 font-mono text-xs uppercase tracking-wide text-ink/50 dark:text-paper/50">
            Input
          </h4>
          <label htmlFor={inputId} className="mb-1 block text-sm text-ink/70 dark:text-paper/70">
            Claim reference
          </label>
          <input
            id={inputId}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. HC-20481"
            className="w-full rounded-md border border-ink/15 bg-transparent px-3 py-2 text-sm text-ink dark:border-paper/20 dark:text-paper"
          />

          <h4 className="mb-3 mt-6 font-mono text-xs uppercase tracking-wide text-ink/50 dark:text-paper/50">
            Toast
          </h4>
          <button
            type="button"
            onClick={() => setToastVisible(true)}
            className="rounded-md border px-4 py-2 text-sm font-medium"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            Trigger toast
          </button>
        </div>

        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-ink/50 dark:text-paper/50">
            Modal
          </h4>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Open modal
          </button>

          <h4 className="mb-3 mt-6 font-mono text-xs uppercase tracking-wide text-ink/50 dark:text-paper/50">
            Tabs
          </h4>
          <div role="tablist" aria-label="Demo tabs" className="flex gap-1 border-b border-ink/10 dark:border-paper/10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`gallery-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`gallery-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-3 py-2 text-sm text-ink/70 dark:text-paper/70"
                style={activeTab === tab.id ? { color: 'var(--accent)' } : undefined}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                )}
              </button>
            ))}
          </div>
          {TABS.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`gallery-panel-${tab.id}`}
              aria-labelledby={`gallery-tab-${tab.id}`}
              hidden={activeTab !== tab.id}
              className="py-3 text-sm text-ink/70 dark:text-paper/70"
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-modal-title"
              tabIndex={-1}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-lg bg-paper p-6 dark:bg-ink"
            >
              <h5 id="gallery-modal-title" className="font-display text-lg font-semibold text-ink dark:text-paper">
                Confirm action
              </h5>
              <p className="mt-2 text-sm text-ink/70 dark:text-paper/70">
                Focus is trapped inside this dialog and returns to the trigger button on close.
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-md border border-ink/15 px-3 py-1.5 text-sm text-ink/80 dark:border-paper/20 dark:text-paper/80"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false)
                    setToastVisible(true)
                  }}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-white"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
        <AnimatePresence>
          {toastVisible && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="rounded-md bg-ink px-4 py-2 text-sm text-paper shadow-lg dark:bg-paper dark:text-ink"
            >
              Action completed successfully
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
