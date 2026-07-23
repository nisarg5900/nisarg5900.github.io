import { useRef } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import CometScene from './CometScene'
import ImpactOverlay from './ImpactOverlay'
import BootSequence from './BootSequence'
import Aurora from '../reactbits/Aurora'

const SCROLL_HEIGHTS = 6

export default function IntroContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  const sceneProgress = (start: number, end: number) => {
    if (progress < start) return 0
    if (progress > end) return 1
    return (progress - start) / (end - start)
  }

  const scene1 = sceneProgress(0, 0.3)
  const scene2 = sceneProgress(0.3, 0.45)
  const scene3 = sceneProgress(0.45, 0.6)
  const scene4 = sceneProgress(0.6, 0.75)

  const currentScene =
    progress < 0.3 ? 1 : progress < 0.45 ? 2 : progress < 0.6 ? 3 : 4

  return (
    <div
      ref={containerRef}
      style={{ height: `${SCROLL_HEIGHTS * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {currentScene <= 2 && (
          <CometScene progress={scene1} visible={currentScene === 1} />
        )}

        {currentScene === 2 && <ImpactOverlay progress={scene2} />}

        {currentScene === 3 && <BootSequence progress={scene3} />}

        {currentScene >= 4 && (
          <div
            className="absolute inset-0"
            style={{ opacity: scene4, background: '#050510' }}
          >
            <Aurora
              colorStops={['#3A29FF', '#5eead4', '#a78bfa']}
              speed={0.5}
              blend={0.6}
              amplitude={1.2}
            />
          </div>
        )}
      </div>
    </div>
  )
}
