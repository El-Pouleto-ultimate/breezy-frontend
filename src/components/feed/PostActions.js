'use client'
import { useState } from 'react'
import { useLike } from '@/hooks/useLike'
import { useAuth } from '@/hooks/useAuth'
import { toggleRepost, deletePost } from '@/services/postService'

function Ico({ d, cls = 'w-5 h-5' }) { return <svg viewBox="0 0 24 24" className={cls}><path d={d} /></svg> }

const COMMENT_D = "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 7.498 3.58 7.498 8 0 4.421-3.57 8.001-7.998 8.001h-4.376c-.292 0-.753-.105-.975-.209L2.75 21v-4.438c-.642-1.43-1-3.058-1-4.562zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 1.333.502 2.61 1.38 3.591l.62.698V19.5l4.91-2.5H13.75c3.126 0 5.998-2.569 5.998-6.001 0-3.43-2.658-6-5.998-6H9.756z"
const REPOST_D = "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
const HEART_O = "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
const HEART_F = "M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
const DOTS_D = "M3 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"

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
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <div className="flex items-center justify-between mt-3 -mx-2 relative">
      {/* Comment */}
      <button onClick={onComment} className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-primary transition-colors p-2 rounded-full hover:bg-blue-50" title="Commenter">
        <Ico d={COMMENT_D} cls="w-[18px] h-[18px] fill-current" />
        <span className="text-xs">{exactCommentsCount}</span>
      </button>

      {/* Repost */}
      <button onClick={handleRepost} className={`group flex items-center gap-1.5 transition-colors p-2 rounded-full ${reposted ? 'text-green-500 hover:bg-green-50' : 'text-breezy-muted hover:text-breezy-repost hover:bg-green-50'}`} title="Republications">
        <Ico d={REPOST_D} cls="w-[18px] h-[18px] fill-current" />
        <span className="text-xs">{repostsCount}</span>
      </button>

      {/* Like */}
      <button onClick={handleLike} className={`group flex items-center gap-1.5 transition-colors p-2 rounded-full ${liked ? 'text-breezy-like' : 'text-breezy-muted hover:text-breezy-like hover:bg-pink-50'}`} title="J'aime">
        <Ico d={liked ? HEART_F : HEART_O} cls={`w-[18px] h-[18px] fill-current transition-transform ${liked ? 'scale-110' : ''}`} />
        <span className="text-xs">{count}</span>
      </button>

      {/* Menu d'options (3 points) */}
      {isOwnPost && (
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-breezy-muted hover:text-breezy-dark p-2 rounded-full hover:bg-gray-100" title="Options">
            <Ico d={DOTS_D} cls="w-[18px] h-[18px] fill-current" />
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