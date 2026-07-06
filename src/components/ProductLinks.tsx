import type { ProductLink } from '../lib/content'
import { asset, C, F } from '../theme'

// 記事・書籍ページの末尾に置く「関連商品・購入リンク」カード群。
export default function ProductLinks({ links }: { links: ProductLink[] }) {
  if (!links || links.length === 0) return null

  return (
    <div style={{ marginTop: 56 }}>
      <div
        style={{
          fontFamily: F.sans,
          fontSize: 11,
          letterSpacing: '.24em',
          color: C.muted,
          marginBottom: 18,
        }}
      >
        LINKS ・ 関連商品
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))',
          gap: 14,
        }}
      >
        {links.map((l, i) => (
          <a
            key={i}
            href={l.url}
            target="_blank"
            rel="noopener sponsored"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              textDecoration: 'none',
              border: '1px solid rgba(34,64,47,.16)',
              borderRadius: 8,
              padding: '12px 16px',
              background: '#fff',
              transition: 'all .3s',
            }}
          >
            {l.image ? (
              <img
                src={asset(l.image)}
                alt=""
                style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
              />
            ) : (
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 4,
                  background: 'rgba(34,64,47,.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 16,
                  color: C.green,
                }}
              >
                🛒
              </div>
            )}
            <span
              style={{
                fontFamily: F.serif,
                fontSize: 14,
                color: C.ink2,
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              {l.label}
            </span>
            <span style={{ fontFamily: F.sans, fontSize: 13, color: C.green, flexShrink: 0 }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
