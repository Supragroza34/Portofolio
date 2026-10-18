export function Footer() {
  return (
    <footer className="border-t border-ink/10 py-8 dark:border-paper/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-paper/50">
        <p className="font-mono">© {new Date().getFullYear()} Amey Tripathi</p>
        <p className="font-mono">Built with React, Vite &amp; Tailwind CSS</p>
      </div>
    </footer>
  )
}
