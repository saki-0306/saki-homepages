import { profile } from '../lib/content'
import { asset, C, F } from '../theme'

export default function Profile() {
  const paras = profile.bio.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean)

  return (
    <div style={{ paddingTop: 66 }}>
      <section
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: 'clamp(80px,14vh,150px) clamp(22px,6vw,40px) clamp(90px,15vh,150px)',
        }}
      >
        <div
          data-reveal
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '.36em', color: C.green, marginBottom: 40 }}
        >
          — PROFILE
        </div>

        {profile.photo && (
          <img
            data-reveal
            src={asset(profile.photo)}
            alt={profile.name}
            style={{
              width: 128,
              height: 128,
              objectFit: 'cover',
              borderRadius: '50%',
              display: 'block',
              marginBottom: 30,
              border: '1px solid rgba(34,64,47,.18)',
            }}
          />
        )}

        <h1
          data-reveal
          style={{
            margin: 0,
            fontFamily: F.mincho,
            fontWeight: 700,
            fontSize: 'clamp(44px,7vw,84px)',
            color: C.ink,
            letterSpacing: '.04em',
            lineHeight: 1,
          }}
        >
          {profile.name}
        </h1>
        <div
          data-reveal
          style={{
            marginTop: 22,
            fontFamily: F.garamond,
            fontStyle: 'italic',
            fontSize: 'clamp(18px,2.2vw,24px)',
            color: C.green,
          }}
        >
          {profile.title}
        </div>

        <div style={{ width: 52, height: 2, background: C.green, margin: '48px 0' }} />

        <div style={{ maxWidth: 640 }}>
          {paras.map((p, i) => (
            <p
              key={i}
              data-reveal
              style={{
                margin: '0 0 1.7em',
                fontFamily: F.serif,
                fontSize: 19,
                lineHeight: 2.1,
                color: C.ink3,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {profile.likes.length > 0 && (
          <div data-reveal style={{ marginTop: 48 }}>
            <div
              style={{
                fontFamily: F.sans,
                fontSize: 11,
                letterSpacing: '.24em',
                color: C.muted,
                marginBottom: 18,
              }}
            >
              LIKES ・ 好きなもの
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {profile.likes.map((l, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: F.serif,
                    fontSize: 15,
                    color: C.ink3,
                    background: 'rgba(34,64,47,.06)',
                    border: '1px solid rgba(34,64,47,.14)',
                    borderRadius: 100,
                    padding: '8px 18px',
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.links.length > 0 && (
          <div data-reveal style={{ marginTop: 56, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            {profile.links.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener"
                style={{
                  textDecoration: 'none',
                  border: '1px solid rgba(34,64,47,.3)',
                  borderRadius: 100,
                  padding: '10px 22px',
                  fontFamily: F.sans,
                  fontSize: 13,
                  letterSpacing: '.08em',
                  color: C.green,
                }}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
