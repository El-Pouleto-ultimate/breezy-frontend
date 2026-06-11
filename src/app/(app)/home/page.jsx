'use client'
import AppShell from '@/components/layout/AppShell'
import PostList from '@/components/feed/PostList'
import ComposeFab from '@/components/feed/ComposeFab'
import { usePosts } from '@/hooks/usePosts'

export default function HomePage() {
  const { posts, loading, error, hasMore, loadMore, prependPost, updatePost } = usePosts()

  return (
    <AppShell title="Breezy">
      <PostList
        posts={posts} loading={loading} error={error}
        hasMore={hasMore} loadMore={loadMore} onUpdate={updatePost}
      />
      <ComposeFab />
    </AppShell>
  )
}
