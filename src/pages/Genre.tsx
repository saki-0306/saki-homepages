import { Link, useParams } from 'react-router-dom'
import { articlesByGenre, genreBySlug, fmtDate, excerpt } from '../lib/content'
import { asset, C, F } from '../theme'
import { useParallax } from '../hooks/useParallax'

export default function Genre() {
  const { slug } = useParams()
  const genre = genreBySlug(slug)
  useParallax([slug])

  if (!genre) {
    return (
      <div style={{ paddingTop: 66 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 22px', textAlign: 'center' }}>
          <p style={{ fontFamily: F.mincho, fontSize: 20, color: C.muted }}>ジャンルが見つかりませんでした。</p>
          <Link to="/" style={{ fontFamily: F.sans, fontSize: 13, letterSpacing: '.12em', color: C.green }}>
            ← トップへ戻る
          </Link>
        </div>
      </div>
    )
  }

  const list = articlesByGenre(genre.slug)

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
          {genre.kanji}
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
            {genre.kicker}
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
            {genre.name}
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
            {genre.tagline}
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
        {list.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {list.map((a) => (
              <Link
                key={a.id}
                to={`/article/${a.id}`}
                data-reveal
                className="genre-row"
                style={{
                  textAlign: 'left',
                  textDecoration: 'none',
                  borderTop: '1px solid rgba(27,27,25,.12)',
                  padding: '38px 8px',
                  display: 'grid',
                  gridTemplateColumns: '150px 1fr auto',
                  gap: 30,
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontFamily: F.garamond, fontStyle: 'italic', fontSize: 17, color: C.muted }}>
                  {fmtDate(a.date)}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {a.image && (
                    <img
                      src={asset(a.image)}
                      alt=""
                      style={{ width: '100%', maxWidth: 640, borderRadius: 4, display: 'block' }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: F.mincho,
                      fontWeight: 600,
                      fontSize: 'clamp(23px,2.8vw,32px)',
                      color: C.ink,
                      lineHeight: 1.45,
                    }}
                  >
                    {a.title}
                  </span>
                  <span style={{ fontFamily: F.serif, fontSize: 16, lineHeight: 1.85, color: C.muted3, maxWidth: 640 }}>
                    {excerpt(a.body)}
                  </span>
                </span>
                <span style={{ fontFamily: F.sans, fontSize: 20, color: C.green }}>→</span>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: F.mincho }}>
            <div style={{ fontSize: 19, color: C.muted, lineHeight: 2 }}>
              まだ、この窓辺には言葉が置かれていません。
            </div>
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
              最初の記事を書く →
            </a>
          </div>
        )}
      </section>
    </div>
  )
}
