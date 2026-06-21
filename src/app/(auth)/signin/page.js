'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { login } from '@/services/authService'

function MailIcon() { return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted"><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.638V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.697l-7.75 3.523c-.145.066-.31.066-.455 0L3.998 10.7V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-7.803z" /></svg> }
function LockIcon() { return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted"><path d="M17 8h-1V6.002C16 3.784 14.215 2 12 2 9.785 2 8 3.784 8 6.002V8H7c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2zm-5 9c-.828 0-1.5-.672-1.5-1.5S11.172 14 12 14s1.5.672 1.5 1.5S12.828 17 12 17zm2-9H10V6.002C10 4.896 10.897 4 12 4s2 .896 2 2.002V8z" /></svg> }
function EyeOffIcon() { return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-breezy-muted cursor-pointer"><path d="M19.998 4.754l-1.372-1.372-2.26 2.26C15.362 5.23 13.735 5 12 5c-3.6 0-6.8 1.4-9.215 3.685L2 9.471l.793.785C4.412 11.97 6.29 13.344 8.44 14.115l-1.845 1.845-.002.002-1.37 1.37 1.37 1.37 13.405-13.406-1.4-1.542zm-5.537 5.537L11.51 13.24A2.496 2.496 0 0 1 9.5 10.75c0-.467.128-.903.352-1.276l4.61-4.61c.36.074.703.177 1.038.3l-1.54 1.54c.16.317.25.674.25 1.046 0 1.37-1.13 2.5-2.5 2.5-.372 0-.73-.09-1.046-.25l-.152.152c.356.538.965.89 1.663.89 1.1 0 2-.9 2-2 0-.698-.352-1.307-.89-1.663l1.276-1.276c.16.22.3.455.42.705l-1.423 1.423zM12 5.998c-.524 0-1.04.046-1.54.13L12 4.59l.013.013c-.003 0-.009-.001-.013-.001v-.002c0 .467.09.915.25 1.327-.082-.014-.165-.027-.25-.027V5.998zM5.012 14.38C3.666 13.39 2.5 12.19 1.598 10.81l-.78-1.16.785-.78C3.5 7.04 6.55 5.998 10.001 5.998c.24 0 .477.01.712.024L5.013 14.38z" /></svg> }

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, saveToken } = useAuth()
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault() 
    setError('')
    setInfoMessage('')
    if (!email.trim() || !password.trim()) { setError('Tous les champs sont requis.'); return }
    setLoading(true)
    try {
      const data = await login({ email, password })
      saveToken(data.token)
      setUser(data.user)
      router.replace('/home')
    } catch (err) {
      setError(err?.response?.data?.message || 'Identifiants incorrects.')
    } finally { setLoading(false) }
  }

  function handleForgotPassword() {
    if (!email.trim()) {
      setError("Veuillez saisir votre adresse email pour réinitialiser le mot de passe.");
      setInfoMessage("");
      return;
    }
    setError("");
    setInfoMessage(`Un e-mail de réinitialisation de mot de passe a été envoyé à l'adresse ${email.trim()}.`);
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
                icon={<MailIcon />} disabled={loading} autoComplete="email"
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
                icon={<LockIcon />} rightIcon={<span onClick={() => setShowPw(!showPw)}><EyeOffIcon /></span>}
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