'use client'
import { useState } from 'react'
import { useLike } from '@/hooks/useLike'
import { toggleRepost } from '@/services/postService'

function Ico({ d, cls = 'w-5 h-5' }) { return <svg viewBox="0 0 24 24" className={cls}><path d={d} /></svg> }

const COMMENT_D = "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 7.498 3.58 7.498 8 0 4.421-3.57 8.001-7.998 8.001h-4.376c-.292 0-.753-.105-.975-.209L2.75 21v-4.438c-.642-1.43-1-3.058-1-4.562zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 1.333.502 2.61 1.38 3.591l.62.698V19.5l4.91-2.5H13.75c3.126 0 5.998-2.569 5.998-6.001 0-3.43-2.658-6-5.998-6H9.756z"
const REPOST_D = "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
const SHARE_D = "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
const STATS_D = "M9 17c0 .55-.45 1-1 1s-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v5zm4 0c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1s1 .45 1 1v10zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2z"
const HEART_O = "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
const HEART_F = "M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"

export default function PostActions({ post, onComment, onUpdate }) {
  const { liked, count, handleLike } = useLike(post, onUpdate)
  const [reposted, setReposted] = useState(post?.repostedByMe || false)
  const [repostsCount, setRepostsCount] = useState(post?.repostsCount || 0)
  const [showStats, setShowStats] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  // Calcule un nombre de vues réaliste si non fourni
  const views = post?.viewsCount || (post?.likesCount * 12 + 45) || 150

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
      setRepostsCount(d.repostsCount)
      onUpdate?.({ ...post, repostedByMe: d.reposted, repostsCount: d.repostsCount })
    } catch {
      setReposted(was)
      setRepostsCount(prevCount)
    }
  }

  function downloadTxt() {
    const textContent = `Auteur: ${post.author?.username || 'Inconnu'}\nDate: ${new Date(post.createdAt).toLocaleString()}\n\nContenu:\n${post.content}\n\nStats:\n- J'aime: ${count}\n- Commentaires: ${post.commentsCount || 0}\n- Republications: ${repostsCount}\n- Vues: ${views}`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `post_${post._id || 'breezy'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  }

  function downloadJson() {
    const jsonContent = JSON.stringify({ ...post, likesCount: count, repostsCount, viewsCount: views }, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `post_${post._id || 'breezy'}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  }

  function copyLink() {
    const shareUrl = `${window.location.origin}/home?openComments=${post._id}`
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setShowShareMenu(false)
    }, 1200)
  }

  const engagementRate = (((count + (post.commentsCount || 0) + repostsCount) / views) * 100).toFixed(1)

  return (
    <div className="flex items-center justify-between mt-3 -mx-2 relative">
      {/* Comment */}
      <button onClick={onComment} className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-primary transition-colors p-2 rounded-full hover:bg-blue-50" title="Commenter">
        <Ico d={COMMENT_D} cls="w-[18px] h-[18px] fill-current" />
        <span className="text-xs">{post.commentsCount || 0}</span>
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

      {/* Stats */}
      <button onClick={() => setShowStats(true)} className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-primary transition-colors p-2 rounded-full hover:bg-blue-50" title="Statistiques">
        <Ico d={STATS_D} cls="w-[18px] h-[18px] fill-current" />
        <span className="text-xs">{views}</span>
      </button>

      {/* Share / Download */}
      <div className="relative">
        <button onClick={() => setShowShareMenu(!showShareMenu)} className="group flex items-center gap-1.5 text-breezy-muted hover:text-breezy-primary transition-colors p-2 rounded-full hover:bg-blue-50" title="Partager / Télécharger">
          <Ico d={SHARE_D} cls="w-[18px] h-[18px] fill-current" />
        </button>

        {showShareMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
            <div className="absolute right-0 bottom-10 z-50 bg-white border border-breezy-border shadow-xl rounded-2xl py-2 w-48 text-sm">
              <button onClick={copyLink} className="w-full text-left px-4 py-2 hover:bg-breezy-hover text-breezy-dark flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted"><path d="M19.9 6.58l-5.65-5.65C13.75.42 13.11 0 12.42 0H5.5C4.12 0 3 1.12 3 2.5v19C3 22.88 4.12 24 5.5 24h13c1.38 0 2.5-1.12 2.5-2.5V8.58c0-.69-.42-1.33-1.1-2zM12.5 3c.28 0 .5.22.5.5V7h3.5c.28 0 .5.22.5.5s-.22.5-.5.5H12c-.55 0-1-.45-1-1V3.5c0-.28.22-.5.5-.5z" /></svg>
                {copied ? 'Lien copié !' : 'Copier le lien'}
              </button>
              <button onClick={downloadTxt} className="w-full text-left px-4 py-2 hover:bg-breezy-hover text-breezy-dark flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted"><path d="M12 16c-.28 0-.5-.22-.5-.5V4c0-.28.22-.5.5-.5s.5.22.5.5v11.5c0 .28-.22.5-.5.5zM19.7 12.3c-.2-.2-.5-.2-.7 0L12 19.3l-7-7c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l7.5 7.5c.1.1.2.2.3.2s.2-.1.3-.2l7.5-7.5c.2-.2.2-.5-.2-.7z" /></svg>
                Télécharger (.TXT)
              </button>
              <button onClick={downloadJson} className="w-full text-left px-4 py-2 hover:bg-breezy-hover text-breezy-dark flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                Télécharger (.JSON)
              </button>
            </div>
          </>
        )}
      </div>

      {/* Stats Modal */}
      {showStats && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setShowStats(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl p-6 w-full max-w-sm border border-breezy-border shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg text-breezy-dark">Statistiques du Breez</h3>
              <button onClick={() => setShowStats(false)} className="text-breezy-muted hover:text-breezy-dark p-1 rounded-full hover:bg-breezy-hover">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" /></svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-breezy-border pb-2.5">
                <span className="text-sm text-breezy-muted">Impressions / Vues</span>
                <span className="font-bold text-breezy-dark">{views}</span>
              </div>
              <div className="flex justify-between items-center border-b border-breezy-border pb-2.5">
                <span className="text-sm text-breezy-muted">Mentions J'aime</span>
                <span className="font-bold text-breezy-dark">{count}</span>
              </div>
              <div className="flex justify-between items-center border-b border-breezy-border pb-2.5">
                <span className="text-sm text-breezy-muted">Commentaires</span>
                <span className="font-bold text-breezy-dark">{post.commentsCount || 0}</span>
              </div>
              <div className="flex justify-between items-center border-b border-breezy-border pb-2.5">
                <span className="text-sm text-breezy-muted">Republications</span>
                <span className="font-bold text-breezy-dark">{repostsCount}</span>
              </div>

              <div className="mt-2 bg-breezy-bg rounded-2xl p-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-breezy-dark">Taux d'engagement</span>
                  <span className="text-sm font-bold text-breezy-primary">{engagementRate}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-breezy-primary h-full rounded-full" style={{ width: `${Math.min(100, parseFloat(engagementRate) * 5)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}