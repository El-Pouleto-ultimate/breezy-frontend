'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { updateProfile, getProfile } from '@/services/userService'
import { updateUsername } from '@/services/authService'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { X, Camera } from 'lucide-react'

const BIO_MAX = 160

const CITIES = [
  'Paris, France', 'Lyon, France', 'Marseille, France', 'Toulouse, France',
  'Nice, France', 'Nantes, France', 'Strasbourg, France', 'Montpellier, France',
  'Bordeaux, France', 'Lille, France', 'Rennes, France', 'Reims, France'
]

export default function EditProfilePage() {
  const { user, setUser, saveToken } = useAuth()
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
  const [usernameError, setUsernameError] = useState('')

  const avatarInputRef = useRef(null)
  const bannerInputRef = useRef(null)

  useEffect(() => {
    if (!user?.id) return
    getProfile(user.id)
      .then(profile => {
        if (!profile) return
        setForm(prev => ({
          ...prev,
          bio: profile.bio || '',
          location: profile.location || '',
        }))
        if (profile.avatar_url) setAvatarPreview(profile.avatar_url)
        if (profile.banner_url) setBannerPreview(profile.banner_url)
      })
      .catch(() => {})
  }, [user?.id])

  const upd = f => e => {
    if (f === 'username') setUsernameError('')
    setForm(p => ({ ...p, [f]: e.target.value }))
  }

  function handleBioChange(e) {
    const val = e.target.value
    if (val.length <= BIO_MAX) setForm(p => ({ ...p, bio: val }))
  }

  function handleFileChange(setter) {
    return (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => setter(reader.result)
        reader.readAsDataURL(file)
      }
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setE('')
    setUsernameError('')
    setL(true)
    try {
      // 1. Mettre à jour le username si modifié (auth-service → retourne un nouveau JWT)
      const newUsername = form.username.trim()
      if (newUsername && newUsername !== user?.username) {
        const usernameRes = await updateUsername({ newUsername })
        // Mettre à jour le token JWT (le payload contient le nouveau username)
        if (usernameRes.token) saveToken(usernameRes.token)
        // Mettre à jour le contexte utilisateur
        setUser(prev => ({ ...prev, username: usernameRes.user.username }))
      }

      // 2. Mettre à jour le profil enrichi (profil-service)
      await updateProfile(user?.id, {
        display_name: newUsername || user?.username,
        bio: form.bio,
        avatar_url: avatarPreview,
        banner_url: bannerPreview,
        location: form.location,
      })

      router.back()
    } catch (err) {
      const code = err?.response?.data?.error?.code
      const msg  = err?.response?.data?.error?.message
      if (code === 'USERNAME_TAKEN') {
        setUsernameError(msg || 'Ce nom d\'utilisateur est déjà pris.')
      } else {
        setE(msg || 'Impossible de sauvegarder les modifications.')
      }
    } finally { setL(false) }
  }

  const bioLeft = BIO_MAX - form.bio.length

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-breezy-border">
        <button onClick={() => router.back()} className="text-breezy-dark font-medium">
          <X size={24} />
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
        className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 relative z-10 cursor-pointer hover:brightness-90 transition-all group"
      >
        {bannerPreview && <img src={bannerPreview} className="w-full h-full object-cover" alt="Banner" />}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
            <Camera size={18} />
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="px-4 -mt-10 mb-4 z-20 relative">
        <div onClick={() => avatarInputRef.current?.click()} className="relative inline-block cursor-pointer group">
          <Avatar src={avatarPreview} username={user?.username || '?'} size="xl" className="ring-4 ring-white" />
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-full p-1.5 backdrop-blur-sm">
              <Camera size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="px-4 flex flex-col gap-5 flex-1" onSubmit={handleSave}>
        <Input
          label="Nom d'utilisateur"
          type="text"
          value={form.username}
          onChange={upd('username')}
          placeholder="ex: mon_pseudo"
          disabled={loading}
          error={usernameError}
        />

        {/* Bio avec compteur */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-breezy-dark">Biographie</label>
            <span className={`text-xs ${bioLeft <= 20 ? 'text-red-500' : 'text-breezy-muted'}`}>
              {form.bio.length}/{BIO_MAX}
            </span>
          </div>
          <textarea
            value={form.bio}
            onChange={handleBioChange}
            placeholder="Parlez de vous..."
            rows={3}
            maxLength={BIO_MAX}
            className="bg-breezy-bg rounded-2xl px-4 py-3.5 text-sm text-breezy-dark placeholder:text-breezy-muted outline-none border border-transparent focus:border-breezy-primary transition-colors resize-none"
            disabled={loading}
          />
        </div>

        {/* Localisation */}
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