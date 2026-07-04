import { Link } from 'react-router-dom'
import { C, F } from '../theme'

export default function NotFound() {
  return (
    <div style={{ paddingTop: 66 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '140px 22px', textAlign: 'center' }}>
        <div style={{ fontFamily: F.mincho, fontWeight: 900, fontSize: 88, color: 'rgba(34,64,47,.14)' }}>迷</div>
        <p style={{ fontFamily: F.mincho, fontSize: 20, color: C.muted, lineHeight: 2 }}>
          このページは見つかりませんでした。
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: 18,
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
          ← トップへ戻る
        </Link>
      </div>
    </div>
  )
}
