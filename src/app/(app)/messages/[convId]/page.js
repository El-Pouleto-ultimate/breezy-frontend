'use client'
import { useState, useRef, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import { MOCK_CONVERSATIONS, MOCK_USERS } from '@/mocks/data'

const INITIAL_MESSAGES = {
  '1': [
    { id: 'm1', senderId: '1', text: "Salut, on est toujours d'accord pour la revue de conception ?", time: new Date(Date.now() - 180000).toISOString() },
    { id: 'm2', senderId: 'me', text: 'Oui ! Je termine juste quelques composants.', time: new Date(Date.now() - 120000).toISOString() },
    { id: 'm3', senderId: '1', text: "Génial, j'ai hâte de les voir.", time: new Date(Date.now() - 60000).toISOString() },
  ],
  '2': [
    { id: 'm4', senderId: '2', text: "Ça marche, je t'envoie le lien Figma ce soir.", time: new Date(Date.now() - 3600000).toISOString() },
  ],
  '3': [
    { id: 'm5', senderId: '3', text: "Peux-tu revoir le dernier rapport d'accessibilité ?", time: new Date(Date.now() - 86400000).toISOString() },
  ],
  '4': [
    { id: 'm6', senderId: '4', text: "Fusionnons les changements typographiques d'abord.", time: new Date(Date.now() - 172800000).toISOString() },
  ],
}

function loadMessages(convId) {
  try {
    const saved = sessionStorage.getItem(`breezy_messages_${convId}`)
    return saved ? JSON.parse(saved) : (INITIAL_MESSAGES[convId] || [])
  } catch {
    return INITIAL_MESSAGES[convId] || []
  }
}

function saveMessages(convId, messages) {
  try {
    sessionStorage.setItem(`breezy_messages_${convId}`, JSON.stringify(messages))
  } catch {}
}

export default function ChatPage() {
  const { convId } = useParams()
  const router = useRouter()
  const [messages, setMessages] = useState(() => loadMessages(convId))
  const [text, setText] = useState('')
  const endRef = useRef(null)

  const conv = MOCK_CONVERSATIONS.find(c => c.id === convId)
  const userFallback = Object.values(MOCK_USERS).find(u => u._id === convId)
  const partner = conv?.user || userFallback || { username: 'Utilisateur', avatar: '' }
  const partnerSlug = `user_${partner.username.toLowerCase().split(' ')[0]}`

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend(e) {
    e.preventDefault()
    if (!text.trim()) return
    const newMsg = { id: Date.now().toString(), senderId: 'me', text, time: new Date().toISOString() }
    const updated = [...messages, newMsg]
    setMessages(updated)
    saveMessages(convId, updated)
    setText('')
  }

  return (
    <div className="flex flex-col h-[100dvh] md:h-full bg-white max-w-2xl w-full mx-auto border-x border-breezy-border relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md flex items-center gap-4 px-4 h-14 border-b border-breezy-border">
        <button onClick={() => router.back()} className="text-breezy-dark p-2 -ml-2 rounded-full hover:bg-breezy-hover">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z" />
          </svg>
        </button>
        <Link href={`/profile/${partnerSlug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">          <Avatar src={partner.avatar} username={partner.username} size="sm" />
          <span className="font-bold text-breezy-dark">{partner.username}</span>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-24">
      <Link href={`/profile/${partnerSlug}`} className="flex flex-col items-center py-6 border-b border-breezy-border mb-4 hover:opacity-80 transition-opacity">          <Avatar src={partner.avatar} username={partner.username} size="xl" />
          <span className="font-bold text-lg mt-2">{partner.username}</span>
          <span className="text-sm text-breezy-muted">@{partner.username.replace(' ', '').toLowerCase()}</span>
        </Link>

        {messages.map((m) => {
          const isMe = m.senderId === 'me'
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${isMe ? 'bg-breezy-primary text-white rounded-br-sm' : 'bg-breezy-bg text-breezy-dark rounded-bl-sm'}`}>
                <p className="text-[15px] leading-relaxed break-words">{m.text}</p>
              </div>
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-0 w-full bg-white border-t border-breezy-border px-4 py-3 pb-safe">
        <form onSubmit={handleSend} className="flex gap-2 items-end bg-breezy-bg rounded-2xl px-4 py-2">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Démarrer un message"
            className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 pt-1.5 text-[15px] placeholder:text-breezy-muted"
            rows={1}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend(e)
              }
            }}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="p-1.5 rounded-full text-breezy-primary hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c.072 1.962.34 3.833.583 5.183L17.764 12 6.564 5.817C6.321 7.167 6.053 9.038 5.981 11H11v2H5.981z" /></svg>
          </button>
        </form>
      </div>
    </div>
  )
}