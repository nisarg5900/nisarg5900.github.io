import { useState, useEffect, useRef, useCallback } from 'react'

export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)
  const rafId = useRef(0)

  const update = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const scrollHeight = el.scrollHeight || el.offsetHeight
    const viewportHeight = window.innerHeight
    const totalScroll = scrollHeight - viewportHeight

    if (totalScroll <= 0) {
      setProgress(0)
      return
    }

    const scrolled = -rect.top
    const p = Math.max(0, Math.min(1, scrolled / totalScroll))
    setProgress(p)
  }, [containerRef])

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [update])

  return progress
}
