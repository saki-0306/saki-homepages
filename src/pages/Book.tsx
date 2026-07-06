import { Link, useParams } from 'react-router-dom'
import { bookBySlug } from '../lib/content'
import Markdown from '../components/Markdown'
import { asset, C, F } from '../theme'

export default function Book() {
  const { slug } = useParams()
  const book = bookBySlug(slug)

  if (!book) {
    return (
      <div style={{ paddingTop: 66 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 22px', textAlign: 'center' }}>
          <p style={{ fontFamily: F.mincho, fontSize: 20, color: C.muted }}>本が見つかりませんでした。</p>
          <Link to="/books" style={{ fontFamily: F.sans, fontSize: 13, letterSpacing: '.12em', color: C.green }}>
            ← 一覧へ戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 66 }}>
      <article style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(50px,9vh,90px) clamp(22px,6vw,30px) clamp(90px,15vh,150px)' }}>
        <Link
          to="/books"
          style={{
            textDecoration: 'none',
            fontFamily: F.sans,
            fontSize: 13,
            letterSpacing: '.12em',
            color: C.green,
            marginBottom: 44,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          ← 書籍一覧
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(120px,25vw,200px) 1fr', gap: 30, marginBottom: 44 }}>
          {book.coverImage ? (
            <img
              src={asset(book.coverImage)}
              alt={book.title}
              style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', borderRadius: 4 }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                aspectRatio: '2/3',
                background: 'rgba(34,64,47,.08)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: C.muted,
                fontSize: 12,
              }}
            >
              cover
            </div>
          )}

          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: F.mincho,
                fontWeight: 700,
                fontSize: 'clamp(32px,5vw,48px)',
                lineHeight: 1.4,
                color: C.ink,
                letterSpacing: '.02em',
              }}
            >
              {book.title}
            </h1>
            {book.author && (
              <div style={{ fontFamily: F.serif, fontSize: 18, color: C.muted2, marginTop: 12 }}>
                {book.author}
              </div>
            )}
            {book.description && (
              <p
                style={{
                  fontFamily: F.serif,
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: C.muted3,
                  marginTop: 20,
                }}
              >
                {book.description}
              </p>
            )}
            <div style={{ marginTop: 24, fontFamily: F.sans, fontSize: 12, letterSpacing: '.08em', color: C.green }}>
              全 {book.chapters.length} 章
            </div>
          </div>
        </div>

        <div style={{ width: 52, height: 2, background: C.green, margin: '44px 0' }} />

        <div>
          {book.chapters.map((ch, i) => (
            <div
              key={i}
              data-reveal
              style={{
                marginBottom: 60,
                paddingBottom: 60,
                borderBottom: i < book.chapters.length - 1 ? '1px solid rgba(27,27,25,.12)' : 'none',
              }}
            >
              <h2
                style={{
                  fontFamily: F.mincho,
                  fontWeight: 700,
                  fontSize: 'clamp(24px,3vw,32px)',
                  color: C.ink,
                  lineHeight: 1.4,
                  marginBottom: 24,
                  letterSpacing: '.02em',
                }}
              >
                第{ch.number}章　{ch.title}
              </h2>
              <Markdown source={ch.body} style={{ fontSize: 16, lineHeight: 2 }} />
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}
