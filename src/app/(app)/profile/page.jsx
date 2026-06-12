'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import ProfileHeader from '@/components/profile/ProfileHeader'
import PostCard from '@/components/feed/PostCard'
import Spinner from '@/components/ui/Spinner'
import ComposeFab from '@/components/feed/ComposeFab'
import { useAuth } from '@/hooks/useAuth'

const MOCK_POSTS = [
  { _id: 'p1', author: { _id: 'me', username: 'Alex Mercer', avatar: '' }, content: 'Just pushed the new design system update. Focusing entirely on reduction and clarity. Less borders, more breathing room.', createdAt: new Date(Date.now() - 7200000).toISOString(), likesCount: 148, commentsCount: 12, repostsCount: 4, viewsCount: 1200 },
  { _id: 'p2', author: { _id: 'me', username: 'Alex Mercer', avatar: '' }, content: 'Experimenting with structural layouts for the new dashboard. I think we finally nailed the responsive breakpoints.', createdAt: new Date(Date.now() - 604800000).toISOString(), likesCount: 392, commentsCount: 45, repostsCount: 12, viewsCount: 5000, imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80' },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Posts')

  const mockProfile = {
    id: user?.id, username: user?.username || 'Alex Mercer',
    avatar: user?.avatar, bio: user?.bio || 'Digital designer & developer. Building minimal interfaces and drinking too much espresso. Opinions are my own.',
    location: user?.location || 'Paris, France', createdAt: '2022-04-01T00:00:00Z',
    followingCount: 842, followersCount: 12500, followedByMe: false,
    banner: user?.banner || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&q=80',
  }

  const postsToShow = activeTab === 'Posts' ? MOCK_POSTS : MOCK_POSTS

  return (
    <AppShell backHref="/home" rightSlot={
      <div className="w-10 h-10 flex items-center justify-center">
        <span className="text-xs text-breezy-muted font-medium">{postsToShow.length} posts</span>
      </div>
    }>
      <ProfileHeader profile={mockProfile} isOwn activeTab={activeTab} onTabChange={setActiveTab} />
      <div>
        {postsToShow.map(p => <PostCard key={p._id} post={p} />)}
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
