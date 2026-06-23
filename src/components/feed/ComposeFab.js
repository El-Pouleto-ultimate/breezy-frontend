'use client'
import Link from 'next/link'
import { Feather } from 'lucide-react'

export default function ComposeFab() {
  return (
    <Link
      href="/compose"
      className="md:hidden fixed bottom-20 right-4 z-40 w-14 h-14 bg-breezy-dark text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black active:scale-95 transition-all"
      aria-label="Nouveau post"
    >
      <Feather size={24} />
    </Link>
  )
}