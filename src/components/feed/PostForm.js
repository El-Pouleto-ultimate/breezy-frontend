'use client'
import { useState, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'

const MAX = 280

export default function PostForm({ onPostCreated }) {
  const { user } = useAuth()
  const [text, setT] = useState('')
  const [mediaPreview, setMediaPreview] = useState(null)
  const [loading, setL] = useState(false)
  const [error, setError] = useState('') // État pour stocker le message d'erreur
  const fileInputRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files[0]
    setError('') // Réinitialise l'erreur au changement de fichier

    if (file) {
      // Validation : Vérifie si le fichier commence par "image/"
      if (!file.type.startsWith('image/')) {
        setError("Format non supporté. Seules les images sont autorisées.")
        setMediaPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = '' // Vide l'input
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setMediaPreview(reader.result)
      }
      reader.readAsDataURL(file)
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
      setError('') // Efface l'erreur après une publication réussie
    } finally {
      setL(false)
    }
  }

  return (
    <div className="flex gap-3 p-4 border-b border-breezy-border bg-white hidden md:flex flex-col">
      <div className="flex gap-3 w-full">
        <Avatar src={user?.avatar} username={user?.username || '?'} size="md" />

        <div className="flex-1 flex flex-col">
          <textarea
            value={text}
            onChange={e => setT(e.target.value)}
            placeholder="Quoi de neuf ?"
            className="w-full text-xl text-breezy-dark placeholder:text-breezy-muted bg-transparent outline-none resize-none min-h-[80px] leading-relaxed pt-2"
          />

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

          {/* Affichage de l'erreur */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2 mt-2 font-medium w-fit">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between border-t border-breezy-border pt-3 mt-3">
            {/* Media icons */}
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
                loading={loading}
                disabled={(!text.trim() && !mediaPreview) || over}
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