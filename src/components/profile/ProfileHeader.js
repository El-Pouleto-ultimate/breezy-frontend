'use client'
import { useState } from 'react'
import { MapPin, Calendar } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { useFollow } from '@/hooks/useFollow'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { formatJoined } from '@/utils/formatDate'
import FollowersModal from './FollowersModal'

const BIO_LIMIT = 160

export default function ProfileHeader({ profile, isOwn, activeTab = 'Posts', onTabChange, onProfileUpdate }) {
  const { user } = useAuth()
  const { following, toggle, loading } = useFollow(profile?.id, profile?.followedByMe, onProfileUpdate)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('followers')
  const [bioExpanded, setBioExpanded] = useState(false)

  if (!profile) return null

  function openModal(type) {
    setModalType(type)
    setModalOpen(true)
  }

  const bio = profile.bio || ''
  const isLongBio = bio.length > BIO_LIMIT
  const displayedBio = isLongBio && !bioExpanded ? bio.slice(0, BIO_LIMIT) + '…' : bio

  return (
    <div>
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 relative">
        {profile.banner && <img src={profile.banner} className="w-full h-full object-cover" alt="Banner" />}
      </div>

      {/* Avatar + action buttons */}
      <div className="px-4 pb-3">
        <div className="flex items-end justify-between -mt-8 mb-3">
          <Avatar src={profile.avatar} username={profile.username} size="xl" className="ring-4 ring-white" />
          <div className="flex gap-2 mt-8">
            {isOwn
              ? <Link href="/profile/edit">
                  <Button variant="secondary" className="px-4 py-1.5 rounded-full font-semibold text-sm">
                    Edit profile
                  </Button>
                </Link>
              : <Button variant={following ? 'unfollow' : 'follow'} onClick={toggle} loading={loading}>
                  {following ? 'Ne plus suivre' : 'Suivre'}
                </Button>
            }
          </div>
        </div>

        {/* Name + @handle */}
        <h1 className="font-bold text-xl text-breezy-dark">{profile.username}</h1>
        <p className="text-breezy-muted text-sm">@{profile.username}</p>

        {/* Bio avec limite 160 caractères */}
        {bio && (
          <div className="mt-2">
            <p className="text-sm text-breezy-dark whitespace-pre-wrap break-words overflow-hidden leading-relaxed">
              {displayedBio}
            </p>
            {isLongBio && (
              <button
                onClick={() => setBioExpanded(!bioExpanded)}
                className="text-sm text-breezy-primary hover:underline mt-1"
              >
                {bioExpanded ? 'Voir moins' : 'Voir plus'}
              </button>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 mt-2 flex-wrap">
          {profile.location && (
            <span className="flex items-center gap-1 text-sm text-breezy-muted">
              <MapPin size={16} className="text-breezy-muted" />{profile.location}
            </span>
          )}
          {profile.createdAt && (
            <span className="flex items-center gap-1 text-sm text-breezy-muted">
              <Calendar size={16} className="text-breezy-muted" />Rejoint {formatJoined(profile.createdAt)}
            </span>
          )}
        </div>

        {/* Following / Followers */}
        <div className="flex gap-4 mt-3">
          <button onClick={() => openModal('following')} className="text-sm hover:underline cursor-pointer">
            <strong className="font-bold text-breezy-dark">{profile.followingCount ?? 0}</strong>
            <span className="text-breezy-muted ml-1">Abonnements</span>
          </button>
          <button onClick={() => openModal('followers')} className="text-sm hover:underline cursor-pointer">
            <strong className="font-bold text-breezy-dark">{profile.followersCount ?? 0}</strong>
            <span className="text-breezy-muted ml-1">Abonnés</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-breezy-border flex">
        {['Posts', 'Replies', 'Media', 'Likes'].map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange && onTabChange(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === tab ? 'text-breezy-dark border-b-2 border-breezy-dark' : 'text-breezy-muted hover:bg-breezy-hover'}`}>
            {tab}
          </button>
        ))}
      </div>

      <FollowersModal isOpen={modalOpen} onClose={() => setModalOpen(false)} userId={profile.id} type={modalType} />
    </div>
  )
}