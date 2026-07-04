// content/ 以下の Markdown を、ビルド時に import.meta.glob でまとめて読み込む。
// フロントマター(--- で囲んだ YAML) と本文を分離してオブジェクト化する。
import yaml from 'js-yaml'

// ---- 型定義 ---------------------------------------------------------------
export type Genre = {
  slug: string
  name: string
  kicker: string
  kanji: string
  tagline: string
  order: number
}

export type Article = {
  id: string
  title: string
  date: string
  genre: string // Genre.slug への参照
  image?: string
  body: string
}

export type NewsItem = {
  id: string
  date: string
  message: string
}

export type Photo = {
  id: string
  image?: string
  caption?: string
  date?: string
}

export type ProfileLink = { label: string; url: string }
export type Profile = {
  name: string
  photo?: string
  title: string
  bio: string
  likes: string[]
  links: ProfileLink[]
}

// ---- フロントマター分解 ---------------------------------------------------
type Parsed = { data: Record<string, any>; body: string }
function parse(raw: string): Parsed {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!m) return { data: {}, body: raw.trim() }
  const data = (yaml.load(m[1]) as Record<string, any>) || {}
  return { data, body: (m[2] || '').trim() }
}

// ファイルパスから拡張子抜きのファイル名(スラッグ)を取り出す
function fileSlug(path: string): string {
  const base = path.split('/').pop() || path
  return base.replace(/\.md$/, '')
}

// YAML は `2026-06-10` を Date オブジェクトに自動変換するため、
// 常に 'YYYY-MM-DD' の文字列へ正規化する（UTC基準でずれを防ぐ）。
function toDateStr(v: any): string {
  if (!v) return ''
  if (v instanceof Date) {
    const y = v.getUTCFullYear()
    const m = String(v.getUTCMonth() + 1).padStart(2, '0')
    const d = String(v.getUTCDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  return String(v).slice(0, 10)
}

// ---- 各コレクションの読み込み ---------------------------------------------
const blogRaw = import.meta.glob('../../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const genreRaw = import.meta.glob('../../content/genres/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const newsRaw = import.meta.glob('../../content/news/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const galleryRaw = import.meta.glob('../../content/gallery/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const profileRaw = import.meta.glob('../../content/profile.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

// 新しい日付が先頭に来るよう降順ソート
function byDateDesc<T extends { date?: string }>(a: T, b: T): number {
  return String(b.date || '').localeCompare(String(a.date || ''))
}

export const genres: Genre[] = Object.entries(genreRaw)
  .map(([path, raw]) => {
    const { data } = parse(raw)
    return {
      slug: String(data.slug || fileSlug(path)),
      name: String(data.name || ''),
      kicker: String(data.kicker || ''),
      kanji: String(data.kanji || data.name || ''),
      tagline: String(data.tagline || ''),
      order: Number(data.order ?? 999),
    }
  })
  .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug))

export const articles: Article[] = Object.entries(blogRaw)
  .map(([path, raw]) => {
    const { data, body } = parse(raw)
    return {
      id: fileSlug(path),
      title: String(data.title || '(無題)'),
      date: toDateStr(data.date),
      genre: String(data.genre || ''),
      image: data.image ? String(data.image) : undefined,
      body,
    }
  })
  .sort(byDateDesc)

export const news: NewsItem[] = Object.entries(newsRaw)
  .map(([path, raw]) => {
    const { data, body } = parse(raw)
    return {
      id: fileSlug(path),
      date: toDateStr(data.date),
      message: String(data.message || body || ''),
    }
  })
  .sort(byDateDesc)

export const photos: Photo[] = Object.entries(galleryRaw)
  .map(([path, raw]) => {
    const { data } = parse(raw)
    return {
      id: fileSlug(path),
      image: data.image ? String(data.image) : undefined,
      caption: data.caption ? String(data.caption) : undefined,
      date: data.date ? toDateStr(data.date) : undefined,
    }
  })
  .sort(byDateDesc)

export const profile: Profile = (() => {
  const raw = Object.values(profileRaw)[0]
  const fallback: Profile = {
    name: 'Saki',
    photo: undefined,
    title: 'Reader & Writer',
    bio: '',
    likes: [],
    links: [],
  }
  if (!raw) return fallback
  const { data } = parse(raw)
  return {
    name: String(data.name || fallback.name),
    photo: data.photo ? String(data.photo) : undefined,
    title: String(data.title || fallback.title),
    bio: String(data.bio || ''),
    likes: Array.isArray(data.likes) ? data.likes.map(String) : [],
    links: Array.isArray(data.links)
      ? data.links
          .filter((l: any) => l && (l.label || l.url))
          .map((l: any) => ({ label: String(l.label || ''), url: String(l.url || '#') }))
      : [],
  }
})()

// ---- 参照ヘルパ -----------------------------------------------------------
export function genreBySlug(slug?: string): Genre | undefined {
  return genres.find((g) => g.slug === slug)
}

export function articlesByGenre(slug: string): Article[] {
  return articles.filter((a) => a.genre === slug)
}

export function articleById(id?: string): Article | undefined {
  return articles.find((a) => a.id === id)
}

export function articleCount(slug: string): number {
  return articles.filter((a) => a.genre === slug).length
}

// 日付 2026-06-30 → 2026.06.30 の表記に整える
export function fmtDate(iso?: string): string {
  if (!iso) return ''
  const p = String(iso).slice(0, 10).split('-')
  return p.length === 3 ? `${p[0]}.${p[1]}.${p[2]}` : String(iso)
}

// Markdown から装飾を除いた抜粋テキストを作る（カード表示用）
export function excerpt(md: string, n = 82): string {
  const s = String(md || '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>`#-]/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
  return s.length > n ? s.slice(0, n) + '…' : s
}
