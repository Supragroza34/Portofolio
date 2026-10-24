import { useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  ApiError,
  createPost,
  deletePost,
  fetchAssets,
  fetchPosts,
  updatePost,
  uploadCV,
  uploadPhoto,
  type BlogPost,
  type SiteAssets,
} from '../../lib/api'

type Tab = 'posts' | 'profile'

const EMPTY_DRAFT = {
  title: '',
  slug: '',
  excerpt: '',
  content_md: '',
  cover_image_url: '',
  tags: '',
}

export function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('posts')

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingId, setEditingId] = useState<number | 'new' | null>(null)
  const [draft, setDraft] = useState(EMPTY_DRAFT)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [assets, setAssets] = useState<SiteAssets>({})
  const [photoUploading, setPhotoUploading] = useState(false)
  const [cvUploading, setCvUploading] = useState(false)

  const loadPosts = () => fetchPosts().then(setPosts).catch(() => setError('Could not load posts.'))
  const loadAssets = () => fetchAssets().then(setAssets).catch(() => {})

  useEffect(() => {
    loadPosts()
    loadAssets()
  }, [])

  const onLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const startEdit = (post?: BlogPost) => {
    setError(null)
    if (post) {
      setEditingId(post.id)
      setDraft({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content_md: post.content_md,
        cover_image_url: post.cover_image_url ?? '',
        tags: post.tags.join(', '),
      })
    } else {
      setEditingId('new')
      setDraft(EMPTY_DRAFT)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft(EMPTY_DRAFT)
  }

  const saveDraft = async () => {
    setSaving(true)
    setError(null)
    const payload = {
      title: draft.title,
      slug: draft.slug,
      excerpt: draft.excerpt,
      content_md: draft.content_md,
      cover_image_url: draft.cover_image_url || null,
      tags: draft.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }
    try {
      if (editingId === 'new') {
        await createPost(payload)
      } else if (typeof editingId === 'number') {
        await updatePost(editingId, payload)
      }
      await loadPosts()
      cancelEdit()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  const removePost = async (id: number) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    try {
      await deletePost(id)
      await loadPosts()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Delete failed.')
    }
  }

  const onPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoUploading(true)
    try {
      await uploadPhoto(file)
      await loadAssets()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Photo upload failed.')
    } finally {
      setPhotoUploading(false)
    }
  }

  const onCvChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCvUploading(true)
    try {
      await uploadCV(file)
      await loadAssets()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'CV upload failed.')
    } finally {
      setCvUploading(false)
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-paper">
          Admin
        </h1>
        <button
          type="button"
          onClick={onLogout}
          className="font-mono text-xs uppercase tracking-wide text-ink/60 hover:text-copper dark:text-paper/60"
        >
          Log out
        </button>
      </div>

      <div className="mt-6 flex gap-2 border-b border-ink/10 dark:border-paper/10">
        {(['posts', 'profile'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-2 font-mono text-xs uppercase tracking-wide ${
              tab === t
                ? 'border-b-2 border-copper text-copper'
                : 'text-ink/60 dark:text-paper/60'
            }`}
          >
            {t === 'posts' ? 'Blog posts' : 'Profile & CV'}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-copper">{error}</p>}

      {tab === 'posts' && (
        <div className="mt-6">
          {editingId === null ? (
            <>
              <button
                type="button"
                onClick={() => startEdit()}
                className="rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dim"
              >
                New post
              </button>
              <ul className="mt-6 divide-y divide-ink/10 dark:divide-paper/10">
                {posts.map((post) => (
                  <li key={post.id} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="font-medium text-ink dark:text-paper">{post.title}</p>
                      <p className="font-mono text-xs text-ink/50 dark:text-paper/50">
                        /{post.slug}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-3 font-mono text-xs uppercase tracking-wide">
                      <button
                        type="button"
                        onClick={() => startEdit(post)}
                        className="text-teal hover:text-teal-dim"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removePost(post.id)}
                        className="text-copper hover:text-copper-dim"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <input
                placeholder="Title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="rounded-md border border-ink/15 bg-transparent px-3 py-2 text-sm dark:border-paper/20"
              />
              <input
                placeholder="slug-like-this"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                className="rounded-md border border-ink/15 bg-transparent px-3 py-2 font-mono text-sm dark:border-paper/20"
              />
              <input
                placeholder="One-sentence excerpt"
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                className="rounded-md border border-ink/15 bg-transparent px-3 py-2 text-sm dark:border-paper/20"
              />
              <input
                placeholder="Cover image URL (optional)"
                value={draft.cover_image_url}
                onChange={(e) => setDraft({ ...draft, cover_image_url: e.target.value })}
                className="rounded-md border border-ink/15 bg-transparent px-3 py-2 text-sm dark:border-paper/20"
              />
              <input
                placeholder="Tags, comma separated"
                value={draft.tags}
                onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
                className="rounded-md border border-ink/15 bg-transparent px-3 py-2 text-sm dark:border-paper/20"
              />
              <textarea
                placeholder="Markdown content"
                value={draft.content_md}
                onChange={(e) => setDraft({ ...draft, content_md: e.target.value })}
                rows={14}
                className="rounded-md border border-ink/15 bg-transparent px-3 py-2 font-mono text-sm dark:border-paper/20"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={saving}
                  className="rounded-full bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-dim disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm dark:border-paper/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'profile' && (
        <div className="mt-6 flex flex-col gap-10">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-copper">
              Profile photo
            </h2>
            {assets.profile_photo && (
              <img
                src={assets.profile_photo.url}
                alt=""
                className="mt-3 h-24 w-24 rounded-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoChange}
              disabled={photoUploading}
              className="mt-3 block text-sm"
            />
            {photoUploading && <p className="mt-1 text-xs text-ink/50">Uploading…</p>}
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-copper">CV</h2>
            {assets.cv_file && (
              <p className="mt-2 text-sm text-ink/70 dark:text-paper/70">
                Current file:{' '}
                <a href={assets.cv_file.url} className="text-copper underline">
                  view
                </a>
              </p>
            )}
            <input
              type="file"
              accept="application/pdf"
              onChange={onCvChange}
              disabled={cvUploading}
              className="mt-3 block text-sm"
            />
            {cvUploading && <p className="mt-1 text-xs text-ink/50">Uploading…</p>}
          </div>
        </div>
      )}
    </section>
  )
}
