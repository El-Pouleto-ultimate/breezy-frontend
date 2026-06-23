'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import api from '@/services/api'

/**
 * Hook d'autocomplétion @mentions.
 * Approche simplifiée : parse le texte à chaque changement,
 * détecte si le curseur est sur un mot commençant par @.
 */
export default function useMentions(text, onInsert) {
  const [suggestions, setSuggestions] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeQuery, setActiveQuery] = useState('')
  const [cursorPos, setCursorPos] = useState(0)
  const debounceRef = useRef(null)

  const close = useCallback(() => {
    setSuggestions([])
    setShowDropdown(false)
    setSelectedIndex(0)
    setActiveQuery('')
  }, [])

  // Appelé par le textarea à chaque onChange ET à chaque clic (pour la position du curseur)
  const onTextChange = useCallback((e) => {
    const el = e.target
    const val = el.value
    const pos = el.selectionStart
    setCursorPos(pos)

    // Trouver le début du mot courant (avant le curseur)
    const before = val.slice(0, pos)
    const atIdx = before.lastIndexOf('@')

    // Pas de @ avant le curseur
    if (atIdx === -1) { close(); return }

    // Vérifier que le @ est précédé d'espace/début de ligne
    const charBefore = atIdx === 0 ? ' ' : val[atIdx - 1]
    if (!/[\s\n]/.test(charBefore)) { close(); return }

    // Extraire la query (entre @ et le curseur)
    const q = before.slice(atIdx + 1)

    // Query vide ou contient espace → pas une mention active
    if (!q || /\s/.test(q)) { close(); return }

    setActiveQuery(q)

    // Debounce 250ms
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await api.get(`/users/search?q=${encodeURIComponent(q)}&limit=5`)
        const users = res.data?.data || []
        if (users.length > 0) {
          setSuggestions(users)
          setSelectedIndex(0)
          setShowDropdown(true)
        } else {
          close()
        }
      } catch { close() }
    }, 250)
  }, [close])

  // Nettoie le debounce au démontage
  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [])

  const selectMention = useCallback((user) => {
    const atIdx = text.slice(0, cursorPos).lastIndexOf('@')
    if (atIdx === -1) return

    const before = text.slice(0, atIdx)
    const after = text.slice(cursorPos)
    onInsert(before + '@' + user.username + ' ' + after)
    close()
  }, [text, cursorPos, onInsert, close])

  const onKeyDown = useCallback((e) => {
    if (!showDropdown || suggestions.length === 0) return

    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); selectMention(suggestions[selectedIndex]) }
    else if (e.key === 'Escape') { e.preventDefault(); close() }
  }, [showDropdown, suggestions, selectedIndex, selectMention, close])

  return { suggestions, selectedIndex, setSelectedIndex, showDropdown, onKeyDown, onTextChange, selectMention, closeSuggestions: close }
}
