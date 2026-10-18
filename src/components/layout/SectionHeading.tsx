interface SectionHeadingProps {
  index: string
  title: string
  description?: string
}

export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="font-mono text-xs tracking-widest text-copper">{index}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-paper">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-ink/70 dark:text-paper/70">{description}</p>
      )}
    </div>
  )
}
