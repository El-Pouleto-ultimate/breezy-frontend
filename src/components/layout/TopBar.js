'use client'
import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { Settings, ArrowLeft } from 'lucide-react'

export default function TopBar({ title, backHref, rightSlot }) {
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-breezy-border md:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: avatar or back */}
        <div className="w-10">
          {backHref
            ? <Link href={backHref} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-breezy-hover">
                <ArrowLeft size={20} className="text-breezy-dark" />
              </Link>
            : user && <Link href="/profile"><Avatar src={user.avatar} username={user.username} size="sm" /></Link>
          }
        </div>

        {/* Center: title */}
        <div className="flex-1 flex justify-center">
          <span className="font-bold text-lg text-breezy-dark tracking-tight">{title || 'Breezy'}</span>
        </div>

        {/* Right: slot or settings */}
        <div className="w-10 flex justify-end">
          {rightSlot || (
            <Link href="/settings" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-breezy-hover">
              <Settings size={20} className="text-breezy-muted" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
