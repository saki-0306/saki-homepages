import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'

// GitHub Pages のサブパス配信でもルーティングが確実に動くよう HashRouter を採用。
// （/#/genre/philosophy のような URL になり、404 回避の小細工が不要）
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
