import { useState } from 'react'
import { SectionHeading } from '../layout/SectionHeading'
import { personal } from '../../data/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — user can still select/copy the text manually
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl border-t border-ink/10 px-4 py-20 sm:px-6 dark:border-paper/10"
    >
      <SectionHeading
        index="08 — Contact"
        title="Get in touch"
        description={personal.location}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 dark:border-paper/20">
          <span className="font-mono text-sm text-ink dark:text-paper">{personal.email}</span>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="text-ink/50 transition-colors hover:text-copper dark:text-paper/50"
          >
            {copied ? (
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 12l5 5L20 6" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="11" height="11" rx="1.5" />
                <path d="M5 15V5a1.5 1.5 0 0 1 1.5-1.5H15" />
              </svg>
            )}
          </button>
        </div>

        <a
          href="https://linkedin.com/in/amey-tripathi-335670256"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-copper hover:text-copper dark:border-paper/20 dark:text-paper"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/Supragroza34"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-copper hover:text-copper dark:border-paper/20 dark:text-paper"
        >
          GitHub
        </a>
      </div>
      {copied && (
        <p role="status" className="mt-3 text-sm text-teal">
          Email copied to clipboard
        </p>
      )}
    </section>
  )
}
