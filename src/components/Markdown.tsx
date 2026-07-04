import { useMemo } from 'react'
import { marked } from 'marked'

marked.setOptions({ breaks: true, gfm: true })

// Markdown 文字列を HTML にして .md クラスで描画する。
// 本文は content/ 由来（自分で書いたもの）なので信頼して挿入する。
export default function Markdown({ source, style }: { source: string; style?: React.CSSProperties }) {
  const html = useMemo(() => marked.parse(source || '', { async: false }) as string, [source])
  return <div className="md" style={style} dangerouslySetInnerHTML={{ __html: html }} />
}
