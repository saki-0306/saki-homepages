import { C, F } from '../theme'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(27,27,25,.1)', background: C.paper }}>
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '56px clamp(22px,6vw,40px)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: F.garamond, fontSize: 22, color: C.green }}>Saki</span>
          <span style={{ fontFamily: F.serif, fontSize: 13, color: C.muted }}>思索と言葉のためのノート</span>
        </div>
        <div style={{ fontFamily: F.garamond, fontStyle: 'italic', fontSize: 14, color: C.muted }}>
          © 2026 Saki — Notes on the world.
        </div>
      </div>
    </footer>
  )
}
