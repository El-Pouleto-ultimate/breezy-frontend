'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import ProfileHeader from '@/components/profile/ProfileHeader'
import PostCard from '@/components/feed/PostCard'
import Spinner from '@/components/ui/Spinner'
import { getUserById } from '@/services/userService'
import { getUserPosts } from '@/services/postService'

export default function OtherProfilePage() {
  const { userId }         = useParams()
  const [profile, setP]    = useState(null)
  const [posts, setPosts]  = useState([])
  const [loading, setLoad] = useState(true)

  useEffect(() => {
    if (!userId) return
    setLoad(true)
    Promise.all([getUserById(userId), getUserPosts(userId)])
      .then(([p, postsData]) => {
        setP(p)
        setPosts(postsData.posts || [])
      })
      .catch(() => {})
      .finally(() => setLoad(false))
  }, [userId])

  if (loading) {
    return (
      <AppShell backHref="/home">
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      </AppShell>
    )
  }

  return (
    <AppShell
      backHref="/home"
      rightSlot={
        <div className="text-xs text-breezy-muted font-medium">
          {posts.length} posts
        </div>
      }
    >
      <ProfileHeader profile={profile} isOwn={false} />
      <div>
        {posts.map(p => <PostCard key={p._id} post={p} />)}
        {posts.length === 0 && (
          <div className="flex flex-col items-center py-16 px-8 gap-2">
            <p className="text-xl font-bold text-breezy-dark">Aucun post</p>
            <p className="text-breezy-muted text-sm text-center">
              Cet utilisateur n'a pas encore publié.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
