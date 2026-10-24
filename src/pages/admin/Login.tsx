import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ApiError } from '../../lib/api'

export function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(username, password)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Login failed — try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto flex max-w-sm flex-col px-4 py-24 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-paper">
        Admin sign in
      </h1>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wide text-ink/60 dark:text-paper/60">
            Username
          </span>
          <input
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md border border-ink/15 bg-transparent px-3 py-2 text-sm text-ink dark:border-paper/20 dark:text-paper"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wide text-ink/60 dark:text-paper/60">
            Password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-ink/15 bg-transparent px-3 py-2 text-sm text-ink dark:border-paper/20 dark:text-paper"
          />
        </label>

        {error && <p className="text-sm text-copper">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-copper px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-copper-dim disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  )
}
