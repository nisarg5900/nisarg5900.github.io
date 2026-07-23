interface Props {
  progress: number
}

const BOOT_LINES = [
  { text: 'NisargOS v1.0', status: '', isBrand: true },
  { text: 'Loading kernel...', status: '[OK]' },
  { text: 'Mounting /skills...', status: '[OK]' },
  { text: 'Connecting to GitHub...', status: '[OK]' },
  { text: 'Loading Instagram feed...', status: '[OK]' },
  { text: 'Starting desktop...', status: '[OK]' },
  { text: 'Welcome, visitor.', status: '', isCursor: true },
]

export default function BootSequence({ progress }: Props) {
  const visibleLines = Math.floor(progress * (BOOT_LINES.length + 1))
  const fadeOut = progress > 0.9 ? (progress - 0.9) / 0.1 : 0

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black"
      style={{ opacity: 1 - fadeOut }}
    >
      <div className="font-mono text-sm leading-loose max-w-md w-full px-8">
        {BOOT_LINES.map((line, i) => {
          if (i >= visibleLines) return null
          return (
            <div key={i} className="flex justify-between gap-8">
              <span
                className={
                  line.isBrand
                    ? 'text-[var(--accent)] text-base font-medium mb-3 block'
                    : 'text-white/50'
                }
              >
                {line.text}
                {line.isCursor && (
                  <span
                    className="inline-block w-[7px] h-[14px] ml-0.5 align-text-bottom"
                    style={{
                      background: 'rgba(94,234,212,0.7)',
                      animation: 'blink 1s step-end infinite',
                    }}
                  />
                )}
              </span>
              {line.status && (
                <span className="text-green-400 shrink-0">{line.status}</span>
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
