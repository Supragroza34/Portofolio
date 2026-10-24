import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fetchPost, type BlogPost as BlogPostType } from '../lib/api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    fetchPost(slug)
      .then(setPost)
      .catch(() => setError('Post not found.'))
  }, [slug])

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        to="/blog"
        className="font-mono text-xs uppercase tracking-wide text-ink/60 hover:text-copper dark:text-paper/60"
      >
        ← All posts
      </Link>

      {error && (
        <p className="mt-6 rounded-md border border-copper/40 bg-copper/5 px-4 py-3 text-sm text-ink/70 dark:text-paper/70">
          {error}
        </p>
      )}

      {!post && !error && (
        <div className="mt-8 space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-ink/5 dark:bg-paper/5" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-ink/5 dark:bg-paper/5" />
        </div>
      )}

      {post && (
        <article className="mt-8">
          {post.cover_image_url && (
            <img
              src={post.cover_image_url}
              alt=""
              className="mb-8 w-full rounded-lg object-cover"
            />
          )}
          <p className="font-mono text-xs text-ink/50 dark:text-paper/50">
            {formatDate(post.published_at)}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-paper">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-xs text-ink/70 dark:bg-paper/10 dark:text-paper/70"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="prose-blog mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content_md}</ReactMarkdown>
          </div>
        </article>
      )}
    </section>
  )
}
