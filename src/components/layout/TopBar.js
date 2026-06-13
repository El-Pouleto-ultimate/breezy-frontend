'use client'
import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'

function SettingsIcon() {
  return <svg viewBox="0 0 24 24" className="w-6 h-6 fill-breezy-muted"><path d="M10.54 2.751l.53-.02c.337 0 .645.17.825.447l.968 1.467c.382.578 1.13.808 1.765.533l1.615-.683c.31-.132.666-.085.93.124l.822.657.343.363c.209.265.256.62.124.93l-.683 1.614c-.275.636-.045 1.383.533 1.766l1.467.968c.277.18.447.49.447.825v.53c0 .05-.003.1-.01.149l.01-.002v.53c0 .337-.17.645-.447.825l-1.467.968c-.578.383-.808 1.13-.533 1.766l.683 1.614c.132.31.085.665-.124.93l-.657.822-.363.343c-.265.209-.62.256-.93.124l-1.615-.683c-.635-.275-1.383-.045-1.765.533l-.968 1.467c-.18.277-.49.447-.825.447h-.53c-.05 0-.1-.003-.149-.01l.002.01h-.53c-.337 0-.645-.17-.825-.447l-.968-1.467c-.383-.578-1.13-.808-1.766-.533l-1.614.683c-.31.132-.665.085-.93-.124l-.822-.657-.343-.363c-.209-.265-.256-.62-.124-.93l.683-1.614c.275-.636.045-1.383-.533-1.766l-1.467-.968c-.277-.18-.447-.49-.447-.825v-.53c0-.05.003-.1.01-.149l-.01.002v-.53c0-.337.17-.645.447-.825l1.467-.968c.578-.383.808-1.13.533-1.766l-.683-1.614c-.132-.31-.085-.666.124-.93l.657-.822.363-.343c.265-.209.62-.256.93-.124l1.614.683c.636.275 1.383.045 1.766-.533l.968-1.467c.18-.277.49-.447.825-.447zm.52 1.5l-.49.742c-.7 1.06-2.07 1.484-3.243.978l-.74-.314-.184.184.314.74c.506 1.173.082 2.544-.978 3.243l-.742.49v.26l.742.49c1.06.7 1.484 2.07.978 3.243l-.314.74.184.184.74-.314c1.173-.506 2.544-.082 3.243.978l.49.742h.26l.49-.742c.7-1.06 2.07-1.484 3.243-.978l.74.314.184-.184-.314-.74c-.506-1.173-.082-2.544.978-3.243l.742-.49v-.26l-.742-.49c-1.06-.7-1.484-2.07-.978-3.243l.314-.74-.184-.184-.74.314c-1.173.506-2.544.082-3.243-.978l-.49-.742h-.26zM12 8.75c1.795 0 3.25 1.455 3.25 3.25S13.795 15.25 12 15.25 8.75 13.795 8.75 12 10.205 8.75 12 8.75zm0 1.5c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75z"/></svg>
}

export default function TopBar({ title, backHref, rightSlot }) {
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-breezy-border md:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: avatar or back */}
        <div className="w-10">
          {backHref
            ? <Link href={backHref} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-breezy-hover">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-breezy-dark"><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"/></svg>
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
              <SettingsIcon />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
