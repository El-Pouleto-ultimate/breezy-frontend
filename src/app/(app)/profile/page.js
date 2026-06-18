'use client'
import { useState, useEffect, useCallback } from 'react'
import AppShell from '@/components/layout/AppShell'
import ProfileHeader from '@/components/profile/ProfileHeader'
import PostCard from '@/components/feed/PostCard'
import Spinner from '@/components/ui/Spinner'
import ComposeFab from '@/components/feed/ComposeFab'
import { useAuth } from '@/hooks/useAuth' // ou le bon chemin vers ton contexte
import { getUserById } from '@/services/userService'
import { getUserPosts, getUserReplies, getUserMedia, getUserLikes } from '@/services/postService'

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Posts')
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. On isole la fonction de chargement pour pouvoir la rappeler à tout moment
  const fetchProfileData = useCallback(async () => {
    if (!user?.id && !user?._id) return
    const uid = user.id || user._id
    
    try {
      const p = await getUserById(uid)
      setProfile(p)
      
      let postsData = { posts: [] }
      if (activeTab === 'Posts') postsData = await getUserPosts(uid)
      else if (activeTab === 'Replies') postsData = await getUserReplies(uid)
      else if (activeTab === 'Media') postsData = await getUserMedia(uid)
      else if (activeTab === 'Likes') postsData = await getUserLikes(uid)
      
      setPosts(postsData.posts || [])
    } catch (err) {
      console.error("Erreur chargement profil:", err)
      // Fallback
      setProfile(user) 
    }
  }, [user, activeTab])

  useEffect(() => {
    setLoading(true)
    fetchProfileData().finally(() => setLoading(false))

    // ASTUCE : Rafraîchit les données automatiquement quand l'utilisateur revient sur l'onglet
    const handleFocus = () => fetchProfileData()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchProfileData])

  if (loading) {
    return (
      <AppShell backHref="/home">
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      </AppShell>
    )
  }

  // 2. Logique blindée pour les compteurs (Gère les nombres ET les tableaux de l'API)
  const displayProfile = {
    id: profile?.id || profile?._id || user?.id || user?._id,
    username: profile?.username || user?.username || 'Utilisateur',
    avatar: profile?.avatar || user?.avatar,
    bio: profile?.bio || user?.bio || '',
    location: profile?.location || user?.location || '',
    createdAt: profile?.createdAt || user?.createdAt || '2022-04-01T00:00:00Z',
    banner: profile?.banner || user?.banner || '',
    followedByMe: false, // C'est ton profil, donc tu ne te suis pas toi-même
    // On vérifie d'abord si l'API envoie "followingCount", sinon on compte la taille du tableau "following"
    followingCount: profile?.followingCount ?? profile?.following?.length ?? user?.followingCount ?? 0,
    followersCount: profile?.followersCount ?? profile?.followers?.length ?? user?.followersCount ?? 0,
  }

  const myId = user?.id || user?._id
  const postsToShow = posts

  return (
    <AppShell backHref="/home" rightSlot={
      <div className="w-10 h-10 flex items-center justify-center">
        <span className="text-xs text-breezy-muted font-medium">{postsToShow.length} posts</span>
      </div>
    }>
      {/* 3. On passe fetchProfileData à ton Header au cas où tu gères tes abonnements depuis une modale à l'intérieur */}
      <ProfileHeader 
        profile={displayProfile} 
        isOwn 
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
              // Met à jour le post localement
              setPosts(prev => prev.map(old => old._id === updated._id ? updated : old))
              // Si le post déclenche un désabonnement, on actualise aussi le profil !
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
      <ComposeFab />
    </AppShell>
  )
}