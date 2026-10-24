import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts, type BlogPost } from '../lib/api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogHome() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setError('Could not load posts right now.'))
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-12">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-paper">
          Writing
        </h1>
        <p className="mt-2 text-ink/70 dark:text-paper/70">
          Notes on what I&apos;m building, learning, and breaking.
        </p>
      </header>

      {error && (
        <p className="rounded-md border border-copper/40 bg-copper/5 px-4 py-3 text-sm text-ink/70 dark:text-paper/70">
          {error}
        </p>
      )}

      {!posts && !error && (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-ink/5 dark:bg-paper/5" />
          ))}
        </div>
      )}

      {posts && posts.length === 0 && (
        <p className="text-ink/60 dark:text-paper/60">
          No posts yet — check back soon.
        </p>
      )}

      {posts && posts.length > 0 && (
        <ol className="divide-y divide-ink/10 dark:divide-paper/10">
          {posts.map((post) => (
            <li key={post.id} className="py-7 first:pt-0">
              <Link to={`/blog/${post.slug}`} className="group flex gap-5">
                {post.cover_image_url && (
                  <img
                    src={post.cover_image_url}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-md object-cover"
                  />
                )}
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink group-hover:text-copper dark:text-paper">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink/70 dark:text-paper/70">
                    {post.excerpt}
                  </p>
                  <p className="mt-2 font-mono text-xs text-ink/50 dark:text-paper/50">
                    {formatDate(post.published_at)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
