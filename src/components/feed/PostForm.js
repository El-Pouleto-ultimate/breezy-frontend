'use client'
import { useState, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import useMentions from '@/hooks/useMentions'
import { uploadMedia } from '@/services/postService'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'

const MAX = 280

export default function PostForm({ onPostCreated }) {
  const { user } = useAuth()
  const [text, setT] = useState('')
  const [mediaPreview, setMediaPreview] = useState(null)
  const [loading, setL] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  const {
    suggestions,
    selectedIndex,
    setSelectedIndex,
    showDropdown,
    onKeyDown,
    onTextChange,
    selectMention,
  } = useMentions(text, setT)

  function handleChange(e) {
    setT(e.target.value)
    onTextChange(e)
  }

  async function handleFileChange(e) {
    const file = e.target.files[0]
    setError('')

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Format non supporté. Seules les images sont autorisées.")
        setMediaPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        return
      }

      setUploading(true)
      try {
        const url = await uploadMedia(file)
        setMediaPreview(url)
      } catch (err) {
        const msg = err?.response?.data?.error?.message || err?.message || ''
        if (err?.response?.status === 413 || msg.includes('volumineuse') || msg.includes('large')) {
          setError('Image trop volumineuse (max 5 Mo).')
        } else if (msg.includes('Format') || msg.includes('autorisé')) {
          setError('Format non supporté. Seules les images sont autorisées.')
        } else {
          setError("Erreur lors de l'upload de l'image.")
        }
        setMediaPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
      } finally {
        setUploading(false)
      }
    }
  }

  const left = MAX - text.length
  const over = left < 0

  async function publish() {
    if ((!text.trim() && !mediaPreview) || over || loading) return
    setL(true)
    try {
      if (onPostCreated) {
        await onPostCreated(text, mediaPreview)
      }
      setT('')
      setMediaPreview(null)
      setError('')
    } finally {
      setL(false)
    }
  }

  return (
    <div className="flex gap-3 p-4 border-b border-breezy-border bg-white hidden md:flex flex-col">
      <div className="flex gap-3 w-full">
        <Avatar src={user?.avatar} username={user?.username || '?'} size="md" />

        <div className="flex-1 flex flex-col relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            placeholder="Quoi de neuf ?"
            className="w-full text-xl text-breezy-dark placeholder:text-breezy-muted bg-transparent outline-none resize-none min-h-[80px] leading-relaxed pt-2"
          />

          {/* Dropdown d'autocomplétion @mentions */}
          {showDropdown && suggestions.length > 0 && (
            <div className="w-64 bg-white border border-breezy-border rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto -mt-1 mb-2">
              {suggestions.map((u, i) => (
                <button
                  key={u.id || u._id}
                  type="button"
                  onClick={() => selectMention(u)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === selectedIndex
                      ? 'bg-breezy-primary/10 text-breezy-primary'
                      : 'hover:bg-breezy-hover text-breezy-dark'
                  }`}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <Avatar src={u.avatar_url || u.avatar} username={u.username} size="sm" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">{u.username}</span>
                    {u.display_name && (
                      <span className="text-xs text-breezy-muted">{u.display_name}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          <p className="text-xs text-breezy-muted mt-1 ml-1">
            Utilisez @username pour mentionner quelqu&apos;un
          </p>

          {uploading && (
            <div className="relative mt-2 max-w-xs">
              <div className="rounded-2xl max-h-48 min-h-[100px] bg-gray-100 flex items-center justify-center">
                <span className="text-breezy-muted text-sm">Upload en cours...</span>
              </div>
            </div>
          )}

          {mediaPreview && (
            <div className="relative mt-2 max-w-xs">
              <img src={mediaPreview} alt="Preview" className="rounded-2xl max-h-48 object-cover" />
              <button
                onClick={() => setMediaPreview(null)}
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black"
                type="button"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M13.414 12l5.293-5.293-1.414-1.414L12 10.586 6.707 5.293 5.293 6.707 10.586 12l-5.293 5.293 1.414 1.414L12 13.414l5.293 5.293 1.414-1.414L13.414 12z" />
                </svg>
              </button>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2 mt-2 font-medium w-fit">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between border-t border-breezy-border pt-3 mt-3">
            <div className="flex items-center gap-1">
              <input type="file" hidden accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-breezy-primary hover:bg-blue-50 rounded-full p-2 transition-colors"
                type="button"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-sm ${over ? 'text-red-500' : 'text-breezy-muted'}`}>
                {text.length}/{MAX}
              </span>

              <Button
                onClick={publish}
                loading={loading || uploading}
                disabled={(!text.trim() && !mediaPreview) || over || uploading}
                className="bg-breezy-primary text-white text-sm font-bold px-5 py-1.5 rounded-full hover:bg-blue-600"
              >
                Poster
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
