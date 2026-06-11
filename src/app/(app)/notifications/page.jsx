'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import NotificationItem from '@/components/notifications/NotificationItem'
import Spinner from '@/components/ui/Spinner'

// Mock data — replace with API call
const MOCK = [
  { _id:'1', type:'like',    read:false, createdAt: new Date(Date.now()-7200000).toISOString(),
    actors:[{_id:'a1', username:'Alexandre', avatar:''}],
    preview:'La simplicité est la sophistication suprême. Tellement vrai pour le design...' },
  { _id:'2', type:'follow',  read:false, createdAt: new Date(Date.now()-14400000).toISOString(),
    actors:[{_id:'a2', username:'Marie Dubois', avatar:''}] },
  { _id:'3', type:'mention', read:true,  createdAt: new Date(Date.now()-43200000).toISOString(),
    actors:[{_id:'a3', username:'Thomas', avatar:''}],
    preview:'Totalement d\'accord avec cette approche. Tu en penses quoi @utilisateur ? Les espaces blancs changent tout.' },
  { _id:'4', type:'like',    read:true,  createdAt: new Date(Date.now()-86400000).toISOString(),
    actors:[{_id:'a4', username:'Sophie', avatar:''},{_id:'a5', username:'Marc', avatar:''},{_id:'a6', username:'Lena', avatar:''}],
    preview:'C\'est exactement ce qu\'il fallait faire.' },
]

export default function NotificationsPage() {
  const [tab, setTab]   = useState('all')
  const notifications = tab === 'all' ? MOCK : MOCK.filter(n => n.type === 'mention')

  return (
    <AppShell title="Breezy">
      {/* Tabs */}
      <div className="flex border-b border-breezy-border sticky top-14 z-30 bg-white">
        {[{id:'all',label:'Toutes'},{id:'mention',label:'Mentions'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${tab===t.id ? 'text-breezy-dark' : 'text-breezy-muted hover:bg-breezy-hover'}`}>
            {t.label}
            {tab===t.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-breezy-primary rounded-full" />}
          </button>
        ))}
      </div>

      {/* List */}
      <div>
        {notifications.map(n => <NotificationItem key={n._id} notif={n} />)}
      </div>
    </AppShell>
  )
}
