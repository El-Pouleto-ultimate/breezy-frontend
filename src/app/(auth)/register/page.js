'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { register } from '@/services/authService'
import { validateRegisterForm } from '@/utils/validators'

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [errors, setErrors] = useState({})
  const [apiErr, setApiErr] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, saveToken } = useAuth()
  const router = useRouter()

  const upd = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setApiErr('')
    const errs = validateRegisterForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const data = await register(form)
      saveToken(data.token); setUser(data.user)
      router.push('/home')
    } catch (err) {
      setApiErr(err?.response?.data?.message || 'Erreur lors de la création du compte.')
    } finally { setLoading(false) }
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
          <h2 className="text-2xl font-bold text-breezy-dark mb-8">Créer un compte</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Nom d'utilisateur" type="text" placeholder="votre_pseudo"
              value={form.username} onChange={upd('username')} error={errors.username} disabled={loading} />
            <Input label="Courriel" type="email" placeholder="nom@exemple.com"
              value={form.email} onChange={upd('email')} error={errors.email} disabled={loading} />
            <Input label="Mot de passe" type="password" placeholder="••••••••"
              value={form.password} onChange={upd('password')} error={errors.password} disabled={loading} />

            {apiErr && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2.5">{apiErr}</p>}

            <Button type="submit" variant="primary_pill" loading={loading} className="mt-2 text-base">
              Créer mon compte
            </Button>
          </form>

          <p className="text-center text-sm text-breezy-muted mt-6">
            Déjà un compte ?{' '}
            <Link href="/signin" className="font-bold text-breezy-dark">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}