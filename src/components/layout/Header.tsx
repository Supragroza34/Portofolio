import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const NAV_ITEMS = [
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'CV', to: '/cv' },
  { label: 'Projects', to: '/projects' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-copper'
    : 'text-ink/70 transition-colors hover:text-copper dark:text-paper/70 dark:hover:text-copper'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-paper/10 dark:bg-ink/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink
          to="/about"
          className="font-mono text-sm font-medium tracking-tight text-ink dark:text-paper"
        >
          Amey Tripathi<span className="text-copper">.</span>
        </NavLink>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 font-mono text-xs uppercase tracking-wide">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden dark:border-paper/20 dark:text-paper"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="md:hidden">
          <ul className="flex flex-col gap-1 border-t border-ink/10 px-4 py-3 font-mono text-sm uppercase tracking-wide dark:border-paper/10">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? 'text-copper' : 'text-ink/80 hover:text-copper dark:text-paper/80'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
