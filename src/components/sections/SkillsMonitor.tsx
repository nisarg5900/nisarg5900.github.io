import { useEffect, useRef, useState } from 'react'

interface Skill {
  name: string
  category: string
  level: number
}

const CORE: Skill[] = [
  { name: 'Procurement & Supply Chain', category: 'Operations', level: 90 },
  { name: 'MRP', category: 'Operations', level: 85 },
  { name: 'DFA / DFM', category: 'Engineering', level: 80 },
  { name: 'Inventory Management', category: 'Operations', level: 88 },
  { name: 'Framer Development', category: 'Design', level: 75 },
  { name: 'Prototyping', category: 'Engineering', level: 82 },
  { name: 'Research', category: 'Strategy', level: 85 },
  { name: 'TDS / GST', category: 'Finance', level: 78 },
  { name: 'Task Delegation', category: 'Leadership', level: 88 },
  { name: 'Goal Setting', category: 'Leadership', level: 85 },
]

const SOFT: Skill[] = [
  { name: 'Communicator', category: 'People', level: 92 },
  { name: 'Team Player', category: 'People', level: 90 },
  { name: 'Problem Solver', category: 'Thinking', level: 88 },
  { name: 'Attention to Detail', category: 'Thinking', level: 85 },
  { name: 'Creative Mind', category: 'Thinking', level: 82 },
  { name: 'Critical Thinker', category: 'Thinking', level: 86 },
  { name: 'Continuous Learner', category: 'Growth', level: 95 },
  { name: 'Positive Attitude', category: 'People', level: 90 },
]

function SkillBar({ skill, animate }: { skill: Skill; animate: boolean }) {
  return (
    <div className="py-1.5 space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-[var(--text)] truncate">{skill.name}</span>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--surface-border)',
              color: 'var(--text-muted)',
            }}
          >
            {skill.category}
          </span>
          <span className="text-xs text-[var(--text-muted)] w-8 text-right">
            {animate ? skill.level : 0}%
          </span>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${skill.level}%` : '0%',
            background: 'linear-gradient(90deg, var(--accent), var(--purple))',
          }}
        />
      </div>
    </div>
  )
}

export default function SkillsMonitor() {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Core Competencies
        </h3>
        {CORE.map(s => (
          <SkillBar key={s.name} skill={s} animate={animate} />
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Soft Skills
        </h3>
        {SOFT.map(s => (
          <SkillBar key={s.name} skill={s} animate={animate} />
        ))}
      </div>
    </div>
  )
}
