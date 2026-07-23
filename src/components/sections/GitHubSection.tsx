import ContributionHeatmap from './ContributionHeatmap'
import rawGithubData from '../../../data/github.json'

interface GitHubRepo {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  forkCount: number
  primaryLanguage: { name: string; color: string } | null
}

interface GitHubData {
  fetchedAt: string | null
  profile: { name: string; bio: string; avatarUrl: string; followers: number }
  contributions: {
    totalContributions: number
    weeks: { contributionDays: { date: string; contributionCount: number; color: string }[] }[]
  }
  topRepos: GitHubRepo[]
}

const githubData = rawGithubData as GitHubData

export default function GitHubSection() {
  const { contributions, topRepos, profile } = githubData
  const hasData = contributions.weeks.length > 0

  return (
    <div className="space-y-8">
      <div className="flex gap-8 justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-[var(--accent)]">
            {hasData ? contributions.totalContributions.toLocaleString() : '—'}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">Contributions</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[var(--accent)]">
            {profile.followers || '—'}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">Followers</div>
        </div>
      </div>

      <ContributionHeatmap weeks={hasData ? contributions.weeks : undefined} />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
          Top Repositories
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {(topRepos.length > 0
            ? topRepos.map(r => ({
                name: r.name,
                description: r.description || '',
                stars: r.stargazerCount,
                language: r.primaryLanguage?.name || '',
                languageColor: r.primaryLanguage?.color || '#888',
                url: r.url,
              }))
            : [
                {
                  name: 'Frappe-BIS-License-Manager',
                  description: 'Frappe app for managing BIS product certification licences',
                  stars: 2,
                  language: 'Python',
                  languageColor: '#3572A5',
                  url: 'https://github.com/nisarg5900/Frappe-BIS-License-Manager',
                },
                {
                  name: 'nisarg5900.github.io',
                  description: "Personal site — the one you're looking at",
                  stars: 0,
                  language: 'TypeScript',
                  languageColor: '#3178C6',
                  url: 'https://github.com/nisarg5900/nisarg5900.github.io',
                },
              ]
          ).map(repo => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl transition-colors hover:bg-white/[0.03]"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--surface-border)',
              }}
            >
              <div className="font-medium text-[var(--accent)] text-sm">{repo.name}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">
                {repo.description}
              </div>
              <div className="flex items-center gap-3 mt-3 text-xs text-[var(--text-muted)]">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ background: repo.languageColor }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stars > 0 && <span>★ {repo.stars}</span>}
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="text-center">
        <a
          href="https://github.com/nisarg5900"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--accent)] hover:underline"
        >
          View full profile →
        </a>
      </div>
    </div>
  )
}
