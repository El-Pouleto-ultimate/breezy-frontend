'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createPost } from '@/services/postService'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'

const MAX = 280

export default function ComposePage() {
  const { user }    = useAuth()
  const router      = useRouter()
  const [text, setT] = useState('')
  const [loading, setL] = useState(false)

  const left    = MAX - text.length
  const over    = left < 0
  const pct     = Math.min(100, (text.length / MAX) * 100)

  async function publish() {
    if (!text.trim() || over || loading) return
    setL(true)
    try { 
      await createPost({ content: text }); 
      window.dispatchEvent(new Event('postCreated'));
      router.push('/home') 
    }
    finally { setL(false) }
  }

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-breezy-border">
        <button onClick={()=>router.back()} className="text-breezy-dark font-medium text-sm">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-breezy-dark"><path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"/></svg>
        </button>
        <span className="text-breezy-primary text-sm font-semibold cursor-pointer">Brouillons</span>
        <Button onClick={publish} loading={loading} disabled={!text.trim() || over}
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
            onChange={e=>setT(e.target.value)}
            placeholder="What's happening?"
            autoFocus
            className="w-full text-xl text-breezy-dark placeholder:text-breezy-muted bg-transparent outline-none resize-none min-h-32 leading-relaxed"
          />
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="border-t border-breezy-border px-4 py-2 flex items-center gap-4">
        {/* Media icons */}
        {[
          "M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z",
          "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-5v5h-2v-5H6v-2h5V7h2v5h5v2z",
          "M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z",
        ].map((d,i) => (
          <button key={i} className="text-breezy-primary hover:bg-blue-50 rounded-full p-1.5 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d={d}/></svg>
          </button>
        ))}

        <div className="ml-auto flex items-center gap-3">
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
                <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold ${over ? 'text-red-500' : 'text-breezy-muted'}`}>{left}</span>
              )}
            </div>
          )}
          <button className="w-7 h-7 rounded-full border-2 border-breezy-border flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-primary"><path d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
