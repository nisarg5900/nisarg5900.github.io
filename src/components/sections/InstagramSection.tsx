import rawInstagramData from '../../../data/instagram.json'

interface InstagramPost {
  id: string
  caption: string
  mediaType: string
  mediaUrl: string
  permalink: string
  timestamp: string
}

interface InstagramData {
  fetchedAt: string | null
  posts: InstagramPost[]
}

const instagramData = rawInstagramData as InstagramData

export default function InstagramSection() {
  const posts = instagramData.posts || []
  const hasData = posts.length > 0

  if (!hasData) {
    return (
      <div className="text-center space-y-4">
        <div className="text-4xl">📸</div>
        <h3 className="text-lg font-medium text-[var(--text)]">From Instagram</h3>
        <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
          Instagram feed will appear here once the data pipeline is configured.
          Follow{' '}
          <a
            href="https://instagram.com/nisarg5900"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            @nisarg5900
          </a>{' '}
          in the meantime.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
          From Instagram
        </h3>
        <a
          href="https://instagram.com/nisarg5900"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--accent)] hover:underline"
        >
          @nisarg5900
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {posts.map(post => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--surface-border)',
            }}
          >
            {post.mediaUrl ? (
              <img
                src={post.mediaUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-2xl">
                📷
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-xs text-white line-clamp-2">{post.caption}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
