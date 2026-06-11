'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar({ placeholder='Rechercher sur Breezy', autoFocus=false }) {
  const [q, setQ] = useState('')
  const router = useRouter()

  function handleSubmit(e) {
    e.preventDefault()
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-2">
      <div className="flex items-center gap-3 bg-breezy-bg rounded-full px-4 py-2.5">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted flex-shrink-0">
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"/>
        </svg>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="flex-1 bg-transparent text-sm text-breezy-dark placeholder:text-breezy-muted outline-none"
        />
      </div>
    </form>
  )
}
