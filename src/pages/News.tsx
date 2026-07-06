import { useState } from 'react'
import { news, fmtDate } from '../lib/content'
import { asset, C, F } from '../theme'
import { useParallax } from '../hooks/useParallax'
import PasswordGate, { isUnlocked } from '../components/PasswordGate'

function NewsRow({ n }: { n: (typeof news)[number] }) {
  const [unlocked, setUnlocked] = useState(() => isUnlocked('news', n.id))

  return (
    <div
      data-reveal
      style={{
        borderTop: '1px solid rgba(27,27,25,.12)',
        padding: '30px 8px',
        display: 'grid',
        gridTemplateColumns: '130px 1fr',
        gap: 24,
        alignItems: 'baseline',
      }}
    >
      <span style={{ fontFamily: F.garamond, fontStyle: 'italic', fontSize: 16, color: C.muted }}>
        {fmtDate(n.date)}
      </span>
      {n.password && !unlocked ? (
        <PasswordGate scope="news" id={n.id} password={n.password} inline onUnlock={() => setUnlocked(true)} />
      ) : (
        <p
          style={{
            margin: 0,
            fontFamily: F.serif,
            fontSize: 'clamp(17px,2vw,20px)',
            lineHeight: 1.9,
            color: C.ink2,
          }}
        >
          {n.message}
        </p>
      )}
    </div>
  )
}

export default function News() {
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
          近
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
            News
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
            近況
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
            日々のちいさな出来事や、お知らせを書きとめておく場所。
          </p>
        </div>
      </header>

      <section
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: 'clamp(40px,7vh,80px) clamp(22px,6vw,40px) clamp(90px,15vh,160px)',
        }}
      >
        {news.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {news.map((n) => (
              <NewsRow key={n.id} n={n} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: F.mincho }}>
            <div style={{ fontSize: 19, color: C.muted, lineHeight: 2 }}>まだ近況はありません。</div>
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
              近況を書く →
            </a>
          </div>
        )}
      </section>
    </div>
  )
}
