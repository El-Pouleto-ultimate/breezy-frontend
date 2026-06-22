'use client'
import PostCard from './PostCard'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'

export default function PostList({ posts = [], loading, error, hasMore, loadMore, onUpdate }) {
  if (loading && posts.length === 0) return (
    <div className="flex justify-center py-12"><Spinner size="lg" /></div>
  )
  if (error) return <p className="text-center text-breezy-muted text-sm py-8">{error}</p>
  if (posts.length === 0) return (
    <div className="flex flex-col items-center py-16 gap-2">
      <p className="text-xl font-bold text-breezy-dark">Aucun post pour l'instant</p>
      <p className="text-breezy-muted text-sm text-center px-8">Suis des utilisateurs pour voir leurs posts ici.</p>
    </div>
  )

  return (
    <div>
      {posts.map(p => <PostCard key={p._id} post={p} onUpdate={onUpdate} />)}
      {hasMore && (
        <div className="flex justify-center py-6">
          <Button variant="ghost" onClick={loadMore} loading={loading} className="px-6 py-2 rounded-full text-sm font-semibold text-breezy-primary">
            Voir plus
          </Button>
        </div>
      )}
    </div>
  )
}
