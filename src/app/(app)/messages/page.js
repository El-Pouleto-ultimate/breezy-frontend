'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import Avatar from '@/components/ui/Avatar'
import { timeAgo } from '@/utils/formatDate'

const MOCK_CONVS = [
  { id: '1', user: { username: 'Alex Rivera', avatar: '' }, lastMsg: 'Are we still on for the design re...', time: new Date(Date.now() - 120000).toISOString(), unread: true },
  { id: '2', user: { username: 'Sarah Chen', avatar: '' }, lastMsg: "Sounds good, I'll send over the Fig...", time: new Date(Date.now() - 3600000).toISOString(), unread: false },
  { id: '3', user: { username: 'Marcus Johnson', avatar: '' }, lastMsg: 'Can you review the latest compon...', time: new Date(Date.now() - 86400000).toISOString(), unread: false },
  { id: '4', user: { username: 'Design System Guild', avatar: '' }, lastMsg: "Elena: Let's merge the typography...", time: new Date(Date.now() - 172800000).toISOString(), unread: false },
  { id: '5', user: { username: 'David Kim', avatar: '' }, lastMsg: 'Haha yeah, that sounds exactly rig...', time: new Date(Date.now() - 604800000).toISOString(), unread: false },
]

export default function MessagesPage() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const filteredConvs = MOCK_CONVS.filter(c => c.user.username.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppShell title="Breezy" rightSlot={
      <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-breezy-hover">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-breezy-dark"><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.638V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.697l-7.75 3.523c-.145.066-.31.066-.455 0L3.998 10.7V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-7.803z" /></svg>
      </button>
    }>
      <div className="px-4 py-4">
        <h2 className="text-2xl font-black text-breezy-dark mb-4">Messages</h2>

        {/* Search DMs */}
        <div className="flex items-center gap-3 bg-breezy-bg rounded-full px-4 py-2.5 mb-4">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted flex-shrink-0">
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Direct Messages"
            className="bg-transparent flex-1 text-sm outline-none text-breezy-dark placeholder:text-breezy-muted"
          />
        </div>
      </div>

      {/* Conversations */}
      <div>
        {filteredConvs.map(conv => (
          <div
            key={conv.id}
            onClick={() => router.push(`/messages/${conv.id}`)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-breezy-hover transition-colors cursor-pointer border-b border-breezy-border"
          >
            <Avatar src={conv.user.avatar} username={conv.user.username} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-sm text-breezy-dark truncate">{conv.user.username}</span>
                <span className="text-xs text-breezy-muted ml-2 flex-shrink-0">{timeAgo(conv.time)}</span>
              </div>
              <p className="text-sm text-breezy-muted truncate mt-0.5">{conv.lastMsg}</p>
            </div>
            {conv.unread && <div className="w-2.5 h-2.5 bg-breezy-primary rounded-full flex-shrink-0" />}
          </div>
        ))}
        {filteredConvs.length === 0 && (
          <p className="text-center text-sm text-breezy-muted py-8">Aucun message trouvé.</p>
        )}
      </div>

      {/* FAB new message */}
      <button className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-breezy-dark text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black active:scale-95 transition-all">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3z" /></svg>
      </button>
    </AppShell>
  )
}
