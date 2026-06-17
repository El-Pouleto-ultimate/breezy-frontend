'use client'
import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import ProfileHeader from '@/components/profile/ProfileHeader'
import PostCard from '@/components/feed/PostCard'
import Spinner from '@/components/ui/Spinner'
import ComposeFab from '@/components/feed/ComposeFab'
import { useAuth } from '@/hooks/useAuth'
import { getUserById } from '@/services/userService'
import { getUserPosts } from '@/services/postService'

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Posts')
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id && !user?._id) return
    const uid = user.id || user._id
    setLoading(true)
    Promise.all([getUserById(uid), getUserPosts(uid)])
      .then(([p, postsData]) => {
        setProfile(p)
        setPosts(postsData.posts || [])
      })
      .catch(() => {
        // Fallback: use user data from context
        setProfile({
          id: user.id || user._id,
          username: user.username,
          avatar: user.avatar,
          bio: user.bio || '',
          location: user.location || '',
          createdAt: user.createdAt || '2022-04-01T00:00:00Z',
          followingCount: user.followingCount ?? 0,
          followersCount: user.followersCount ?? 0,
          followedByMe: false,
          banner: user.banner || '',
        })
      })
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <AppShell backHref="/home">
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      </AppShell>
    )
  }

  const displayProfile = profile || {
    id: user?.id || user?._id,
    username: user?.username || 'Utilisateur',
    avatar: user?.avatar,
    bio: user?.bio || '',
    location: user?.location || '',
    createdAt: user?.createdAt || '2022-04-01T00:00:00Z',
    followingCount: user?.followingCount ?? 0,
    followersCount: user?.followersCount ?? 0,
    followedByMe: false,
    banner: user?.banner || '',
  }

  // Filter posts by tab
  const myId = user?.id || user?._id
  const postsToShow = (() => {
    switch (activeTab) {
      case 'Posts':
        return posts.filter(p => p.author?._id === myId || p.author?.id === myId)
      case 'Replies':
        // Show posts that are replies (have a parentId or replyTo)
        return posts.filter(p => p.parentId || p.replyTo)
      case 'Media':
        // Show posts with images/media
        return posts.filter(p => p.imageUrl || p.media || p.mediaUrl)
      case 'Likes':
        // Show posts liked by current user
        return posts.filter(p => p.likedByMe)
      default:
        return posts
    }
  })()

  return (
    <AppShell backHref="/home" rightSlot={
      <div className="w-10 h-10 flex items-center justify-center">
        <span className="text-xs text-breezy-muted font-medium">{postsToShow.length} posts</span>
      </div>
    }>
      <ProfileHeader profile={displayProfile} isOwn activeTab={activeTab} onTabChange={setActiveTab} />
      <div>
        {postsToShow.map(p => <PostCard key={p._id} post={p} onUpdate={(updated) => {
          setPosts(prev => prev.map(old => old._id === updated._id ? updated : old))
        }} />)}
        {postsToShow.length === 0 && (
          <div className="flex flex-col items-center py-16 px-8 gap-2">
            <p className="text-xl font-bold text-breezy-dark">Aucun post pour l&apos;instant</p>
            <p className="text-breezy-muted text-sm text-center">
              Rien à afficher dans l&apos;onglet {activeTab}.
            </p>
          </div>
        )}
      </div>
      <ComposeFab />
    </AppShell>
  )
}
