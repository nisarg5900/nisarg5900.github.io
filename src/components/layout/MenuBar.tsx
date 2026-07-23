import { useEffect, useState } from 'react'

export default function MenuBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        })
      )
    }
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-8"
      style={{
        background: 'rgba(5, 5, 16, 0.6)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <span className="text-xs font-semibold tracking-wider text-[var(--accent)]">
        NisargOS
      </span>
      <span className="text-xs text-[var(--text-muted)]">
        {time} &middot; Mumbai, IN
      </span>
    </header>
  )
}
