import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface Claim {
  month: string
  type: 'Home' | 'Motor' | 'Travel'
  region: 'London' | 'North' | 'Scotland'
  submitted: number
  approved: number
  rejected: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const TYPES: Claim['type'][] = ['Home', 'Motor', 'Travel']
const REGIONS: Claim['region'][] = ['London', 'North', 'Scotland']

function seedData(): Claim[] {
  const data: Claim[] = []
  let seed = 42
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (const month of MONTHS) {
    for (const type of TYPES) {
      for (const region of REGIONS) {
        const submitted = Math.round(20 + rand() * 60)
        const approved = Math.round(submitted * (0.55 + rand() * 0.3))
        const rejected = Math.round((submitted - approved) * (0.4 + rand() * 0.4))
        data.push({ month, type, region, submitted, approved, rejected })
      }
    }
  }
  return data
}

const DATA = seedData()

export default function ClaimsDashboardDemo() {
  const [typeFilter, setTypeFilter] = useState<Claim['type'] | 'All'>('All')
  const [regionFilter, setRegionFilter] = useState<Claim['region'] | 'All'>('All')

  const filtered = useMemo(
    () =>
      DATA.filter(
        (d) => (typeFilter === 'All' || d.type === typeFilter) &&
          (regionFilter === 'All' || d.region === regionFilter),
      ),
    [typeFilter, regionFilter],
  )

  const byMonth = useMemo(
    () =>
      MONTHS.map((month) => {
        const rows = filtered.filter((d) => d.month === month)
        return {
          month,
          submitted: rows.reduce((sum, r) => sum + r.submitted, 0),
          approved: rows.reduce((sum, r) => sum + r.approved, 0),
          rejected: rows.reduce((sum, r) => sum + r.rejected, 0),
        }
      }),
    [filtered],
  )

  const totals = useMemo(
    () => ({
      submitted: byMonth.reduce((s, m) => s + m.submitted, 0),
      approved: byMonth.reduce((s, m) => s + m.approved, 0),
      rejected: byMonth.reduce((s, m) => s + m.rejected, 0),
    }),
    [byMonth],
  )

  const maxValue = Math.max(...byMonth.map((m) => m.submitted), 1)
  const approvalRate = totals.submitted
    ? Math.round((totals.approved / totals.submitted) * 100)
    : 0

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as Claim['type'] | 'All')}
          className="rounded-full border border-ink/15 bg-transparent px-3 py-1.5 text-xs font-mono text-ink dark:border-paper/20 dark:text-paper"
          aria-label="Filter by claim type"
        >
          <option value="All">All types</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value as Claim['region'] | 'All')}
          className="rounded-full border border-ink/15 bg-transparent px-3 py-1.5 text-xs font-mono text-ink dark:border-paper/20 dark:text-paper"
          aria-label="Filter by region"
        >
          <option value="All">All regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: 'Submitted', value: totals.submitted, color: 'text-ink dark:text-paper' },
          { label: 'Approved', value: totals.approved, color: 'text-teal' },
          { label: 'Approval rate', value: `${approvalRate}%`, color: 'text-copper' },
        ].map((tile) => (
          <div
            key={tile.label}
            className="rounded-md border border-ink/10 p-3 dark:border-paper/10"
          >
            <p className="font-mono text-xs text-ink/50 dark:text-paper/50">{tile.label}</p>
            <p className={`mt-1 font-display text-2xl font-semibold ${tile.color}`}>
              {tile.value}
            </p>
          </div>
        ))}
      </div>

      <div
        role="img"
        aria-label={`Bar chart of claims submitted, approved and rejected per month, filtered by ${typeFilter} claims in ${regionFilter} region`}
        className="flex h-56 items-end gap-4 border-b border-ink/10 pb-1 dark:border-paper/10"
      >
        {byMonth.map((m) => (
          <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-44 w-full items-end justify-center gap-1">
              <motion.div
                layout
                animate={{ height: `${(m.submitted / maxValue) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="w-3 rounded-t bg-ink/30 dark:bg-paper/30"
                title={`Submitted: ${m.submitted}`}
              />
              <motion.div
                layout
                animate={{ height: `${(m.approved / maxValue) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="w-3 rounded-t bg-teal"
                title={`Approved: ${m.approved}`}
              />
              <motion.div
                layout
                animate={{ height: `${(m.rejected / maxValue) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="w-3 rounded-t bg-copper"
                title={`Rejected: ${m.rejected}`}
              />
            </div>
            <span className="font-mono text-xs text-ink/50 dark:text-paper/50">{m.month}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-4 font-mono text-xs text-ink/60 dark:text-paper/60">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-ink/30 dark:bg-paper/30" /> Submitted
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-teal" /> Approved
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-copper" /> Rejected
        </span>
      </div>
    </div>
  )
}
