'use client'
import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import SearchBar from '@/components/search/SearchBar'
import PostCard from '@/components/feed/PostCard'
import Spinner from '@/components/ui/Spinner'
import { searchPosts } from '@/services/postService'

const TRENDS = [
  { cat:'Technologie · Tendances', tag:'#DesignSystem', count:'12.5k posts' },
  { cat:'Art · Tendances',         tag:'Minimalisme',   count:'8,402 posts' },
  { cat:'Lifestyle · Tendances',   tag:'#CoffeeCulture',count:'5,120 posts' },
]

export default function SearchPage() {
  const [q, setQ]           = useState('')
  const [results, setRes]   = useState([])
  const [loading, setLoad]  = useState(false)

  useEffect(() => {
    if (!q.trim()) { setRes([]); return }
    const t = setTimeout(async () => {
      setLoad(true)
      try { const d = await searchPosts(q); setRes(d.posts || []) }
      finally { setLoad(false) }
    }, 400)
    return () => clearTimeout(t)
  }, [q])

  return (
    <AppShell title="Breezy">
      {/* Search bar */}
      <div className="sticky top-14 z-30 bg-white border-b border-breezy-border">
        <SearchBar autoFocus={false} />
      </div>

      {!q.trim() ? (
        /* Trends */
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold text-breezy-dark mb-4">Tendances pour vous</h2>
          <div className="flex flex-col">
            {TRENDS.map(t => (
              <div key={t.tag} className="flex items-start justify-between py-3 border-b border-breezy-border cursor-pointer hover:bg-breezy-hover -mx-4 px-4 transition-colors">
                <div>
                  <p className="text-xs text-breezy-muted">{t.cat}</p>
                  <p className="font-bold text-sm text-breezy-dark mt-0.5">{t.tag}</p>
                  <p className="text-xs text-breezy-muted mt-0.5">{t.count}</p>
                </div>
                <button className="text-breezy-muted p-1">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                </button>
              </div>
            ))}
            <button className="text-breezy-primary text-sm mt-3 text-left">Voir plus</button>
          </div>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-2 px-8">
          <p className="text-xl font-bold text-breezy-dark">Aucun résultat</p>
          <p className="text-breezy-muted text-sm text-center">Essaie avec d'autres mots-clés ou hashtags.</p>
        </div>
      ) : (
        <div>
          {results.map(p => <PostCard key={p._id} post={p} />)}
        </div>
      )}
    </AppShell>
  )
}
