import { useState, useEffect } from 'react'
import { Menu, X, RefreshCw } from 'lucide-react'

interface Feed {
  id: number
  name: string
  url: string
}

interface FeedEntry {
  title: string
  link: string
  contentSnippet: string
}

interface FeedResult {
  feed: {
    entries: FeedEntry[]
  }
}

const allFeeds: Feed[] = [
  { id: 0, name: 'Udacity Blog', url: 'http://blog.udacity.com/feed' },
  { id: 1, name: 'CSS Tricks', url: 'http://feeds.feedburner.com/CssTricks' },
  { id: 2, name: 'HTML5 Rocks', url: 'http://feeds.feedburner.com/html5rocks' },
  { id: 3, name: 'Linear Digressions', url: 'http://feeds.feedburner.com/udacity-linear-digressions' }
]

const FEED_API = 'https://rsstojson.udacity.com/parseFeed'

function App() {
  const [feeds] = useState<Feed[]>(allFeeds)
  const [selectedFeedId, setSelectedFeedId] = useState(0)
  const [entries, setEntries] = useState<FeedEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const loadFeed = async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      const feed = feeds.find(f => f.id === id)
      if (!feed) throw new Error('Feed not found')

      const res = await fetch(FEED_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: feed.url })
      })

      if (!res.ok) throw new Error('Failed to load feed')

      const data: FeedResult = await res.json()
      setEntries(data.feed.entries || [])
      setSelectedFeedId(id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setEntries([])
    } finally {
      setLoading(false)
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    loadFeed(0)
  }, [])

  const currentFeed = feeds.find(f => f.id === selectedFeedId)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl font-bold text-gray-900">UdaciFeeds</h1>
            <p className="text-sm text-gray-500">RSS Feed Reader</p>
          </div>

          <div className="flex items-center justify-end gap-2 lg:hidden">
            <span className="text-sm text-gray-500">{currentFeed?.name}</span>
            <button
              onClick={() => loadFeed(selectedFeedId)}
              disabled={loading}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              aria-label="Refresh feed"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden border-t border-gray-200 p-4">
            <ul className="space-y-2">
              {feeds.map(feed => (
                <li key={feed.id}>
                  <button
                    onClick={() => loadFeed(feed.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedFeedId === feed.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {feed.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Feeds</h2>
            <ul className="space-y-1">
              {feeds.map(feed => (
                <li key={feed.id}>
                  <button
                    onClick={() => loadFeed(feed.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedFeedId === feed.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {feed.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => loadFeed(selectedFeedId)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh Feed
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {currentFeed?.name || 'Select a feed'}
              </h2>
            </div>

            {error && (
              <div className="p-6 text-center text-red-600">
                <p>Error loading feed: {error}</p>
                <button
                  onClick={() => loadFeed(selectedFeedId)}
                  className="mt-2 text-primary-600 hover:underline text-sm"
                >
                  Try again
                </button>
              </div>
            )}

            {loading && !error && entries.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p>Loading feed...</p>
              </div>
            )}

            {!loading && !error && entries.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <p>No entries found</p>
              </div>
            )}

            <div className="divide-y divide-gray-200">
              {entries.map((entry, index) => (
                <article key={`${selectedFeedId}-${index}`} className="p-6 hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 transition-colors"
                    >
                      {entry.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {entry.contentSnippet}
                  </p>
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-primary-600 hover:underline"
                  >
                    Read full article →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App