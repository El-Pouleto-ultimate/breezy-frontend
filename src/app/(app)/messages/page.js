'use client'
import AppShell from '@/components/layout/AppShell'

export default function MessagesPage() {
  return (
    <AppShell title="Messages">
      <div className="flex flex-col items-center justify-center py-20 px-8 gap-4">
        <div className="w-16 h-16 bg-breezy-bg rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-breezy-muted">
            <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.638V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.697l-7.75 3.523c-.145.066-.31.066-.455 0L3.998 10.7V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-7.803z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-breezy-dark">Messagerie</h2>
        <p className="text-breezy-muted text-sm text-center max-w-xs">
          La messagerie directe sera disponible dans une prochaine version de Breezy.
        </p>
      </div>
    </AppShell>
  )
}
