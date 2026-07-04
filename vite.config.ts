import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages のプロジェクトサイトはサブパス配信になるため、
// base はリポジトリ名に合わせる（例: https://saki-0306.github.io/saki-homepages/）。
// リポジトリ名を変えたら、この値だけ書き換えれば OK。
export default defineConfig({
  base: '/saki-homepages/',
  plugins: [react()],
})
