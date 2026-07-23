const TOOLS = [
  {
    name: 'ERPNext',
    description: 'Open-source ERP for manufacturing & procurement',
    icon: '🏭',
  },
  {
    name: 'Framer',
    description: 'Interactive design & rapid prototyping',
    icon: '🎨',
  },
  {
    name: 'CorelDRAW',
    description: 'Vector graphics for product & packaging design',
    icon: '✏️',
  },
  {
    name: 'Notion',
    description: 'Project management & documentation hub',
    icon: '📝',
  },
  {
    name: 'Microsoft 365',
    description: 'Enterprise productivity & collaboration',
    icon: '💼',
  },
  {
    name: 'Google Workspace',
    description: 'Cloud-native communication & docs',
    icon: '☁️',
  },
]

export default function TechStackSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
        Tools & Platforms
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOOLS.map(tool => (
          <div
            key={tool.name}
            className="flex items-start gap-4 p-4 rounded-xl transition-all hover:translate-y-[-2px]"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--surface-border)',
            }}
          >
            <span className="text-2xl shrink-0">{tool.icon}</span>
            <div>
              <div className="font-medium text-sm text-[var(--text)]">{tool.name}</div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">{tool.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
