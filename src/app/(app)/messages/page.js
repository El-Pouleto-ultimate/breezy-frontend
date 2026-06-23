'use client'
import AppShell from '@/components/layout/AppShell'
import { Mail } from 'lucide-react'

export default function MessagesPage() {
  return (
    <AppShell title="Messages">
      <div className="flex flex-col items-center justify-center py-20 px-8 gap-4">
        <div className="w-16 h-16 bg-breezy-bg rounded-full flex items-center justify-center">
          <Mail size={48} className="text-breezy-muted" />
        </div>
        <h2 className="text-xl font-bold text-breezy-dark">Messagerie</h2>
        <p className="text-breezy-muted text-sm text-center max-w-xs">
          La messagerie directe sera disponible dans une prochaine version de Breezy.
        </p>
      </div>
    </AppShell>
  )
}
