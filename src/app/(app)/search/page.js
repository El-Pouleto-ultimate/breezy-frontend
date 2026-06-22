'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import SearchBar from '@/components/search/SearchBar'
import PostCard from '@/components/feed/PostCard'
import Spinner from '@/components/ui/Spinner'
import { searchPosts } from '@/services/postService'
import { searchUsers } from '@/services/userService'
import Avatar from '@/components/ui/Avatar'
import Link from 'next/link'

function SearchContent() {
  const searchParams = useSearchParams()
  const [q, setQ] = useState(searchParams.get('q') || '')
  const [results, setRes] = useState([])
  const [userResults, setUserRes] = useState([])
  const [loading, setLoad] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const urlQ = searchParams.get('q')
    if (urlQ && urlQ !== q) setQ(urlQ)
  }, [searchParams])

  useEffect(() => {
    if (!q.trim()) { setRes([]); setUserRes([]); return }
    const t = setTimeout(async () => {
      setLoad(true)
      setError('')
      try {
        const [postsRes, usersRes] = await Promise.allSettled([
          searchPosts(q),
          q.length >= 2 ? searchUsers(q) : Promise.resolve({ data: [] })
        ])
        setRes(postsRes.status === 'fulfilled' ? (postsRes.value.data || []) : [])
        setUserRes(usersRes.status === 'fulfilled' ? (usersRes.value.data || []) : [])
      } catch (err) {
        setError('Erreur lors de la recherche.')
      } finally {
        setLoad(false)
      }
    }, 400)
    return () => clearTimeout(t)
  }, [q])

  const hasResults = results.length > 0 || userResults.length > 0

  return (
    <AppShell title="Breezy">
      <div className="sticky top-0 z-30 bg-white border-b border-breezy-border">
        <SearchBar autoFocus={false} onSearch={setQ} initialValue={q} />
      </div>

      {!q.trim() ? (
        <div className="flex flex-col items-center py-16 gap-2 px-8">
          <p className="text-sm text-breezy-muted text-center">
            Recherche des messages ou des comptes par mots-cles.
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : error ? (
        <p className="text-center text-red-500 text-sm py-8">{error}</p>
      ) : !hasResults ? (
        <div className="flex flex-col items-center py-16 gap-2 px-8">
          <p className="text-xl font-bold text-breezy-dark">Aucun resultat</p>
          <p className="text-breezy-muted text-sm text-center">Essaie avec d'autres mots-cles.</p>
        </div>
      ) : (
        <div>
          {userResults.length > 0 && (
            <div className="border-b border-breezy-border">
              <h3 className="px-4 py-2 text-sm font-bold text-breezy-dark">Comptes</h3>
              {userResults.map(u => (
                <Link key={u.id} href={`/profile/${u.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-breezy-hover">
                  <Avatar src={u.avatar_url} username={u.username} size="sm" />
                  <div>
                    <p className="font-bold text-sm text-breezy-dark">{u.username}</p>
                    <p className="text-xs text-breezy-muted">@{u.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {results.length > 0 && (
            <div>
              {userResults.length > 0 && <h3 className="px-4 py-2 text-sm font-bold text-breezy-dark">Posts</h3>}
              {results.map(p => <PostCard key={p._id} post={p} />)}
            </div>
          )}
        </div>
      )}
    </AppShell>
  )
}

export default function SearchPage() {
  return <Suspense><SearchContent /></Suspense>
}
