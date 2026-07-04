import { Link, useParams } from 'react-router-dom'
import { articleById, genreBySlug, fmtDate } from '../lib/content'
import Markdown from '../components/Markdown'
import { asset, C, F } from '../theme'

export default function Article() {
  const { id } = useParams()
  const article = articleById(id)

  if (!article) {
    return (
      <div style={{ paddingTop: 66 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 22px', textAlign: 'center' }}>
          <p style={{ fontFamily: F.mincho, fontSize: 20, color: C.muted }}>記事が見つかりませんでした。</p>
          <Link to="/" style={{ fontFamily: F.sans, fontSize: 13, letterSpacing: '.12em', color: C.green }}>
            ← トップへ戻る
          </Link>
        </div>
      </div>
    )
  }

  const genre = genreBySlug(article.genre)

  return (
    <div style={{ paddingTop: 66 }}>
      <article
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: 'clamp(50px,9vh,90px) clamp(22px,6vw,30px) clamp(90px,15vh,150px)',
        }}
      >
        <Link
          to={genre ? `/genre/${genre.slug}` : '/'}
          style={{
            textDecoration: 'none',
            fontFamily: F.sans,
            fontSize: 13,
            letterSpacing: '.12em',
            color: C.green,
            marginBottom: 44,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          ← {genre?.name || '一覧'}
        </Link>
        <div
          style={{
            fontFamily: F.garamond,
            fontStyle: 'italic',
            fontSize: 17,
            color: C.muted,
            letterSpacing: '.06em',
            marginTop: 8,
          }}
        >
          {fmtDate(article.date)}
        </div>
        <h1
          style={{
            margin: '18px 0 0',
            fontFamily: F.mincho,
            fontWeight: 700,
            fontSize: 'clamp(32px,5.2vw,52px)',
            lineHeight: 1.4,
            color: C.ink,
            letterSpacing: '.02em',
            textWrap: 'pretty',
          }}
        >
          {article.title}
        </h1>
        <div style={{ width: 52, height: 2, background: C.green, margin: '38px 0 46px' }} />

        {article.image ? (
          <img
            src={asset(article.image)}
            alt=""
            style={{ width: '100%', borderRadius: 4, margin: '0 0 46px', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 8',
              margin: '0 0 46px',
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
              letterSpacing: '.05em',
            }}
          >
            image slot — 管理画面から画像を設定できます
          </div>
        )}

        <Markdown source={article.body} />
      </article>
    </div>
  )
}
