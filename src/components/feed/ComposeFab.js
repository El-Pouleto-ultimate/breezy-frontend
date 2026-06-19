'use client'
import Link from 'next/link'

export default function ComposeFab() {
  return (
    <Link
      href="/compose"
      className="md:hidden fixed bottom-20 right-4 z-40 w-14 h-14 bg-breezy-dark text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black active:scale-95 transition-all"
      aria-label="Nouveau post"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C17.95 12.24 18 12.15 18 12c0-2.598-.54-4.187-1.5-5.7V8H13c-2.17 0-3.63 1.08-4.71 2.72C6.97 13.26 6 16.07 6 19c0 1.657.17 3.03.5 4 .12.37.38.51.56.53C8.31 23.67 9 22.5 9 22c0-4.97 4.03-9 9-9h-2V11z"/>
      </svg>
    </Link>
  )
}