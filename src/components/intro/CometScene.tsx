import { useMemo } from 'react'

interface Props {
  progress: number
  visible: boolean
}

interface Star {
  x: number
  y: number
  z: number
  size: number
  opacity: number
}

interface TailParticle {
  x: number
  y: number
  zOffset: number
  size: number
  opacity: number
  hue: string
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export default function CometScene({ progress, visible }: Props) {
  const stars = useMemo<Star[]>(() => {
    const rng = seededRandom(42)
    return Array.from({ length: 70 }, () => ({
      x: (rng() - 0.5) * 200,
      y: (rng() - 0.5) * 200,
      z: -(rng() * 12000 + 3000),
      size: rng() * 2 + 1,
      opacity: rng() * 0.6 + 0.2,
    }))
  }, [])

  const dustTail = useMemo<TailParticle[]>(() => {
    const rng = seededRandom(99)
    return Array.from({ length: 18 }, (_, i) => {
      const t = (i + 1) / 18
      const spread = t * 60
      return {
        x: -t * 40 + (rng() - 0.5) * spread,
        y: t * 30 + (rng() - 0.5) * spread * 0.6,
        zOffset: -(t * 800 + rng() * 200),
        size: rng() * 4 + 2,
        opacity: (1 - t) * 0.5 + 0.1,
        hue: rng() > 0.5 ? '#fffbe6' : '#e0d8c0',
      }
    })
  }, [])

  const ionTail = useMemo<TailParticle[]>(() => {
    const rng = seededRandom(77)
    return Array.from({ length: 10 }, (_, i) => {
      const t = (i + 1) / 10
      return {
        x: (rng() - 0.5) * 6,
        y: (rng() - 0.5) * 6,
        zOffset: -(t * 600 + rng() * 100),
        size: 1,
        opacity: (1 - t) * 0.4 + 0.1,
        hue: '#a0c4ff',
      }
    })
  }, [])

  const debris = useMemo<TailParticle[]>(() => {
    const rng = seededRandom(55)
    return Array.from({ length: 25 }, () => ({
      x: (rng() - 0.5) * 100,
      y: (rng() - 0.5) * 80,
      zOffset: -(rng() * 2000 + 200),
      size: rng() * 2 + 1,
      opacity: rng() * 0.3 + 0.1,
      hue: '#5eead4',
    }))
  }, [])

  const maxZ = 14000
  const zShift = progress * maxZ

  const shakeIntensity = progress > 0.6 ? (progress - 0.6) * 25 : 0
  const shakeX =
    shakeIntensity > 0 ? Math.sin(progress * 200) * shakeIntensity : 0
  const shakeY =
    shakeIntensity > 0 ? Math.cos(progress * 170) * shakeIntensity : 0

  const cometBaseZ = -12000

  return (
    <div
      className="absolute inset-0"
      style={{
        background: '#050510',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
    >
      {/* Perspective container */}
      <div
        className="absolute inset-0"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Tilted inner wrapper — creates diagonal flight path */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `
              translate(${shakeX}px, ${shakeY}px)
              rotateX(3deg)
              rotateY(-2deg)
            `,
          }}
        >
          {/* Stars */}
          {stars.map((star, i) => {
            const sz = star.z + zShift
            if (sz > 500) return null
            return (
              <div
                key={`s${i}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: star.size,
                  height: star.size,
                  borderRadius: '50%',
                  background: '#fff',
                  opacity: star.opacity,
                  transform: `translate3d(${star.x}px, ${star.y}px, ${sz}px)`,
                  boxShadow:
                    star.size > 2
                      ? `0 0 ${star.size * 2}px rgba(255,255,255,0.3)`
                      : undefined,
                }}
              />
            )
          })}

          {/* Comet nucleus */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#fff',
              transform: `translate3d(-4px, -4px, ${cometBaseZ + zShift}px)`,
              boxShadow: `
                0 0 20px 8px rgba(255,255,255,0.8),
                0 0 60px 20px var(--accent-glow),
                0 0 120px 40px rgba(94,234,212,0.15)
              `,
            }}
          />

          {/* Coma (diffuse halo) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(94,234,212,0.25) 0%, rgba(94,234,212,0.08) 40%, transparent 70%)',
              filter: 'blur(6px)',
              transform: `translate3d(-40px, -40px, ${cometBaseZ + zShift - 10}px)`,
            }}
          />

          {/* Dust tail — curved fan of particles */}
          {dustTail.map((p, i) => (
            <div
              key={`dt${i}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: p.hue,
                opacity: p.opacity,
                filter: p.size > 3 ? 'blur(1px)' : undefined,
                transform: `translate3d(${p.x}px, ${p.y}px, ${cometBaseZ + p.zOffset + zShift}px)`,
              }}
            />
          ))}

          {/* Ion tail — narrow straight streaks */}
          {ionTail.map((p, i) => (
            <div
              key={`it${i}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: p.size,
                height: 16,
                borderRadius: 1,
                background: p.hue,
                opacity: p.opacity,
                transform: `translate3d(${p.x}px, ${p.y}px, ${cometBaseZ + p.zOffset + zShift}px)`,
              }}
            />
          ))}

          {/* Debris — scattered trailing particles */}
          {debris.map((p, i) => (
            <div
              key={`db${i}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: p.hue,
                opacity: p.opacity,
                boxShadow: `0 0 ${p.size * 3}px ${p.hue}`,
                transform: `translate3d(${p.x}px, ${p.y}px, ${cometBaseZ + p.zOffset + zShift}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
