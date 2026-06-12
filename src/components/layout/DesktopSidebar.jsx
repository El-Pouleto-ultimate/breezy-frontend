'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'

function HomeIcon({ filled }) {
  return filled
    ? <svg viewBox="0 0 24 24" className="w-7 h-7 fill-breezy-dark"><path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4 19.6c0 .5.45.9 1 .9h14c.55 0 1-.4 1-.9l.93-11.05.815.44c.364.197.82.06 1.017-.304.196-.365.06-.82-.302-1.016zm-7.032 11.43H8.57v-5.43h6.86v5.43zm2 0h-1v-5.43c0-.5-.45-.9-1-.9h-6.86c-.55 0-1 .4-1 .9v5.43H7.57L6.61 9.84 12 7.01l5.39 2.83-.962 9.16z"/></svg>
    : <svg viewBox="0 0 24 24" className="w-7 h-7 fill-breezy-dark"><path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1zm0 2.69l6 5.4V19h-2v-6H8v6H6v-8.8l6-5.41z"/></svg>
}
function SearchIcon({ filled }) {
  return <svg viewBox="0 0 24 24" className={`w-7 h-7 fill-breezy-dark ${filled ? 'stroke-current stroke-1' : ''}`}><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"/></svg>
}
function BellIcon({ filled, count }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" className={`w-7 h-7 fill-breezy-dark ${filled ? 'stroke-current stroke-1' : ''}`}><path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.798c-1.308 0-2.387-.88-2.694-2.105h5.39c-.308 1.224-1.387 2.105-2.696 2.105zm-6.777-3.61c.702-1.158 1.378-3.016 1.348-5.888-.024-2.138.688-4.036 2.01-5.37 1.09-1.104 2.567-1.714 4.164-1.72 1.597.006 3.075.616 4.166 1.72 1.32 1.334 2.034 3.232 2.012 5.37-.03 2.88.636 4.73 1.342 5.888H5.223z"/></svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-breezy-primary text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-white">
          {count}
        </span>
      )}
    </div>
  )
}
function MailIcon({ filled }) {
  return <svg viewBox="0 0 24 24" className={`w-7 h-7 fill-breezy-dark ${filled ? 'stroke-current stroke-1' : ''}`}><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.638V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.697l-7.75 3.523c-.145.066-.31.066-.455 0L3.998 10.7V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-7.803z"/></svg>
}
function ProfileIcon({ filled }) {
  return <svg viewBox="0 0 24 24" className={`w-7 h-7 fill-breezy-dark ${filled ? 'stroke-current stroke-1' : ''}`}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
}
function SettingsIcon({ filled }) {
  return <svg viewBox="0 0 24 24" className={`w-7 h-7 fill-breezy-dark ${filled ? 'stroke-current stroke-1' : ''}`}><path d="M10.54 2.751l.53-.02c.337 0 .645.17.825.447l.968 1.467c.382.578 1.13.808 1.765.533l1.615-.683c.31-.132.666-.085.93.124l.822.657.343.363c.209.265.256.62.124.93l-.683 1.614c-.275.636-.045 1.383.533 1.766l1.467.968c.277.18.447.49.447.825v.53c0 .05-.003.1-.01.149l.01-.002v.53c0 .337-.17.645-.447.825l-1.467.968c-.578.383-.808 1.13-.533 1.766l.683 1.614c.132.31.085.665-.124.93l-.657.822-.363.343c-.265.209-.62.256-.93.124l-1.615-.683c-.635-.275-1.383-.045-1.765.533l-.968 1.467c-.18.277-.49.447-.825.447h-.53c-.05 0-.1-.003-.149-.01l.002.01h-.53c-.337 0-.645-.17-.825-.447l-.968-1.467c-.383-.578-1.13-.808-1.766-.533l-1.614.683c-.31.132-.665.085-.93-.124l-.822-.657-.343-.363c-.209-.265-.256-.62-.124-.93l.683-1.614c.275-.636.045-1.383-.533-1.766l-1.467-.968c-.277-.18-.447-.49-.447-.825v-.53c0-.05.003-.1.01-.149l-.01.002v-.53c0-.337.17-.645.447-.825l1.467-.968c.578-.383.808-1.13.533-1.766l-.683-1.614c-.132-.31-.085-.666.124-.93l.657-.822.363-.343c.265-.209.62-.256.93-.124l1.614.683c.636.275 1.383.045 1.766-.533l.968-1.467c.18-.277.49-.447.825-.447zm.52 1.5l-.49.742c-.7 1.06-2.07 1.484-3.243.978l-.74-.314-.184.184.314.74c.506 1.173.082 2.544-.978 3.243l-.742.49v.26l.742.49c1.06.7 1.484 2.07.978 3.243l-.314.74.184.184.74-.314c1.173-.506 2.544-.082 3.243.978l.49.742h.26l.49-.742c.7-1.06 2.07-1.484 3.243-.978l.74.314.184-.184-.314-.74c-.506-1.173-.082-2.544.978-3.243l.742-.49v-.26l-.742-.49c-1.06-.7-1.484-2.07-.978-3.243l.314-.74-.184-.184-.74.314c-1.173.506-2.544.082-3.243-.978l-.49-.742h-.26zM12 8.75c1.795 0 3.25 1.455 3.25 3.25S13.795 15.25 12 15.25 8.75 13.795 8.75 12 8.75 10.205 8.75 12 8.75zm0 1.5c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75z"/></svg>
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
  const { user, unreadCount, unreadMsgCount, logout } = useAuth()
  
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
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white lg:hidden"><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3z"/></svg>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* User profile / Logout */}
      {user && (
        <div className="mt-auto w-full flex justify-center lg:block mb-4 relative group">
           <button onClick={() => { if(window.confirm('Voulez-vous vous déconnecter ?')) logout() }} className="flex items-center w-full p-3 rounded-full hover:bg-breezy-hover transition-colors text-left cursor-pointer">
             <Avatar src={user.avatar} username={user.username} size="sm" />
             <div className="hidden lg:block ml-3 overflow-hidden flex-1">
               <p className="font-bold text-[15px] truncate text-breezy-dark">{user.username}</p>
               <p className="text-breezy-muted text-[15px] truncate">@{user.username}</p>
             </div>
             <div className="hidden lg:block ml-auto text-breezy-dark">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
             </div>
           </button>
           <div className="absolute bottom-full left-0 mb-2 w-full lg:w-64 bg-white shadow-xl border border-breezy-border rounded-2xl p-2 hidden group-hover:block z-50">
             <button onClick={logout} className="w-full text-left px-4 py-3 font-bold hover:bg-breezy-hover rounded-xl text-breezy-dark">
               Se déconnecter de @{user.username}
             </button>
           </div>
        </div>
      )}
    </header>
  )
}
