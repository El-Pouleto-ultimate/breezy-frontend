'use client'
import { useLike } from '@/hooks/useLike'

function Ico({ d, cls='w-5 h-5' }) { return <svg viewBox="0 0 24 24" className={cls}><path d={d}/></svg> }

const COMMENT_D = "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 7.498 3.58 7.498 8 0 4.421-3.57 8.001-7.998 8.001h-4.376c-.292 0-.753-.105-.975-.209L2.75 21v-4.438c-.642-1.43-1-3.058-1-4.562zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 1.333.502 2.61 1.38 3.591l.62.698V19.5l4.91-2.5H13.75c3.126 0 5.998-2.569 5.998-6.001 0-3.43-2.658-6-5.998-6H9.756z"
const REPOST_D = "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
const SHARE_D = "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
const STATS_D = "M9 17c0 .55-.45 1-1 1s-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v5zm4 0c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1s1 .45 1 1v10zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2z"
const HEART_O = "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
const HEART_F = "M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"

export default function PostActions({ post, onComment, onUpdate }) {
  const { liked, count, handleLike } = useLike(post, onUpdate)

  return (
    <div className="flex items-center justify-between mt-3 -mx-2">
      {/* Comment */}
      <button onClick={onComment} className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-primary transition-colors p-2 rounded-full hover:bg-blue-50">
        <Ico d={COMMENT_D} cls="w-[18px] h-[18px] fill-current" />
        <span className="text-xs">{post.commentsCount || 0}</span>
      </button>

      {/* Repost */}
      <button className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-repost transition-colors p-2 rounded-full hover:bg-green-50">
        <Ico d={REPOST_D} cls="w-[18px] h-[18px] fill-current" />
        <span className="text-xs">{post.repostsCount || 0}</span>
      </button>

      {/* Like */}
      <button onClick={handleLike} className={`group flex items-center gap-1.5 transition-colors p-2 rounded-full ${liked ? 'text-breezy-like' : 'text-breezy-muted hover:text-breezy-like hover:bg-pink-50'}`}>
        <Ico d={liked ? HEART_F : HEART_O} cls={`w-[18px] h-[18px] fill-current transition-transform ${liked ? 'scale-110' : ''}`} />
        <span className="text-xs">{count}</span>
      </button>

      {/* Stats */}
      <button className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-primary transition-colors p-2 rounded-full hover:bg-blue-50">
        <Ico d={STATS_D} cls="w-[18px] h-[18px] fill-current" />
        <span className="text-xs">{post.viewsCount || 0}</span>
      </button>

      {/* Share */}
      <button className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-primary transition-colors p-2 rounded-full hover:bg-blue-50">
        <Ico d={SHARE_D} cls="w-[18px] h-[18px] fill-current" />
      </button>
    </div>
  )
}
