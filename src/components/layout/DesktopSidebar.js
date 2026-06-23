'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { House, Search, Bell, Mail, User, Settings, Ellipsis, Feather } from 'lucide-react'

function HomeIcon({ filled }) {
  return <House size={26} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 2.5 : 2} className="text-breezy-dark" />
}
function SearchIcon({ filled }) {
  return <Search size={26} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 2.5 : 2} className="text-breezy-dark" />
}
function BellIcon({ filled, count }) {
  return (
    <div className="relative">
      <Bell size={26} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 2.5 : 2} className="text-breezy-dark" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-breezy-primary text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-white">
          {count}
        </span>
      )}
    </div>
  )
}
function MailIcon({ filled }) {
  return <Mail size={26} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 2.5 : 2} className="text-breezy-dark" />
}
function ProfileIcon({ filled }) {
  return <User size={26} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 2.5 : 2} className="text-breezy-dark" />
}
function SettingsIcon({ filled }) {
  return <Settings size={26} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 2.5 : 2} className="text-breezy-dark" />
}

const LINKS = [
  { href: '/home', label: 'Accueil', icon: HomeIcon },
  { href: '/search', label: 'Explorer', icon: SearchIcon },
  { href: '/notifications', label: 'Notifications', icon: BellIcon, isBell: true },
  { href: '/messages', label: 'Messages', icon: MailIcon, isMail: true },
  { href: '/profile', label: 'Profil', icon: ProfileIcon },
  { href: '/settings', label: 'Paramètres', icon: SettingsIcon },
]

export default function DesktopSidebar() {
  const path = usePathname()
  const router = useRouter()
  const { user, unreadCount, unreadMsgCount, logout } = useAuth()

  function handleLogout() {
    logout()
    router.push('/connect')
  }

  return (
    <header className="hidden md:flex w-[88px] lg:w-[275px] flex-col justify-between h-screen sticky top-0 px-2 lg:px-4 py-4 shrink-0 overflow-y-auto">
      <div className="flex flex-col items-center lg:items-start w-full">
        {/* Logo */}
        <Link href="/home" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors mb-2 ml-0 lg:ml-2">
           <svg viewBox="0 0 24 24" className="w-8 h-8 fill-breezy-dark">
             <path d="M5.636 18.364A9 9 0 1 1 18.364 5.636 9 9 0 0 1 5.636 18.364zm12.02-1.41A7.5 7.5 0 1 0 6.344 7.047a7.5 7.5 0 0 0 11.312 9.907zm-9.197-5.987c.568.917 1.02 1.32 1.694 1.59.676.27 1.64.37 3.097.31l.084.043c.022.226-.028.66-.254 1.13-.2.42-.562.88-1.126 1.26-.56.38-1.314.69-2.336.79-.93.09-1.633-.08-2.15-.4-.517-.32-.85-.79-1.02-1.38-.336-1.19.012-2.68.76-4l.26.43c-.47.82-.69 1.87-.51 2.7.177.83.68 1.46 1.5 1.46z"/>
           </svg>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 w-full mt-2">
          {LINKS.map(({ href, label, icon: Icon, isBell, isMail }) => {
            const active = path === href || path.startsWith(href + '/')
            return (
              <Link key={href} href={href} className="group flex items-center w-max p-3 rounded-full hover:bg-breezy-hover transition-colors">
                <Icon filled={active} count={isBell ? unreadCount : isMail ? unreadMsgCount : 0} />
                <span className={`hidden lg:block ml-5 text-xl mr-4 ${active ? 'font-bold' : ''}`}>{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Compose Button */}
        <div className="w-full mt-6 flex justify-center lg:block">
          <Link href="/compose">
            <Button variant="primary_pill" className="w-12 h-12 lg:w-full lg:h-auto lg:py-3.5 lg:px-8 flex items-center justify-center p-0">
              <span className="hidden lg:inline text-[17px]">Poster</span>
              <Feather size={24} className="text-white lg:hidden" />
            </Button>
          </Link>
        </div>
      </div>

      {/* User profile / Logout */}
      {user && (
        <div className="mt-auto w-full flex justify-center lg:block mb-4 relative group">
           <button onClick={() => { if(window.confirm('Voulez-vous vous déconnecter ?')) handleLogout() }} className="flex items-center w-full p-3 rounded-full hover:bg-breezy-hover transition-colors text-left cursor-pointer">
             <Avatar src={user.avatar} username={user.username} size="sm" />
             <div className="hidden lg:block ml-3 overflow-hidden flex-1">
               <p className="font-bold text-[15px] truncate text-breezy-dark">{user.username}</p>
               <p className="text-breezy-muted text-[15px] truncate">@{user.username}</p>
             </div>
             <div className="hidden lg:block ml-auto text-breezy-dark">
                <Ellipsis size={20} />
             </div>
           </button>
           <div className="absolute bottom-full left-0 mb-2 w-full lg:w-64 bg-white shadow-xl border border-breezy-border rounded-2xl p-2 hidden group-hover:block z-50">
             <button onClick={handleLogout} className="w-full text-left px-4 py-3 font-bold hover:bg-breezy-hover rounded-xl text-breezy-dark">
               Se déconnecter de @{user.username}
             </button>
           </div>
        </div>
      )}
    </header>
  )
}
