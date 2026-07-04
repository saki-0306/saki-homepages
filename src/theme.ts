// デザイン(Saki.dc.html)から抽出したカラー・フォントのトークン。
// 画面をまたいで同じ値を使い、世界観を統一する。
export const C = {
  paper: '#f4f3ee', // 生成りの紙色（背景）
  paperAlt: '#eceae3', // 一段沈んだ背景（管理室など）
  ink: '#1b1b19', // 主要な文字色
  ink2: '#26261f',
  ink3: '#33332c',
  green: '#22402f', // アクセントの濃い緑
  greenSoft: '#2b5039',
  muted: '#8a897c', // 補助テキスト
  muted2: '#54544b',
  muted3: '#65655c',
  line: 'rgba(27,27,25,.12)',
  onGreen: '#eef1ea', // 緑背景の上のテキスト
  onGreenMuted: '#bcd2c2',
} as const

export const F = {
  mincho: "'Zen Old Mincho', serif", // 見出し・力強い明朝
  serif: "'Shippori Mincho', serif", // 本文の明朝
  garamond: "'EB Garamond', serif", // 欧文・イタリック
  sans: "'Zen Kaku Gothic Antique', sans-serif", // ラベル・英字ゴシック
} as const

// リポジトリ名(base)を加味して、`/images/...` のような絶対パスを解決する。
// 管理画面(Sveltia)は public_folder=`/images/uploads` で保存するため、
// GitHub Pages のサブパス配信でも壊れないようここで base を前置する。
export function asset(path?: string): string {
  if (!path) return ''
  if (/^https?:\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL // 例: '/saki-homepages/'
  return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
}
