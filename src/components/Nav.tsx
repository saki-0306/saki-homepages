import { Link, useLocation } from 'react-router-dom'
import { genres } from '../lib/content'
import { asset, C, F } from '../theme'

// 上部固定のナビゲーション。ジャンル(動的)＋近況＋写真＋プロフィール＋編集。
export default function Nav() {
  const { pathname } = useLocation()

  const linkStyle = (active: boolean): React.CSSProperties => ({
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'none',
    fontFamily: F.mincho,
    fontSize: 15,
    letterSpacing: '.06em',
    color: active ? C.green : C.muted2,
    fontWeight: active ? 600 : 400,
    transition: 'color .3s',
    whiteSpace: 'nowrap',
  })

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 66,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px,5vw,54px)',
        background: 'rgba(244,243,238,.72)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(27,27,25,.08)',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: F.garamond, fontSize: 26, letterSpacing: '.04em', color: C.green }}>Saki</span>
        <span
          style={{
            fontFamily: F.sans,
            fontSize: 10.5,
            letterSpacing: '.34em',
            color: C.muted,
            textTransform: 'uppercase',
          }}
        >
          Notes
        </span>
      </Link>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px,2.2vw,26px)',
          overflowX: 'auto',
          maxWidth: '72vw',
        }}
      >
        {genres.map((g) => (
          <Link key={g.slug} to={`/genre/${g.slug}`} style={linkStyle(pathname.startsWith(`/genre/${g.slug}`))}>
            {g.name}
          </Link>
        ))}
        <Link to="/news" style={linkStyle(pathname.startsWith('/news'))}>
          近況
        </Link>
        <Link to="/gallery" style={linkStyle(pathname.startsWith('/gallery'))}>
          写真
        </Link>
        <Link to="/profile" style={linkStyle(pathname.startsWith('/profile'))}>
          プロフィール
        </Link>
        <a
          href={asset('admin/')}
          style={{
            border: '1px solid rgba(34,64,47,.34)',
            background: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            fontFamily: F.sans,
            fontSize: 12,
            letterSpacing: '.14em',
            color: C.green,
            padding: '7px 15px',
            borderRadius: 100,
            whiteSpace: 'nowrap',
          }}
        >
          編集
        </a>
      </div>
    </nav>
  )
}
