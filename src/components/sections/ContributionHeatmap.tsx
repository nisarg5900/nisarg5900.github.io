const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

function getLevel(count: number) {
  if (count === 0) return 'rgba(255,255,255,0.04)'
  if (count <= 2) return 'rgba(94,234,212,0.2)'
  if (count <= 5) return 'rgba(94,234,212,0.4)'
  if (count <= 8) return 'rgba(94,234,212,0.6)'
  return 'rgba(94,234,212,0.85)'
}

function generatePlaceholderData() {
  const weeks: number[][] = []
  let s = 42
  const rng = () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
  for (let w = 0; w < 52; w++) {
    const week: number[] = []
    for (let d = 0; d < 7; d++) {
      const r = rng()
      week.push(r < 0.4 ? 0 : r < 0.65 ? Math.floor(rng() * 3) + 1 : Math.floor(rng() * 8) + 2)
    }
    weeks.push(week)
  }
  return weeks
}

interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface ContributionHeatmapProps {
  weeks?: ContributionWeek[]
}

export default function ContributionHeatmap({ weeks: realWeeks }: ContributionHeatmapProps) {
  const useReal = realWeeks && realWeeks.length > 0
  const weeks = useReal
    ? realWeeks.map(w => w.contributionDays.map(d => d.contributionCount))
    : generatePlaceholderData()

  const cellSize = 11
  const gap = 2

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1 min-w-fit">
        <div className="flex ml-8" style={{ gap: `${gap}px` }}>
          {MONTHS.map((m, i) => (
            <span
              key={m}
              className="text-[10px] text-[var(--text-muted)]"
              style={{ width: (52 / 12) * (cellSize + gap), display: i % 2 === 0 ? 'block' : 'none' }}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex gap-1">
          <div className="flex flex-col" style={{ gap: `${gap}px` }}>
            {DAYS.map((d, i) => (
              <span
                key={i}
                className="text-[10px] text-[var(--text-muted)] leading-none"
                style={{ height: cellSize, display: 'flex', alignItems: 'center', width: 28 }}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="flex" style={{ gap: `${gap}px` }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: `${gap}px` }}>
                {week.map((count, di) => (
                  <div
                    key={di}
                    title={`${count} contributions`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: 2,
                      background: getLevel(count),
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
