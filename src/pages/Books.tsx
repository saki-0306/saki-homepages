import { Link } from 'react-router-dom'
import { books } from '../lib/content'
import { asset, C, F } from '../theme'
import { useParallax } from '../hooks/useParallax'

export default function Books() {
  useParallax([])
  return (
    <div style={{ paddingTop: 66 }}>
      <header style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(27,27,25,.1)' }}>
        <div
          data-parallax="0.12"
          data-pbase="translateY(-50%)"
          style={{
            position: 'absolute',
            right: '-2%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: F.mincho,
            fontWeight: 900,
            fontSize: 'min(44vw,560px)',
            lineHeight: 1,
            color: 'rgba(34,64,47,.05)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          本
        </div>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: 'clamp(80px,14vh,150px) clamp(22px,6vw,40px) clamp(60px,9vh,100px)',
            position: 'relative',
          }}
        >
          <div style={{ fontFamily: F.garamond, fontSize: 20, letterSpacing: '.2em', color: C.green, marginBottom: 22 }}>
            Books
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: F.mincho,
              fontWeight: 700,
              fontSize: 'clamp(46px,8vw,104px)',
              color: C.ink,
              letterSpacing: '.05em',
              lineHeight: 1,
            }}
          >
            書籍・本のまとめ
          </h1>
          <p
            style={{
              margin: '30px 0 0',
              fontFamily: F.serif,
              fontSize: 'clamp(17px,2vw,22px)',
              color: C.muted2,
              maxWidth: 620,
              lineHeight: 1.9,
            }}
          >
            読んだ本を、章ごとにまとめる。そこから見える景色。
          </p>
        </div>
      </header>

      <section
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: 'clamp(40px,7vh,80px) clamp(22px,6vw,40px) clamp(90px,15vh,160px)',
        }}
      >
        {books.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,30vw,300px),1fr))',
              gap: 'clamp(20px,3vw,40px)',
            }}
          >
            {books.map((book) => (
              <Link
                key={book.slug}
                to={`/books/${book.slug}`}
                data-reveal
                style={{
                  textDecoration: 'none',
                  padding: 'clamp(20px,3vw,30px)',
                  background: '#fff',
                  border: '1px solid rgba(27,27,25,.1)',
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'all .3s',
                }}
              >
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
                    cover image
                  </div>
                )}
                <div>
                  <div
                    style={{
                      fontFamily: F.mincho,
                      fontWeight: 600,
                      fontSize: 'clamp(17px,2vw,20px)',
                      color: C.ink,
                      lineHeight: 1.4,
                      marginBottom: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    {book.title}
                    {book.password && <span style={{ fontSize: '0.7em' }}>🔒</span>}
                  </div>
                  {book.author && (
                    <div style={{ fontFamily: F.serif, fontSize: 13, color: C.muted2, marginBottom: 8 }}>
                      {book.author}
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: F.sans,
                      fontSize: 12,
                      letterSpacing: '.08em',
                      color: C.green,
                      marginTop: 8,
                    }}
                  >
                    {book.chapters.length} 章
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: F.mincho }}>
            <div style={{ fontSize: 19, color: C.muted, lineHeight: 2 }}>まだ本のまとめはありません。</div>
            <a
              href={asset('admin/')}
              style={{
                display: 'inline-block',
                marginTop: 26,
                border: '1px solid rgba(34,64,47,.34)',
                textDecoration: 'none',
                fontFamily: F.sans,
                fontSize: 13,
                letterSpacing: '.14em',
                color: C.green,
                padding: '11px 24px',
                borderRadius: 100,
              }}
            >
              最初の本を追加する →
            </a>
          </div>
        )}
      </section>
    </div>
  )
}
