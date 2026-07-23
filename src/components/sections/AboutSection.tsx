import RotatingText from '../reactbits/RotatingText'

export default function AboutSection() {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div
        className="w-28 h-28 rounded-full overflow-hidden"
        style={{
          border: '2px solid var(--accent)',
          boxShadow: '0 0 30px var(--accent-glow)',
        }}
      >
        <img
          src="https://github.com/nisarg5900.png"
          alt="Nisarg Patel"
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)]">
          Nisarg Patel
        </h2>
        <div className="mt-3 text-lg md:text-xl text-[var(--accent)]">
          <RotatingText
            texts={['Entrepreneur', 'Designer', 'Techie', 'Builder']}
            mainClassName="px-2 py-0.5 bg-[var(--accent)]/10 rounded-md overflow-hidden"
            staggerFrom="last"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2500}
            splitBy="characters"
            auto
            loop
          />
        </div>
      </div>

      {/* Available badge */}
      <div className="flex items-center gap-2 text-sm text-green-400">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
        </span>
        Available To Work
      </div>

      {/* Info */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
        <span>Mumbai, India</span>
        <span className="hidden md:inline">&middot;</span>
        <span>EXTC Engineer</span>
        <span className="hidden md:inline">&middot;</span>
        <span>University of Mumbai</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
        {['EN', 'HI', 'MR', 'GU', 'FR'].map(lang => (
          <span
            key={lang}
            className="px-2 py-0.5 rounded"
            style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)' }}
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-2">
        <a
          href="mailto:nisarg6900@gmail.com"
          className="px-5 py-2 text-sm rounded-lg font-medium transition-colors"
          style={{
            background: 'var(--accent)',
            color: '#050510',
          }}
        >
          Email Me
        </a>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 text-sm rounded-lg font-medium transition-colors"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            color: 'var(--text)',
          }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}
