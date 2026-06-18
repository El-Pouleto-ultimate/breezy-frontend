'use client'
import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import SearchBar from '@/components/search/SearchBar'
import PostCard from '@/components/feed/PostCard'
import Spinner from '@/components/ui/Spinner'
import { searchPosts } from '@/services/postService'

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [results, setRes] = useState([])
  const [loading, setLoad] = useState(false)

  // NOTE : Pour lier la saisie de ta SearchBar à l'état `q` de cette page,
  // assure-toi que ton composant <SearchBar /> appelle une fonction de callback ou mets à jour l'URL via le routeur.
  useEffect(() => {
    if (!q.trim()) { setRes([]); return }
    const t = setTimeout(async () => {
      setLoad(true)
      try {
        const d = await searchPosts(q)
        setRes(d.posts || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoad(false)
      }
    }, 400)
    return () => clearTimeout(t)
  }, [q])

  return (
    <AppShell title="Breezy">
      {/* Barre de recherche (La loupe) */}
      <div className="sticky top-0 z-30 bg-white border-b border-breezy-border">
        <SearchBar autoFocus={false} />
      </div>

      {/* Affichage épuré */}
      {!q.trim() ? (
        /* Écran d'attente à la place des tendances */
        <div className="flex flex-col items-center py-16 gap-2 px-8">
          <p className="text-sm text-breezy-muted text-center">
            Recherche des messages ou des comptes par mots-clés.
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-2 px-8">
          <p className="text-xl font-bold text-breezy-dark">Aucun résultat</p>
          <p className="text-breezy-muted text-sm text-center">Essaie avec d'autres mots-clés.</p>
        </div>
      ) : (
        <div>
          {results.map(p => <PostCard key={p._id} post={p} />)}
        </div>
      )}
    </AppShell>
  )
}