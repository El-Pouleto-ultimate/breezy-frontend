'use client'
import SearchBar from '@/components/search/SearchBar'
import Link from 'next/link'

const TRENDS = [
  { cat: 'Technologie · Tendances', tag: '#DesignSystem', count: '12.5k posts' },
  { cat: 'Art · Tendances', tag: 'Minimalisme', count: '8,402 posts' },
  { cat: 'Lifestyle · Tendances', tag: '#CoffeeCulture', count: '5,120 posts' },
]

export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-[350px] shrink-0 pl-8 py-2 sticky top-0 h-screen overflow-y-auto pb-safe">
      <div className="sticky top-0 bg-white z-10 pt-1 pb-2">
        <SearchBar autoFocus={false} />
      </div>

      <div className="bg-breezy-bg rounded-2xl overflow-hidden mt-4">
        <h2 className="text-[20px] font-black text-breezy-dark px-4 py-3">Tendances pour vous</h2>
        <div className="flex flex-col">
          {TRENDS.map(t => (
            <div key={t.tag} className="flex items-start justify-between py-3 cursor-pointer hover:bg-gray-200/50 px-4 transition-colors">
              <div>
                <p className="text-xs text-breezy-muted">{t.cat}</p>
                <p className="font-bold text-[15px] text-breezy-dark mt-0.5">{t.tag}</p>
                <p className="text-xs text-breezy-muted mt-0.5">{t.count}</p>
              </div>
              <button className="text-breezy-muted p-1 hover:text-breezy-primary rounded-full hover:bg-blue-50 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" /></svg>
              </button>
            </div>
          ))}
          <button className="text-breezy-primary p-4 text-[15px] hover:bg-gray-200/50 transition-colors text-left w-full">
            Voir plus
          </button>
        </div>
      </div>

      <div className="text-[13px] text-breezy-muted flex flex-wrap gap-x-3 gap-y-1 mt-4 px-4 leading-relaxed">
        <Link href="/legal/terms" className="hover:underline">Conditions d'utilisation</Link>
        <Link href="/legal/privacy" className="hover:underline">Politique de confidentialité</Link>
        <Link href="/legal/privacy" className="hover:underline">Politique relative aux cookies</Link>
        <a href="#" className="hover:underline">Accessibilité</a>
        <a href="#" className="hover:underline">Informations sur les annonces</a>
        <span>© 2026 Breezy Corp.</span>
      </div>
    </aside>
  )
}
