import { useState, useEffect } from 'react'
import IntroContainer from './components/intro/IntroContainer'
import MenuBar from './components/layout/MenuBar'
import DockBar from './components/layout/DockBar'
import Section from './components/layout/Section'
import AboutSection from './components/sections/AboutSection'
import GitHubSection from './components/sections/GitHubSection'
import InstagramSection from './components/sections/InstagramSection'
import SkillsMonitor from './components/sections/SkillsMonitor'
import TechStackSection from './components/sections/TechStackSection'
import RecommendationSection from './components/sections/RecommendationSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  const [showChrome, setShowChrome] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const introHeight = 6 * window.innerHeight
      setShowChrome(window.scrollY > introHeight * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <IntroContainer />

      {showChrome && <MenuBar />}
      {showChrome && <DockBar />}

      <Section id="about" title="About — Nisarg Patel">
        <AboutSection />
      </Section>

      <Section id="github" title="GitHub Activity">
        <GitHubSection />
      </Section>

      <Section id="instagram" title="Instagram Feed">
        <InstagramSection />
      </Section>

      <Section id="skills" title="Skills Monitor">
        <SkillsMonitor />
      </Section>

      <Section id="tech" title="Tech Stack">
        <TechStackSection />
      </Section>

      <Section id="recommendations" title="Recommendations">
        <RecommendationSection />
      </Section>

      <Section id="contact" title="Contact">
        <ContactSection />
      </Section>
    </>
  )
}
