'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { createComment } from '@/services/commentService'
import { useAuth } from '@/hooks/useAuth'
import { Suspense } from 'react'

function ReplyForm() {
  const { user }    = useAuth()
  const router      = useRouter()
  const params      = useSearchParams()
  const postId      = params.get('postId')
  const [text, setT] = useState('')
  const [loading, setL] = useState(false)

  const mockPost = {
    author: { username: 'Marie Design', handle: '@mariedesign', avatar: '' },
    content: "Le design minimaliste n'est pas une question d'absence de contenu, mais de clarté. Supprimer le superflu permet à l'essentiel de respirer. Pensez-vous que nous en faisons trop avec les interfaces complexes aujourd'hui ? 🤔",
    time: '2 h'
  }

  async function publish() {
    if (!text.trim() || loading) return
    setL(true)
    try {
      if (postId) await createComment(postId, { content: text })
      router.back()
    } finally { setL(false) }
  }

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-breezy-border">
        <button onClick={()=>router.back()} className="text-breezy-dark">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-breezy-dark"><path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"/></svg>
        </button>
        <span className="text-breezy-primary text-sm font-semibold">Brouillons</span>
        <Button onClick={publish} loading={loading} disabled={!text.trim()}
          className="bg-breezy-dark text-white text-sm font-bold px-5 py-1.5 rounded-full hover:bg-black">
          Publier
        </Button>
      </div>

      {/* Original post */}
      <div className="flex gap-3 px-4 pt-4">
        <div className="flex flex-col items-center">
          <Avatar src={mockPost.author.avatar} username={mockPost.author.username} size="md" />
          <div className="w-0.5 flex-1 bg-breezy-border mt-2 min-h-12" />
        </div>
        <div className="flex-1 pb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-bold text-sm text-breezy-dark">{mockPost.author.username}</span>
            <span className="text-breezy-muted text-sm">{mockPost.author.handle}</span>
            <span className="text-breezy-muted text-sm">· {mockPost.time}</span>
          </div>
          <p className="text-sm text-breezy-dark leading-relaxed">{mockPost.content}</p>
          <p className="text-sm text-breezy-primary mt-2">En réponse à {mockPost.author.handle}</p>
        </div>
      </div>

      {/* Reply area */}
      <div className="flex gap-3 px-4 flex-1">
        <Avatar src={user?.avatar} username={user?.username || '?'} size="md" className="mt-1" />
        <textarea
          value={text}
          onChange={e=>setT(e.target.value)}
          placeholder="Votre réponse..."
          autoFocus
          className="flex-1 text-lg text-breezy-dark placeholder:text-breezy-muted bg-transparent outline-none resize-none min-h-32 leading-relaxed pt-1"
        />
      </div>

      {/* Toolbar */}
      <div className="border-t border-breezy-border px-4 py-2 flex items-center gap-4">
        {['M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13z','M6.75 4a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zM4.5 6.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0z','M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10h5v-2h-5z'].map((d,i) => (
          <button key={i} className="text-breezy-primary hover:bg-blue-50 rounded-full p-1.5 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d={d}/></svg>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ReplyPage() {
  return <Suspense><ReplyForm /></Suspense>
}
