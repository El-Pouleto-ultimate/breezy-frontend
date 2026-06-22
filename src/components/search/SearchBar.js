'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Avatar from '@/components/ui/Avatar'

export default function SearchBar({ placeholder = 'Rechercher sur Breezy', autoFocus = false, onSearch, initialValue = '' }) {
  const [q, setQ] = useState(initialValue)
  const [focused, setFocused] = useState(false)
  const [recent, setRecent] = useState([])
  const router = useRouter()
  const wrapperRef = useRef(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('breezy_recent_searches') || '[]')
      setRecent(saved)
    } catch { }
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function addRecentSearch(term) {
    if (!term.trim()) return
    const updated = [term.trim(), ...recent.filter(t => t !== term.trim())].slice(0, 5)
    setRecent(updated)
    localStorage.setItem('breezy_recent_searches', JSON.stringify(updated))
  }

  function removeRecent(term, e) {
    e.stopPropagation()
    const updated = recent.filter(t => t !== term)
    setRecent(updated)
    localStorage.setItem('breezy_recent_searches', JSON.stringify(updated))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (q.trim()) {
      addRecentSearch(q)
      setFocused(false)
      router.push(`/search?q=${encodeURIComponent(q.trim())}`)
    }
  }

  function handleRecentClick(term) {
    setQ(term)
    addRecentSearch(term)
    setFocused(false)
    router.push(`/search?q=${encodeURIComponent(term)}`)
  }

  // Nettoie la saisie en retirant tous les symboles "#" en temps réel
  function handleInputChange(e) {
    const value = e.target.value
    const cleanValue = value.replace(/#/g, '')
    setQ(cleanValue)
    if (onSearch) onSearch(cleanValue)
  }

  return (
    <div className="relative px-4 py-2" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className={`flex items-center gap-3 bg-breezy-bg rounded-full px-4 py-2.5 border ${focused ? 'border-breezy-primary bg-white' : 'border-transparent'}`}>
          <svg viewBox="0 0 24 24" className={`w-4 h-4 flex-shrink-0 ${focused ? 'fill-breezy-primary' : 'fill-breezy-muted'}`}>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </svg>
          <input
            value={q}
            onChange={handleInputChange} // Changement appliqué ici
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="flex-1 bg-transparent text-sm text-breezy-dark placeholder:text-breezy-muted outline-none"
          />
          {q && (
            <button type="button" onClick={() => setQ('')} className="p-1 rounded-full bg-breezy-primary text-white flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z" /></svg>
            </button>
          )}
        </div>
      </form>

      {/* Pour les recherches récentes */}
      {focused && recent.length > 0 && !q && (
        <div className="absolute top-full left-0 right-0 mt-1 mx-4 bg-white rounded-xl shadow-lg border border-breezy-border overflow-hidden z-50">
          <div className="flex justify-between items-center px-4 py-3 border-b border-breezy-border">
            <span className="font-bold text-lg text-breezy-dark">Récents</span>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); setRecent([]); localStorage.setItem('breezy_recent_searches', '[]'); }}
              className="text-sm text-breezy-primary hover:underline"
            >
              Effacer tout
            </button>
          </div>
          <ul>
            {recent.map((term, i) => (
              <li
                key={i}
                className="flex items-center justify-between px-4 py-3 hover:bg-breezy-hover cursor-pointer"
                onMouseDown={(e) => { e.preventDefault(); handleRecentClick(term); }}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-breezy-bg flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-breezy-muted"><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" /></svg>
                  </div>
                  <span className="text-sm font-medium text-breezy-dark truncate">{term}</span>
                </div>
                <button
                  type="button"
                  onMouseDown={(e) => removeRecent(term, e)}
                  className="p-2 text-breezy-primary hover:bg-blue-50 rounded-full"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z" /></svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}