import { useState } from 'react'
import { photos, fmtDate } from '../lib/content'
import { asset, C, F } from '../theme'
import { useParallax } from '../hooks/useParallax'
import PasswordGate, { isUnlocked } from '../components/PasswordGate'

function PhotoCard({ p }: { p: (typeof photos)[number] }) {
  const [unlocked, setUnlocked] = useState(() => isUnlocked('photo', p.id))

  if (p.password && !unlocked) {
    return (
      <figure data-reveal style={{ margin: 0 }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '4 / 5',
            borderRadius: 4,
            background: 'rgba(34,64,47,.06)',
            border: '1px solid rgba(34,64,47,.14)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <PasswordGate scope="photo" id={p.id} password={p.password} inline onUnlock={() => setUnlocked(true)} />
        </div>
      </figure>
    )
  }

  return (
    <figure data-reveal style={{ margin: 0 }}>
      {p.image ? (
        <img
          src={asset(p.image)}
          alt={p.caption || ''}
          style={{
            width: '100%',
            aspectRatio: '4 / 5',
            objectFit: 'cover',
            borderRadius: 4,
            display: 'block',
            background: 'rgba(34,64,47,.06)',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            aspectRatio: '4 / 5',
            borderRadius: 4,
            backgroundImage:
              'repeating-linear-gradient(-45deg,rgba(34,64,47,.05) 0,rgba(34,64,47,.05) 10px,transparent 10px,transparent 20px)',
            border: '1px solid rgba(34,64,47,.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'ui-monospace,monospace',
            fontSize: 12,
            color: C.muted,
          }}
        >
          image slot
        </div>
      )}
      {(p.caption || p.date) && (
        <figcaption
          style={{
            marginTop: 12,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: F.serif, fontSize: 15, color: C.ink2, lineHeight: 1.6 }}>{p.caption}</span>
          {p.date && (
            <span
              style={{
                fontFamily: F.garamond,
                fontStyle: 'italic',
                fontSize: 13,
                color: C.muted,
                whiteSpace: 'nowrap',
              }}
            >
              {fmtDate(p.date)}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

export default function Gallery() {
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
          写
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
            Gallery
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
            写真
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
            言葉にならない風景を、そのまま。
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
        {photos.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(clamp(240px,30vw,340px),1fr))',
              gap: 'clamp(14px,2.4vw,28px)',
            }}
          >
            {photos.map((p) => (
              <PhotoCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: F.mincho }}>
            <div style={{ fontSize: 19, color: C.muted, lineHeight: 2 }}>まだ写真はありません。</div>
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
              写真を追加する →
            </a>
          </div>
        )}
      </section>
    </div>
  )
}
