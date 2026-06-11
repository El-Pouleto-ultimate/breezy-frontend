'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function HomeIcon({ filled }) {
  return filled
    ? <svg viewBox="0 0 24 24" className="w-6 h-6 fill-breezy-dark"><path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4 19.6c0 .5.45.9 1 .9h14c.55 0 1-.4 1-.9l.93-11.05.815.44c.364.197.82.06 1.017-.304.196-.365.06-.82-.302-1.016zm-7.032 11.43H8.57v-5.43h6.86v5.43zm2 0h-1v-5.43c0-.5-.45-.9-1-.9h-6.86c-.55 0-1 .4-1 .9v5.43H7.57L6.61 9.84 12 7.01l5.39 2.83-.962 9.16z"/></svg>
    : <svg viewBox="0 0 24 24" className="w-6 h-6 fill-breezy-muted"><path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1zm0 2.69l6 5.4V19h-2v-6H8v6H6v-8.8l6-5.41z"/></svg>
}
function SearchIcon({ filled }) {
  return <svg viewBox="0 0 24 24" className={`w-6 h-6 ${filled ? 'fill-breezy-dark' : 'fill-breezy-muted'}`}><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"/></svg>
}
function BellIcon({ filled, dot }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" className={`w-6 h-6 ${filled ? 'fill-breezy-dark' : 'fill-breezy-muted'}`}><path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.798c-1.308 0-2.387-.88-2.694-2.105h5.39c-.308 1.224-1.387 2.105-2.696 2.105zm-6.777-3.61c.702-1.158 1.378-3.016 1.348-5.888-.024-2.138.688-4.036 2.01-5.37 1.09-1.104 2.567-1.714 4.164-1.72 1.597.006 3.075.616 4.166 1.72 1.32 1.334 2.034 3.232 2.012 5.37-.03 2.88.636 4.73 1.342 5.888H5.223z"/></svg>
      {dot && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-breezy-primary rounded-full" />}
    </div>
  )
}
function MailIcon({ filled }) {
  return <svg viewBox="0 0 24 24" className={`w-6 h-6 ${filled ? 'fill-breezy-dark' : 'fill-breezy-muted'}`}><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.638V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.697l-7.75 3.523c-.145.066-.31.066-.455 0L3.998 10.7V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-7.803z"/></svg>
}

const LINKS = [
  { href: '/home', icon: HomeIcon },
  { href: '/search', icon: SearchIcon },
  { href: '/notifications', icon: BellIcon, dot: true },
  { href: '/messages', icon: MailIcon },
]

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-breezy-border flex items-center justify-around h-14 pb-safe">
      {LINKS.map(({ href, icon: Icon, dot }) => {
        const active = path === href || path.startsWith(href + '/')
        return (
          <Link key={href} href={href} className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-breezy-hover transition-colors">
            <Icon filled={active} dot={dot && path !== href} />
          </Link>
        )
      })}
    </nav>
  )
}
