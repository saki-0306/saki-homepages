import { useEffect } from 'react'

// [data-parallax="0.18"] を持つ要素を、スクロールに合わせて緩やかに動かす。
// デザイン(Saki.dc.html)の巨大な漢字（背景の「問」など）の視差効果を再現する。
export function useParallax(deps: unknown[] = []) {
  useEffect(() => {
    let raf = 0
    const apply = () => {
      raf = 0
      const vh = window.innerHeight
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const sp = parseFloat(el.dataset.parallax || '0') || 0
        const r = el.getBoundingClientRect()
        const c = r.top + r.height / 2 - vh / 2
        const base = el.dataset.pbase || ''
        el.style.transform = `${base} translate3d(0, ${(-c * sp).toFixed(1)}px, 0)`
      })
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
