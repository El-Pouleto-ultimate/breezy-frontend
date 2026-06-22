'use client'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import ProfileHeader from '@/components/profile/ProfileHeader'
import PostCard from '@/components/feed/PostCard'
import Spinner from '@/components/ui/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { getFullProfile } from '@/services/userService'
import { getUserPosts, getUserReplies, getUserMedia, getUserLikes } from '@/services/postService'

export default function UserProfilePage() {
  const { userId } = useParams()
  const { user: me } = useAuth()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState('Posts')
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const isOwn = me?.id === userId || me?._id === userId

  const fetchProfileData = useCallback(async () => {
    if (!userId) return
    
    try {
      const p = await getFullProfile(userId)
      setProfile(p)
      
      let postsData = { data: [] }
      if (activeTab === 'Posts') postsData = await getUserPosts(userId)
      else if (activeTab === 'Replies') postsData = await getUserReplies(userId)
      else if (activeTab === 'Media') postsData = await getUserMedia(userId)
      else if (activeTab === 'Likes') postsData = await getUserLikes(userId)

      setPosts(postsData.data || postsData.posts || [])
    } catch (err) {
      console.error("Erreur chargement profil:", err)
    }
  }, [userId, activeTab])

  useEffect(() => {
    if (isOwn) {
      router.replace('/profile')
      return
    }
    
    setLoading(true)
    fetchProfileData().finally(() => setLoading(false))

    const handleFocus = () => fetchProfileData()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchProfileData, isOwn, router])

  if (loading) {
    return (
      <AppShell backHref="/home">
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      </AppShell>
    )
  }

  if (!profile) {
    return (
      <AppShell backHref="/home">
        <div className="flex justify-center py-16 text-breezy-muted">Utilisateur introuvable</div>
      </AppShell>
    )
  }

  const displayProfile = {
    id: profile?.id || profile?._id,
    username: profile?.username || 'Utilisateur',
    avatar: profile?.avatar_url || profile?.avatar,
    bio: profile?.bio || '',
    location: profile?.location || '',
    createdAt: profile?.created_at || profile?.createdAt || '',
    banner: profile?.banner_url || profile?.banner || '',
    followedByMe: profile?.followedByMe || false,
    followingCount: profile?.following_count ?? profile?.followingCount ?? 0,
    followersCount: profile?.followers_count ?? profile?.followersCount ?? 0,
  }

  const postsToShow = posts

  return (
    <AppShell backHref="/home" rightSlot={
      <div className="w-10 h-10 flex items-center justify-center">
        <span className="text-xs text-breezy-muted font-medium">{postsToShow.length} posts</span>
      </div>
    }>
      <ProfileHeader 
        profile={displayProfile} 
        isOwn={false} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onProfileUpdate={fetchProfileData} 
      />
      
      <div>
        {postsToShow.map(p => (
          <PostCard 
            key={p._id} 
            post={p} 
            onUpdate={(updated) => {
              setPosts(prev => prev.map(old => old._id === updated._id ? updated : old))
              fetchProfileData()
            }} 
          />
        ))}
        {postsToShow.length === 0 && (
          <div className="flex flex-col items-center py-16 px-8 gap-2">
            <p className="text-xl font-bold text-breezy-dark">Aucun post pour l&apos;instant</p>
            <p className="text-breezy-muted text-sm text-center">
              Rien à afficher dans l&apos;onglet {activeTab}.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  )
}