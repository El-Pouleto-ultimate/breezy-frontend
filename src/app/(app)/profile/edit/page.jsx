'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { updateProfile } from '@/services/userService'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const CITIES = [
  'Paris, France', 'Lyon, France', 'Marseille, France', 'Toulouse, France',
  'Nice, France', 'Nantes, France', 'Strasbourg, France', 'Montpellier, France',
  'Bordeaux, France', 'Lille, France', 'Rennes, France', 'Reims, France'
]

export default function EditProfilePage() {
  const { user, setUser } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    location: user?.location || '',
  })
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')
  const [bannerPreview, setBannerPreview] = useState(user?.banner || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&q=80')
  const [loading, setL] = useState(false)
  const [error, setE] = useState('')

  const avatarInputRef = useRef(null)
  const bannerInputRef = useRef(null)

  const upd = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  function handleFileChange(setter) {
    return (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setter(reader.result)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setE('')
    setL(true)
    try {
      const updated = await updateProfile(user?.id, {
        ...form,
        description: form.bio,
        avatar: avatarPreview,
        banner: bannerPreview
      })
      setUser(updated)
      router.back()
    } catch {
      setE('Impossible de sauvegarder les modifications.')
    } finally { setL(false) }
  }

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-breezy-border">
        <button onClick={() => router.back()} className="text-breezy-dark font-medium">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-breezy-dark">
            <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z" />
          </svg>
        </button>
        <span className="font-bold text-lg text-breezy-dark">Modifier le profil</span>
        <Button
          onClick={handleSave}
          loading={loading}
          className="bg-breezy-dark text-white text-sm font-bold px-5 py-1.5 rounded-full hover:bg-black"
        >
          Enregistrer
        </Button>
      </div>

      {/* Hidden file inputs */}
      <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleFileChange(setAvatarPreview)} />
      <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={handleFileChange(setBannerPreview)} />

      {/* Banner */}
      <div
        onClick={() => bannerInputRef.current?.click()}
        className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 relative cursor-pointer hover:brightness-90 transition-all group"
      >
        {bannerPreview && <img src={bannerPreview} className="w-full h-full object-cover" alt="Banner" />}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h2.697l2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="px-4 -mt-10 mb-4 z-10 relative">
        <div
          onClick={() => avatarInputRef.current?.click()}
          className="relative inline-block cursor-pointer group"
        >
          <Avatar src={avatarPreview} username={user?.username || '?'} size="xl" className="ring-4 ring-white" />
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-full p-1.5 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h2.697l2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="px-4 flex flex-col gap-5 flex-1" onSubmit={handleSave}>
        <Input
          label="Nom" type="text" value={form.username}
          onChange={upd('username')} placeholder="Votre nom" disabled={loading}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-breezy-dark">Biographie</label>
          <textarea
            value={form.bio}
            onChange={upd('bio')}
            placeholder="Parlez de vous..."
            rows={3}
            className="bg-breezy-bg rounded-2xl px-4 py-3.5 text-sm text-breezy-dark placeholder:text-breezy-muted outline-none border border-transparent focus:border-breezy-primary transition-colors resize-none"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-breezy-dark">Localisation</label>
          <input
            type="text"
            list="cities"
            value={form.location}
            onChange={upd('location')}
            placeholder="Paris, France"
            disabled={loading}
            className="w-full bg-breezy-bg rounded-2xl py-3.5 px-4 text-sm text-breezy-dark placeholder:text-breezy-muted outline-none border border-transparent focus:border-breezy-primary transition-colors"
          />
          <datalist id="cities">
            {CITIES.map(c => <option key={c} value={c} />)}
          </datalist>
        </div>
        {error && <p className="text-sm text-red-500 px-1">{error}</p>}
      </form>
    </div>
  )
}
