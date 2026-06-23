'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { House, Search, Bell, Mail } from 'lucide-react'

function HomeIcon({ filled }) {
  return filled
    ? <House size={26} fill="currentColor" strokeWidth={2.5} className="text-breezy-dark" />
    : <House size={26} fill="none" strokeWidth={2} className="text-breezy-muted" />
}
function SearchIcon({ filled }) {
  return filled
    ? <Search size={26} fill="currentColor" strokeWidth={2.5} className="text-breezy-dark" />
    : <Search size={26} fill="none" strokeWidth={2} className="text-breezy-muted" />
}
function BellIcon({ filled, count }) {
  return (
    <div className="relative">
      {filled
        ? <Bell size={26} fill="currentColor" strokeWidth={2.5} className="text-breezy-dark" />
        : <Bell size={26} fill="none" strokeWidth={2} className="text-breezy-muted" />
      }
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-breezy-primary text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-white">
          {count}
        </span>
      )}
    </div>
  )
}
function MailIcon({ filled, count }) {
  return (
    <div className="relative">
      {filled
        ? <Mail size={26} fill="currentColor" strokeWidth={2.5} className="text-breezy-dark" />
        : <Mail size={26} fill="none" strokeWidth={2} className="text-breezy-muted" />
      }
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-breezy-primary text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-white">
          {count}
        </span>
      )}
    </div>
  )
}

const LINKS = [
  { href: '/home', icon: HomeIcon },
  { href: '/search', icon: SearchIcon },
  { href: '/notifications', icon: BellIcon, isBell: true },
  { href: '/messages', icon: MailIcon, isMail: true },
]

export default function BottomNav() {
  const path = usePathname()
  const { unreadCount, unreadMsgCount } = useAuth()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 bg-white border-t border-x border-breezy-border flex items-center justify-around h-14 pb-safe md:hidden">
      {LINKS.map(({ href, icon: Icon, isBell, isMail }) => {
        const active = path === href || path.startsWith(href + '/')
        return (
          <Link key={href} href={href} className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-breezy-hover transition-colors">
            <Icon filled={active} count={isBell ? unreadCount : isMail ? unreadMsgCount : 0} />
          </Link>
        )
      })}
    </nav>
  )
}
