'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createPost } from '@/services/postService'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'

const MAX = 280

export default function ComposePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [text, setT] = useState('')
  const [mediaPreview, setMediaPreview] = useState(null)
  const [loading, setL] = useState(false)
  const fileInputRef = useRef(null)

  const left = MAX - text.length
  const over = left < 0
  const pct = Math.min(100, (text.length / MAX) * 100)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setMediaPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  async function publish() {
    if ((!text.trim() && !mediaPreview) || over || loading) return
    setL(true)
    try {
      await createPost({ content: text, imageUrl: mediaPreview })
      window.dispatchEvent(new Event('postCreated'))
      router.push('/home')
    } finally { setL(false) }
  }

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-breezy-border">
        <button onClick={() => router.back()} className="text-breezy-dark font-medium text-sm">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-breezy-dark">
            <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"/>
          </svg>
        </button>
        <span className="text-breezy-primary text-sm font-semibold cursor-pointer">Brouillons</span>
        <Button onClick={publish} loading={loading} disabled={(!text.trim() && !mediaPreview) || over}
          className="bg-breezy-dark text-white text-sm font-bold px-5 py-1.5 rounded-full hover:bg-black">
          Publier
        </Button>
      </div>

      {/* Compose area */}
      <div className="flex-1 flex gap-3 p-4">
        <Avatar src={user?.avatar} username={user?.username || '?'} size="md" />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={e => setT(e.target.value)}
            placeholder="Quoi de neuf ?"
            autoFocus
            className="w-full text-xl text-breezy-dark placeholder:text-breezy-muted bg-transparent outline-none resize-none min-h-32 leading-relaxed"
          />
          {/* Aperçu image */}
          {mediaPreview && (
            <div className="relative mt-2 max-w-xs">
              <img src={mediaPreview} alt="Preview" className="rounded-2xl max-h-48 object-cover" />
              <button onClick={() => setMediaPreview(null)}
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M13.414 12l5.293-5.293-1.414-1.414L12 10.586 6.707 5.293 5.293 6.707 10.586 12l-5.293 5.293 1.414 1.414L12 13.414l5.293 5.293 1.414-1.414L13.414 12z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="border-t border-breezy-border px-4 py-2 flex items-center gap-4">
        {/* Bouton image uniquement */}
        <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
        <button onClick={() => fileInputRef.current?.click()}
          className="text-breezy-primary hover:bg-blue-50 rounded-full p-1.5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"/>
          </svg>
        </button>

        <div className="ml-auto flex items-center gap-3">
          {/* Compteur texte */}
          <span className={`text-sm ${over ? 'text-red-500' : 'text-breezy-muted'}`}>
            {text.length}/{MAX}
          </span>

          {/* Progress ring */}
          {text.length > 0 && (
            <div className="relative w-6 h-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6 -rotate-90">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#EFF3F4" strokeWidth="2"/>
                <circle cx="12" cy="12" r="10" fill="none"
                  stroke={over ? '#F4212E' : left < 20 ? '#FFD400' : '#1D9BF0'}
                  strokeWidth="2" strokeDasharray={`${2*Math.PI*10}`}
                  strokeDashoffset={`${2*Math.PI*10*(1-pct/100)}`} strokeLinecap="round"/>
              </svg>
              {left < 20 && (
                <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold ${over ? 'text-red-500' : 'text-breezy-muted'}`}>
                  {left}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}