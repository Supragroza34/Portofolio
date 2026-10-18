import { useEffect, useState } from 'react'
import { fetchGitHubRepos, type Repo } from '../../lib/github'

interface State {
  repos: Repo[]
  loading: boolean
  error: boolean
}

export function useGitHubRepos() {
  const [state, setState] = useState<State>({ repos: [], loading: true, error: false })

  useEffect(() => {
    let cancelled = false
    fetchGitHubRepos()
      .then(({ repos }) => {
        if (!cancelled) setState({ repos, loading: false, error: false })
      })
      .catch(() => {
        if (!cancelled) setState({ repos: [], loading: false, error: true })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
