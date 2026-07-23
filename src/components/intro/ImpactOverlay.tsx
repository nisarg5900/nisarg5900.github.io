interface Props {
  progress: number
}

const CRACKS = [
  { angle: -25, length: 220, branches: [{ at: 0.4, angle: -60, length: 60 }] },
  { angle: 40, length: 180, branches: [{ at: 0.5, angle: 70, length: 45 }] },
  { angle: -60, length: 160, branches: [] },
  { angle: 15, length: 140, branches: [{ at: 0.6, angle: 35, length: 50 }] },
  { angle: -80, length: 120, branches: [] },
  { angle: 70, length: 150, branches: [{ at: 0.3, angle: 90, length: 40 }] },
  { angle: 130, length: 130, branches: [] },
  { angle: -140, length: 170, branches: [{ at: 0.5, angle: -160, length: 55 }] },
]

const SHARDS = [
  { points: '0,0 120,20 100,100 10,80', tx: -60, ty: -50 },
  { points: '20,0 140,10 130,110 0,90', tx: 20, ty: -40 },
  { points: '10,0 100,30 80,100 0,70', tx: -80, ty: 30 },
  { points: '0,20 110,0 120,80 10,100', tx: 40, ty: 20 },
  { points: '0,0 90,15 100,90 15,80', tx: -30, ty: -80 },
]

export default function ImpactOverlay({ progress }: Props) {
  const flashOpacity = progress < 0.15 ? progress / 0.15 : Math.max(0, 1 - (progress - 0.15) / 0.3)
  const crackProgress = Math.min(1, progress / 0.5)
  const shardSpread = Math.max(0, (progress - 0.4) / 0.6)
  const fadeOut = Math.max(0, (progress - 0.7) / 0.3)

  const glitchActive = progress > 0.2 && progress < 0.4
  const glitchOffset = glitchActive ? Math.sin(progress * 500) * 8 : 0

  return (
    <div
      className="absolute inset-0"
      style={{ opacity: 1 - fadeOut }}
    >
      {/* Background stays dark */}
      <div className="absolute inset-0 bg-[#050510]" />

      {/* White flash */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, #fff 0%, rgba(94,234,212,0.3) 50%, transparent 80%)',
          opacity: flashOpacity,
        }}
      />

      {/* Crack SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="-400 -300 800 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {CRACKS.map((crack, i) => {
          const show = crackProgress > i / CRACKS.length
          if (!show) return null

          const rad = (crack.angle * Math.PI) / 180
          const x2 = Math.cos(rad) * crack.length * crackProgress
          const y2 = Math.sin(rad) * crack.length * crackProgress

          return (
            <g key={i}>
              <line
                x1={0}
                y1={0}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              {crack.branches.map((branch, j) => {
                if (crackProgress < branch.at) return null
                const bRad = (branch.angle * Math.PI) / 180
                const bx1 = Math.cos(rad) * crack.length * branch.at
                const by1 = Math.sin(rad) * crack.length * branch.at
                const bp = (crackProgress - branch.at) / (1 - branch.at)
                const bx2 = bx1 + Math.cos(bRad) * branch.length * bp
                const by2 = by1 + Math.sin(bRad) * branch.length * bp
                return (
                  <line
                    key={j}
                    x1={bx1}
                    y1={by1}
                    x2={bx2}
                    y2={by2}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth={0.8}
                    strokeLinecap="round"
                  />
                )
              })}
            </g>
          )
        })}

        {/* Impact point glow */}
        <circle
          cx={0}
          cy={0}
          r={6 + crackProgress * 4}
          fill="white"
          opacity={flashOpacity * 0.8}
        />
      </svg>

      {/* Glass shards */}
      {shardSpread > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          {SHARDS.map((shard, i) => {
            const angle = (i * 72) + shardSpread * 10
            const dist = shardSpread * 80
            const dx = shard.tx * shardSpread + Math.cos((angle * Math.PI) / 180) * dist
            const dy = shard.ty * shardSpread + Math.sin((angle * Math.PI) / 180) * dist
            return (
              <svg
                key={i}
                className="absolute"
                width={140}
                height={120}
                style={{
                  transform: `translate(${dx}px, ${dy}px) rotate(${shardSpread * (i % 2 === 0 ? 15 : -15)}deg)`,
                  opacity: 0.15 - shardSpread * 0.1,
                }}
              >
                <polygon
                  points={shard.points}
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={0.5}
                />
              </svg>
            )
          })}
        </div>
      )}

      {/* Glitch bands */}
      {glitchActive && (
        <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
          <div
            className="absolute w-full"
            style={{
              top: '30%',
              height: 3,
              background: 'rgba(255,0,0,0.15)',
              transform: `translateX(${glitchOffset}px)`,
            }}
          />
          <div
            className="absolute w-full"
            style={{
              top: '55%',
              height: 2,
              background: 'rgba(0,100,255,0.12)',
              transform: `translateX(${-glitchOffset}px)`,
            }}
          />
          <div
            className="absolute w-full"
            style={{
              top: '72%',
              height: 4,
              background: 'rgba(255,0,0,0.08)',
              transform: `translateX(${glitchOffset * 0.5}px)`,
            }}
          />
        </div>
      )}
    </div>
  )
}
