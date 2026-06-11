'use client'
import { useState } from 'react'

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
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M2.504 21.866l.526-2.108C3.04 19.498 4 15.5 4 12s-.96-7.498-.97-7.757L2.504 2.134 22 12 2.504 21.866zM4.981 13c-.072 1.962-.34 3.833-.583 5.183L17.88 12 4.398 5.818c.242 1.349.51 3.221.583 5.182H10v2H4.981z"/>
        </svg>
      </button>
    </form>
  )
}
