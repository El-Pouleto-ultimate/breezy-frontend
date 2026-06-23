'use client'
import { useState } from 'react'
import { useLike } from '@/hooks/useLike'
import { showToast } from '@/utils/toast'
import { useAuth } from '@/hooks/useAuth'
import { toggleRepost, deletePost } from '@/services/postService'
import { Heart, MessageCircle, Repeat2, Ellipsis } from 'lucide-react'

export default function PostActions({ post, onComment, onUpdate, onEdit }) {
  const { user } = useAuth()
  const { liked, count, handleLike } = useLike(post, onUpdate)
  const [reposted, setReposted] = useState(post?.repostedByMe || false)
  const [repostsCount, setRepostsCount] = useState(post?.reposts_count || 0)
  const [showMenu, setShowMenu] = useState(false)

  const isOwnPost = post?.user_id === user?.id || post?.user_id === user?._id

  const exactCommentsCount = Array.isArray(post?.comments) ? post.comments.length : (post?.comments_count || 0)

  async function handleRepost() {
    const was = reposted
    const prevCount = repostsCount
    const nextReposted = !was
    const nextCount = nextReposted ? prevCount + 1 : Math.max(0, prevCount - 1)
    setReposted(nextReposted)
    setRepostsCount(nextCount)
    try {
      const d = await toggleRepost(post._id)
      setReposted(d.reposted)
      setRepostsCount(d.reposts_count)
      onUpdate?.({ ...post, repostedByMe: d.reposted, reposts_count: d.reposts_count })
    } catch {
      setReposted(was)
      setRepostsCount(prevCount)
    }
  }

  async function handleDelete() {
    if (!window.confirm("Voulez-vous vraiment supprimer ce post ?")) return
    try {
      await deletePost(post._id)
      onUpdate?.({ ...post, deleted: true })
    } catch (err) {
      showToast("Erreur lors de la suppression")
    }
  }

  return (
    <div className="flex items-center justify-between mt-3 -mx-2 relative">
      {/* Comment */}
      <button onClick={onComment} className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-primary transition-colors p-2 rounded-full hover:bg-blue-50" title="Commenter">
        <MessageCircle size={18} />
        <span className="text-xs">{exactCommentsCount}</span>
      </button>

      {/* Repost */}
      <button onClick={handleRepost} className={`group flex items-center gap-1.5 transition-colors p-2 rounded-full ${reposted ? 'text-green-500 hover:bg-green-50' : 'text-breezy-muted hover:text-breezy-repost hover:bg-green-50'}`} title="Republications">
        <Repeat2 size={18} />
        <span className="text-xs">{repostsCount}</span>
      </button>

      {/* Like */}
      <button onClick={handleLike} className={`group flex items-center gap-1.5 transition-colors p-2 rounded-full ${liked ? 'text-breezy-like' : 'text-breezy-muted hover:text-breezy-like hover:bg-pink-50'}`} title="J'aime">
        <Heart size={18} className={`transition-transform ${liked ? 'scale-110' : ''}`} fill={liked ? '#F91880' : 'none'} color={liked ? '#F91880' : 'currentColor'} />
        <span className="text-xs">{count}</span>
      </button>

      {/* Menu d'options (3 points) */}
      {isOwnPost && (
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-breezy-muted hover:text-breezy-dark p-2 rounded-full hover:bg-gray-100" title="Options">
            <Ellipsis size={18} />
          </button>
          
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 bottom-10 z-20 bg-white border border-breezy-border rounded-2xl shadow-xl py-2 w-36 overflow-hidden">
                {/* ⚡ Déclenche le mode édition inline du parent */}
                <button onClick={() => { onEdit(); setShowMenu(false) }} className="w-full text-left px-4 py-2 text-sm text-breezy-dark hover:bg-breezy-bg font-medium">
                  Modifier
                </button>
                <button onClick={() => { handleDelete(); setShowMenu(false) }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold">
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      )}

    </div>
  )
}