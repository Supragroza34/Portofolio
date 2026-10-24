// Thin client for the Vercel-hosted admin API (auth, blog CRUD, asset uploads).
// Configure VITE_API_BASE_URL in .env.local — see api-server/README.md.

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''
const TOKEN_KEY = 'admin_token'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body.error ?? `Request failed (${res.status})`)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content_md: string
  cover_image_url: string | null
  tags: string[]
  published_at: string
  updated_at: string
}

export interface SiteAssets {
  profile_photo?: { url: string; updated_at: string }
  cv_file?: { url: string; updated_at: string }
}

export function login(username: string, password: string) {
  return request<{ token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

export function fetchPosts() {
  return request<BlogPost[]>('/api/blog')
}

export function fetchPost(slug: string) {
  return request<BlogPost>(`/api/blog/slug/${encodeURIComponent(slug)}`)
}

export function createPost(data: Partial<BlogPost>) {
  return request<BlogPost>('/api/blog', { method: 'POST', body: JSON.stringify(data) })
}

export function updatePost(id: number, data: Partial<BlogPost>) {
  return request<BlogPost>(`/api/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deletePost(id: number) {
  return request<void>(`/api/blog/${id}`, { method: 'DELETE' })
}

export function fetchAssets() {
  return request<SiteAssets>('/api/assets')
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function uploadPhoto(file: File) {
  const dataBase64 = await fileToBase64(file)
  return request<{ url: string }>('/api/assets/photo', {
    method: 'POST',
    body: JSON.stringify({ filename: file.name, contentType: file.type, dataBase64 }),
  })
}

export async function uploadCV(file: File) {
  const dataBase64 = await fileToBase64(file)
  return request<{ url: string }>('/api/assets/cv', {
    method: 'POST',
    body: JSON.stringify({ filename: file.name, contentType: file.type, dataBase64 }),
  })
}
