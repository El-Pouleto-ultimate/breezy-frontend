'use client'
import { useState, useEffect } from 'react'
import { Mail, Lock, EyeOff, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { login } from '@/services/authService'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, saveToken } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('breezy_token')) {
      router.replace('/home')
    }
  }, [router])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfoMessage('')
    if (!email.trim() || !password.trim()) { setError('Tous les champs sont requis.'); return }

    // Supprimer tout vieux token pour éviter que l'interceptor axios
    // n'envoie un header Authorization expiré avec la requête de login
    localStorage.removeItem('breezy_token')

    setLoading(true)
    try {
      const data = await login({ email, password })
      saveToken(data.token)
      setUser(data.user)
      router.replace('/home')
    } catch (err) {
      const msg = err?.response?.data?.error?.message || ''
      const code = err?.response?.data?.error?.code || ''
      if (err?.response?.status === 429) {
        setError('Trop de tentatives. Réessayez dans quelques minutes.')
      } else if (code === 'ACCOUNT_BANNED') {
        setError('Ce compte a été banni. Contactez un administrateur.')
      } else {
        setError(msg || 'Identifiants incorrects.')
      }
    } finally { setLoading(false) }
  }

  function handleForgotPassword() {
    setError('')
    setInfoMessage('La reinitialisation de mot de passe n\'est pas encore disponible. Contactez un administrateur.')
  }

  return (

    <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto w-full px-4">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-breezy-border/40 px-8 py-8">
        <Link href="/connect" className="text-breezy-primary hover:underline text-sm mb-4 inline-block">&larr; Retour</Link>
        <Link href="/">
          <h1 className="text-2xl font-black text-center text-breezy-dark mb-1 tracking-tight">Breezy</h1>
        </Link>
        <div className="h-px bg-breezy-border mb-8" />

        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-breezy-dark mb-1">Connexion sécurisée</h2>
          <p className="text-breezy-muted text-sm mb-8">Accédez à votre espace Breezy.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-breezy-dark mb-1.5 block">Courriel</label>
              <Input
                type="email" placeholder="nom@exemple.com"
                value={email} onChange={e => setEmail(e.target.value)}
                icon={<Mail size={16} />} disabled={loading} autoComplete="email"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-breezy-dark">Mot de passe</label>
                <button type="button" onClick={handleForgotPassword} className="text-sm text-breezy-primary hover:underline bg-transparent border-0 p-0 cursor-pointer">Oublié ?</button>
              </div>
              <Input
                type={showPw ? 'text' : 'password'} placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                icon={<Lock size={16} />} rightIcon={<span onClick={() => setShowPw(!showPw)} className="cursor-pointer">{showPw ? <Eye size={16} className="text-breezy-muted" /> : <EyeOff size={16} className="text-breezy-muted" />}</span>}
                disabled={loading} autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2.5">{error}</p>}
            {infoMessage && <p className="text-sm text-breezy-primary bg-blue-50/70 border border-blue-100 rounded-xl px-4 py-2.5">{infoMessage}</p>}

            <Button type="submit" variant="primary_pill" loading={loading} className="mt-2 text-base">
              Se connecter
            </Button>
          </form>

          <p className="text-center text-sm text-breezy-muted mt-6">
            Nouveau sur Breezy ?{' '}
            <Link href="/register" className="font-bold text-breezy-dark">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  )
}