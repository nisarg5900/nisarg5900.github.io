export default function RecommendationSection() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <div className="text-5xl text-[var(--accent)] opacity-30">&ldquo;</div>

      <blockquote className="text-lg md:text-xl text-[var(--text)] leading-relaxed max-w-lg">
        Nisarg is very enthusiastic &amp; hardworking person. Very good in nature
        and very innovative.
      </blockquote>

      <div className="space-y-1">
        <div className="text-sm font-medium text-[var(--text)]">Rahul Vaidya</div>
        <div className="text-xs text-[var(--text-muted)]">
          General Manager — Purchase Department
        </div>
        <div className="text-xs text-[var(--text-muted)]">Finolex Cables Limited</div>
        <div className="text-xs text-[var(--text-muted)] mt-2 opacity-60">29 Nov 2023</div>
      </div>
    </div>
  )
}
