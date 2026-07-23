import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export default function Section({ id, title, children, className = '' }: Props) {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center px-4 py-24 ${className}`}
    >
      <div
        className="w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--surface-border)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Window title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: '1px solid var(--surface-border)' }}
        >
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-2 text-xs text-[var(--text-muted)] tracking-wide">
            {title}
          </span>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">{children}</div>
      </div>
    </section>
  )
}
