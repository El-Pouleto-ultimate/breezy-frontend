'use client'
import AppShell from '@/components/layout/AppShell'
import PostList from '@/components/feed/PostList'
import ComposeFab from '@/components/feed/ComposeFab'
import PostForm from '@/components/feed/PostForm'
import { usePosts } from '@/hooks/usePosts'
import { createPost } from '@/services/postService'

function RefreshButton({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-breezy-hover text-breezy-dark">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </svg>
    </button>
  )
}

export default function HomePage() {
  const { posts, loading, error, hasMore, loadMore, prependPost, updatePost, refresh } = usePosts()

  async function handlePostCreated(content, media) {
    const payload = { content }
    if (media) payload.media = media
    const p = await createPost(payload)
    prependPost(p)
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
