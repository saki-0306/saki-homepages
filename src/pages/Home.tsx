import { Link } from 'react-router-dom'
import { articles, genres, genreBySlug, fmtDate, excerpt } from '../lib/content'
import { useParallax } from '../hooks/useParallax'
import { C, F } from '../theme'

export default function Home() {
  useParallax([])
  const recent = articles.slice(0, 4)

  return (
    <div>
      {/* ============ HERO ============ */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: 640,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          data-parallax="0.18"
          data-pbase="translate(-50%,-50%)"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: F.mincho,
            fontWeight: 900,
            fontSize: 'min(58vw,880px)',
            lineHeight: 1,
            color: 'rgba(34,64,47,.045)',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          問
        </div>
        <div
          data-reveal
          style={{
            fontFamily: F.sans,
            fontSize: 12,
            letterSpacing: '.42em',
            color: C.muted,
            textTransform: 'uppercase',
            marginBottom: 26,
            zIndex: 2,
            textAlign: 'center',
          }}
        >
          Sociology · Literature · Philosophy · Language
        </div>
        <h1
          data-reveal
          style={{
            margin: 0,
            fontFamily: F.garamond,
            fontWeight: 400,
            fontSize: 'min(30vw,260px)',
            lineHeight: 0.9,
            letterSpacing: '-.02em',
            color: C.green,
            zIndex: 2,
          }}
        >
          Saki
        </h1>
        <p
          data-reveal
          style={{
            margin: '30px 0 0',
            fontFamily: F.mincho,
            fontSize: 'clamp(17px,2vw,22px)',
            letterSpacing: '.5em',
            color: '#3a3a33',
            paddingLeft: '.5em',
            zIndex: 2,
            textAlign: 'center',
          }}
        >
          哲 学 ・ 文 学 ・ 語 学 ・ 社 会 学
        </p>
        <div
          style={{
            position: 'absolute',
            bottom: 38,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 9,
            fontFamily: F.sans,
            fontSize: 10,
            letterSpacing: '.3em',
            color: C.muted,
          }}
        >
          <span>SCROLL</span>
          <span style={{ animation: 'cuebob 1.9s ease-in-out infinite', fontSize: 15, color: C.green }}>↓</span>
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(90px,15vh,190px) clamp(22px,6vw,40px)' }}>
        <div
          data-reveal
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '.36em', color: C.green, marginBottom: 40 }}
        >
          — 01 &nbsp; MANIFESTO
        </div>
        <p
          data-reveal
          style={{
            margin: 0,
            fontFamily: F.mincho,
            fontWeight: 500,
            fontSize: 'clamp(24px,3.6vw,44px)',
            lineHeight: 1.85,
            letterSpacing: '.02em',
            color: '#22221d',
            textWrap: 'pretty',
          }}
        >
          世界を、いくつかの<span style={{ color: C.green }}>窓</span>から眺めてみる。
          <br />
          哲学は問いを、文学は言葉を、語学は他者を、
          <br />
          社会学は当たり前を、それぞれ差し出してくれる。
          <br />
          ここは、その四つの窓辺に置いた小さな読書ノートです。
        </p>
      </section>

      {/* ============ GENRES ============ */}
      <section
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: 'clamp(40px,7vh,90px) clamp(22px,6vw,40px) clamp(70px,12vh,140px)',
        }}
      >
        <div
          data-reveal
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(27,27,25,.14)',
            paddingBottom: 22,
            marginBottom: 14,
          }}
        >
          <span style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '.36em', color: C.green }}>
            — 02 &nbsp; GENRES
          </span>
          <span style={{ fontFamily: F.garamond, fontStyle: 'italic', fontSize: 17, color: C.muted }}>
            four windows
          </span>
        </div>
        {genres.map((g, i) => (
          <Link
            key={g.slug}
            to={`/genre/${g.slug}`}
            data-reveal
            style={{
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'left',
              textDecoration: 'none',
              borderTop: '1px solid rgba(27,27,25,.14)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              padding: 'clamp(38px,6vh,60px) clamp(10px,3vw,30px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: 'clamp(10px,4vw,60px)',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: F.mincho,
                fontWeight: 900,
                fontSize: 'clamp(90px,15vw,200px)',
                lineHeight: 1,
                color: 'rgba(34,64,47,.06)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {g.kanji}
            </div>
            <span
              style={{
                fontFamily: F.garamond,
                fontSize: 'clamp(15px,1.6vw,19px)',
                color: C.green,
                letterSpacing: '.12em',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {String(i + 1).padStart(2, '0')} — {g.kicker}
            </span>
            <span
              style={{
                fontFamily: F.mincho,
                fontWeight: 700,
                fontSize: 'clamp(34px,5.2vw,64px)',
                color: C.ink,
                letterSpacing: '.04em',
                position: 'relative',
                zIndex: 2,
                lineHeight: 1.1,
              }}
            >
              {g.name}
            </span>
            <span
              style={{
                fontFamily: F.serif,
                fontSize: 'clamp(15px,1.7vw,19px)',
                color: C.muted2,
                position: 'relative',
                zIndex: 2,
                maxWidth: 560,
              }}
            >
              {g.tagline}
            </span>
            <span
              style={{
                fontFamily: F.sans,
                fontSize: 12,
                letterSpacing: '.2em',
                color: C.green,
                position: 'relative',
                zIndex: 2,
                marginTop: 6,
              }}
            >
              読む →
            </span>
          </Link>
        ))}
      </section>

      {/* ============ LATEST ============ */}
      {recent.length > 0 && (
        <section style={{ background: C.green, color: C.onGreen }}>
          <div
            style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(70px,12vh,140px) clamp(22px,6vw,40px)' }}
          >
            <div
              data-reveal
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(238,241,234,.2)',
                paddingBottom: 22,
                marginBottom: 44,
              }}
            >
              <span style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '.36em', color: C.onGreenMuted }}>
                — 03 &nbsp; LATEST
              </span>
              <span style={{ fontFamily: F.garamond, fontStyle: 'italic', fontSize: 17, color: C.onGreenMuted }}>
                recent notes
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))',
                gap: 2,
                background: 'rgba(238,241,234,.14)',
                border: '1px solid rgba(238,241,234,.14)',
              }}
            >
              {recent.map((a) => (
                <Link
                  key={a.id}
                  to={`/article/${a.id}`}
                  data-reveal
                  style={{
                    textAlign: 'left',
                    textDecoration: 'none',
                    background: C.green,
                    padding: '34px 30px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    minHeight: 230,
                  }}
                >
                  <span style={{ fontFamily: F.sans, fontSize: 10.5, letterSpacing: '.24em', color: '#9dbca7' }}>
                    {genreBySlug(a.genre)?.name || ''}
                  </span>
                  <span
                    style={{
                      fontFamily: F.mincho,
                      fontWeight: 600,
                      fontSize: 22,
                      lineHeight: 1.5,
                      color: '#f2f5ee',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    {a.title}
                    {a.password && <span style={{ fontSize: '0.7em' }}>🔒</span>}
                  </span>
                  <span style={{ fontFamily: F.serif, fontSize: 14, lineHeight: 1.7, color: '#c3d3c6' }}>
                    {a.password ? 'パスワードで保護されています' : excerpt(a.body)}
                  </span>
                  <span style={{ fontFamily: F.garamond, fontStyle: 'italic', fontSize: 14, color: '#9dbca7' }}>
                    {fmtDate(a.date)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
