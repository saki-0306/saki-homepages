import { useState } from 'react'
import { C, F } from '../theme'

// パスワード保護されたコンテンツの前に出す入力フォーム。
// 正解すると sessionStorage に記録し、同じタブ内では再入力を求めない。
// 注意: このリポジトリは公開(Public)のため、GitHub上でソースを直接見れば
// 中身は読めてしまう。あくまで「サイト来訪者向けの目隠し」であり、
// 本当に秘匿したい内容の防御にはならない。
function storageKey(scope: string, id: string) {
  return `saki_unlocked:${scope}:${id}`
}

export function isUnlocked(scope: string, id: string): boolean {
  try {
    return sessionStorage.getItem(storageKey(scope, id)) === '1'
  } catch {
    return false
  }
}

function markUnlocked(scope: string, id: string) {
  try {
    sessionStorage.setItem(storageKey(scope, id), '1')
  } catch {
    // ストレージが使えない環境ではセッション記憶を諦める
  }
}

export default function PasswordGate({
  scope,
  id,
  password,
  onUnlock,
  title,
  inline = false,
}: {
  scope: string
  id: string
  password: string
  onUnlock: () => void
  title?: string
  inline?: boolean
}) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === password) {
      markUnlocked(scope, id)
      setError(false)
      onUnlock()
    } else {
      setError(true)
    }
  }

  if (inline) {
    return (
      <form
        onSubmit={submit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          background: 'rgba(34,64,47,.05)',
          border: `1px solid ${error ? '#a53b2f' : 'rgba(34,64,47,.16)'}`,
          borderRadius: 8,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 15 }}>🔒</span>
        <span style={{ fontFamily: F.serif, fontSize: 13, color: C.muted }}>
          {title || '保護されています'}
        </span>
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          placeholder="パスワード"
          style={{
            flex: '1 1 120px',
            minWidth: 100,
            padding: '7px 10px',
            border: `1px solid ${error ? '#a53b2f' : 'rgba(27,27,25,.18)'}`,
            borderRadius: 6,
            fontSize: 13,
            fontFamily: F.serif,
            background: '#faf9f5',
          }}
        />
        <button
          type="submit"
          style={{
            border: 'none',
            background: C.green,
            color: '#f4f3ee',
            cursor: 'pointer',
            fontFamily: F.sans,
            fontSize: 12,
            letterSpacing: '.06em',
            padding: '7px 16px',
            borderRadius: 6,
          }}
        >
          開く
        </button>
        {error && (
          <span style={{ color: '#a53b2f', fontSize: 12, fontFamily: F.sans, width: '100%' }}>
            パスワードが違います
          </span>
        )}
      </form>
    )
  }

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '80px auto',
        padding: '44px 36px',
        background: '#fff',
        border: '1px solid rgba(27,27,25,.1)',
        borderRadius: 8,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 18, color: C.green }}>🔒</div>
      <div style={{ fontFamily: F.mincho, fontSize: 18, color: C.ink, marginBottom: 8 }}>
        {title || 'この内容はパスワードで保護されています'}
      </div>
      <div style={{ fontFamily: F.serif, fontSize: 14, color: C.muted, marginBottom: 26 }}>
        閲覧するにはパスワードを入力してください。
      </div>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          placeholder="パスワード"
          autoFocus
          style={{
            padding: '12px 14px',
            border: `1px solid ${error ? '#a53b2f' : 'rgba(27,27,25,.18)'}`,
            borderRadius: 8,
            fontSize: 15,
            fontFamily: F.serif,
            textAlign: 'center',
            background: '#faf9f5',
          }}
        />
        {error && (
          <div style={{ color: '#a53b2f', fontSize: 13, fontFamily: F.sans }}>
            パスワードが違います
          </div>
        )}
        <button
          type="submit"
          style={{
            border: 'none',
            background: C.green,
            color: '#f4f3ee',
            cursor: 'pointer',
            fontFamily: F.sans,
            fontSize: 14,
            letterSpacing: '.06em',
            padding: '12px',
            borderRadius: 8,
          }}
        >
          開く
        </button>
      </form>
    </div>
  )
}
