import { github } from '../data/profile'

export interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
}

const CACHE_KEY = `gh-repos-${github.username}`
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

interface CacheEntry {
  fetchedAt: number
  repos: Repo[]
}

function readCache(): Repo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (Date.now() - entry.fetchedAt > CACHE_TTL_MS) return null
    return entry.repos
  } catch {
    return null
  }
}

function writeCache(repos: Repo[]) {
  try {
    const entry: CacheEntry = { fetchedAt: Date.now(), repos }
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // localStorage unavailable (e.g. private mode) — safe to ignore
  }
}

function filterRepos(repos: Repo[]): Repo[] {
  return repos
    .filter((repo) => !repo.fork)
    .filter((repo) => !github.excludeRepos.includes(repo.name))
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

export async function fetchGitHubRepos(): Promise<{ repos: Repo[]; fromCache: boolean }> {
  const cached = readCache()
  if (cached) return { repos: cached, fromCache: true }

  const response = await fetch(
    `https://api.github.com/users/${github.username}/repos?per_page=100&sort=updated`,
  )
  if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`)

  const raw = (await response.json()) as Repo[]
  const repos = filterRepos(raw)
  writeCache(repos)
  return { repos, fromCache: false }
}
