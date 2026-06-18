'use client'
import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { useFollow } from '@/hooks/useFollow'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { formatJoined } from '@/utils/formatDate'
import FollowersModal from './FollowersModal'

function LocationIcon() { return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted"><path d="M12 7c-1.933 0-3.5 1.567-3.5 3.5S10.067 14 12 14s3.5-1.567 3.5-3.5S13.933 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 8.5 12 8.5s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-3.866 0-7 3.134-7 7 0 5.25 6.375 11.645 6.648 11.915.182.178.416.267.652.267.236 0 .47-.089.652-.267C13.625 20.645 20 14.25 20 9c0-3.866-3.134-7-8-7zm0 17.79C10.12 17.75 7 13.76 7 9c0-2.757 2.243-5 5-5s5 2.243 5 5c0 4.76-3.12 8.75-5 9.79z" /></svg> }
function CalIcon() { return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm0-13H5V5h14v1zM7 10h5v5H7z" /></svg> }

// 💡 AJOUT : onProfileUpdate a été ajouté ici dans la déstructuration des props
export default function ProfileHeader({ profile, isOwn, activeTab = 'Posts', onTabChange, onProfileUpdate }) {
  const { user } = useAuth()
  const { following, toggle, loading } = useFollow(profile?.id, profile?.followedByMe)

  const handleToggleFollow = async () => {
    try {
      await toggle()
      // 💡 SÉCURITÉ : On vérifie que onProfileUpdate existe et est bien une fonction avant de l'appeler
      if (typeof onProfileUpdate === 'function') {
        onProfileUpdate()
      }
    } catch (error) {
      console.error("Erreur follow/unfollow:", error)
    }
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('followers')

  if (!profile) return null

  function openModal(type) {
    setModalType(type)
    setModalOpen(true)
  }

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
            {isOwn ? (
              <Link href="/profile/edit">
                <Button variant="secondary" className="px-4 py-1.5 rounded-full font-semibold text-sm">
                  Edit profile
                </Button>
              </Link>
            ) : (
              <Button
                variant={following ? 'unfollow' : 'follow'}
                onClick={handleToggleFollow}
                loading={loading}
              >
                {following ? 'Ne plus suivre' : 'Suivre'}
              </Button>
            )}
          </div>
        </div>

        {/* Name + @handle */}
        <h1 className="font-bold text-xl text-breezy-dark">{profile.username}</h1>
        <p className="text-breezy-muted text-sm">@{profile.username}</p>

        {/* Bio */}
        {profile.bio && <p className="mt-2 text-sm text-breezy-dark whitespace-pre-wrap leading-relaxed">{profile.bio}</p>}

        {/* Meta */}
        <div className="flex items-center gap-4 mt-2 flex-wrap">
          {profile.location && (
            <span className="flex items-center gap-1 text-sm text-breezy-muted">
              <LocationIcon />{profile.location}
            </span>
          )}
          {profile.createdAt && (
            <span className="flex items-center gap-1 text-sm text-breezy-muted">
              <CalIcon />Rejoint {formatJoined(profile.createdAt)}
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