'use client'
import SearchBar from '@/components/search/SearchBar'
import Link from 'next/link'

export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-[350px] shrink-0 pl-8 py-2 sticky top-0 h-screen overflow-y-auto pb-safe">
      {/* Barre de recherche (La loupe) */}
      <div className="sticky top-0 bg-white z-10 pt-1 pb-2">
        <SearchBar autoFocus={false} />
      </div>

      {/* Le bloc "Tendances pour vous" a été supprimé d'ici */}

      {/* Liens légaux */}
      <div className="text-[13px] text-breezy-muted flex flex-wrap gap-x-3 gap-y-1 mt-4 px-4 leading-relaxed">
        <Link href="/legal/terms" className="hover:underline">Conditions d&apos;utilisation</Link>
        <Link href="/legal/privacy" className="hover:underline">Politique de confidentialité</Link>
        <Link href="/legal/cookies" className="hover:underline">Politique relative aux cookies</Link>
        <Link href="/legal/accessibility" className="hover:underline">Accessibilité</Link>
        <Link href="/legal/ads" className="hover:underline">Informations sur les annonces</Link>
        <span>© 2026 Breezy Corp.</span>
      </div>
    </aside>
  )
}