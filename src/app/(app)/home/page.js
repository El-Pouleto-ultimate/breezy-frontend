'use client'
import AppShell from '@/components/layout/AppShell'
import PostList from '@/components/feed/PostList'
import ComposeFab from '@/components/feed/ComposeFab'
import PostForm from '@/components/feed/PostForm'
import { usePosts } from '@/hooks/usePosts'
import { createPost } from '@/services/postService'
import { RotateCw } from 'lucide-react'

function RefreshButton({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-breezy-hover text-breezy-dark">
      <RotateCw size={20} />
    </button>
  )
}

export default function HomePage() {
  const { posts, loading, error, hasMore, loadMore, prependPost, updatePost, refresh } = usePosts()

  async function handlePostCreated(content, media) {
    try {
      const payload = { content }
      if (media) payload.media_urls = [media]
      const p = await createPost(payload)
      prependPost(p)
    } catch (err) {
      alert(err?.response?.data?.error?.message || 'Erreur lors de la publication.')
    }
  }

  return (
    <AppShell title="Accueil" rightSlot={<RefreshButton onClick={refresh} />}>
      <PostForm onPostCreated={handlePostCreated} />
      <PostList
        posts={posts} loading={loading} error={error}
        hasMore={hasMore} loadMore={loadMore} onUpdate={updatePost}
      />
      <ComposeFab />
    </AppShell>
  )
}
