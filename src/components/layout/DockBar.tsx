import Dock from '../reactbits/Dock'

const SECTIONS = [
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'github', label: 'GitHub', icon: '💻' },
  { id: 'instagram', label: 'Instagram', icon: '📸' },
  { id: 'skills', label: 'Skills', icon: '📊' },
  { id: 'tech', label: 'Tech Stack', icon: '🔧' },
  { id: 'recommendations', label: 'Recs', icon: '💬' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function DockBar() {
  const items = SECTIONS.map(s => ({
    icon: <span className="text-lg">{s.icon}</span>,
    label: s.label,
    onClick: () => scrollTo(s.id),
  }))

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <Dock
        items={items}
        panelHeight={56}
        baseItemSize={42}
        magnification={64}
        distance={140}
      />
    </div>
  )
}
