export default function ContactSection() {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h2 className="text-3xl font-bold text-[var(--text)]">Let&rsquo;s Connect</h2>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText('nisarg6900@gmail.com')
          }}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          style={{
            background: 'var(--accent)',
            color: '#050510',
          }}
        >
          nisarg6900@gmail.com — Click to copy
        </button>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            color: 'var(--text)',
          }}
        >
          WhatsApp
        </a>
      </div>

      {/* Social icons */}
      <div className="flex gap-6 mt-4">
        <a
          href="https://github.com/nisarg5900"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-xl"
          aria-label="GitHub"
        >
          GitHub
        </a>
        <a
          href="https://instagram.com/nisarg5900"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-xl"
          aria-label="Instagram"
        >
          Instagram
        </a>
        <a
          href="https://linkedin.com/in/nisargpatel5900"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-xl"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-[var(--text-muted)] opacity-50">
        &copy; 2026 Nisarg Patel
      </div>
    </div>
  )
}
