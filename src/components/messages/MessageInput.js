'use client'
import { useState } from 'react'
import { Send } from 'lucide-react'

export default function MessageInput({ onSend }) {
  const [text, setT] = useState('')

  function handleSend(e) {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setT('')
  }

  return (
    <form onSubmit={handleSend} className="border-t border-breezy-border px-3 py-2 flex items-center gap-2 bg-white">
      <input
        value={text}
        onChange={e => setT(e.target.value)}
        placeholder="Nouveau message"
        className="flex-1 bg-breezy-bg rounded-full px-4 py-2 text-sm outline-none text-breezy-dark placeholder:text-breezy-muted"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="text-breezy-primary disabled:opacity-30 transition-opacity p-2"
      >
        <Send size={18} />
      </button>
    </form>
  )
}
