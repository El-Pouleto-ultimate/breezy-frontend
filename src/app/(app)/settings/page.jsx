'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
  const router = useRouter()
  const { logout, user } = useAuth()
  const [activeSection, setActiveSection] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleLogout() {
    logout()
    router.push('/signin')
  }

  function handleChangePassword(e) {
    e.preventDefault()
    setMessage('Mot de passe mis à jour avec succès.')
    setTimeout(() => {
      setActiveSection(null)
      setMessage('')
      setOldPassword('')
      setNewPassword('')
    }, 2000)
  }

  return (
    <AppShell title="Paramètres">
      <div className="flex flex-col h-full bg-breezy-bg min-h-screen">
        <div className="bg-white border-b border-breezy-border px-4 py-6">
          <h2 className="text-xl font-bold text-breezy-dark mb-1">Compte</h2>
          <p className="text-sm text-breezy-muted">Gérer les informations de votre compte.</p>
        </div>

        <div className="bg-white border-b border-breezy-border mt-2">
          {activeSection === null ? (
            <>
              <div onClick={() => setActiveSection('info')} className="px-4 py-4 border-b border-breezy-border hover:bg-breezy-hover cursor-pointer transition-colors">
                <span className="font-medium text-breezy-dark text-sm">Informations du compte</span>
                <p className="text-xs text-breezy-muted mt-0.5">Voir les informations de votre compte comme votre adresse email.</p>
              </div>
              <div onClick={() => setActiveSection('password')} className="px-4 py-4 border-b border-breezy-border hover:bg-breezy-hover cursor-pointer transition-colors">
                <span className="font-medium text-breezy-dark text-sm">Changer de mot de passe</span>
                <p className="text-xs text-breezy-muted mt-0.5">Modifiez votre mot de passe actuel.</p>
              </div>
              <div
                onClick={handleLogout}
                className="px-4 py-4 hover:bg-red-50 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-red-600 text-sm">Déconnexion</span>
                  <p className="text-xs text-red-400 mt-0.5">Vous serez déconnecté de @{user?.username || 'utilisateur'}</p>
                </div>
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                  <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
                </svg>
              </div>
            </>
          ) : activeSection === 'info' ? (
            <div className="p-4">
              <button onClick={() => setActiveSection(null)} className="text-breezy-primary text-sm mb-4 hover:underline">&larr; Retour</button>
              <h3 className="font-bold mb-4">Informations du compte</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-breezy-muted">Nom d'utilisateur</label>
                  <p className="text-sm font-medium">@{user?.username}</p>
                </div>
                <div>
                  <label className="text-xs text-breezy-muted">Email</label>
                  <p className="text-sm font-medium">{user?.email}</p>
                </div>
              </div>
            </div>
          ) : activeSection === 'password' ? (
            <div className="p-4">
              <button onClick={() => setActiveSection(null)} className="text-breezy-primary text-sm mb-4 hover:underline">&larr; Retour</button>
              <h3 className="font-bold mb-4">Changer de mot de passe</h3>
              <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
                <input type="password" placeholder="Mot de passe actuel" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="border rounded-lg px-3 py-2 text-sm" />
                <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="border rounded-lg px-3 py-2 text-sm" />
                {message && <p className="text-sm text-green-600">{message}</p>}
                <button type="submit" className="bg-breezy-primary text-white rounded-full py-2 text-sm font-bold mt-2">Enregistrer</button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </AppShell>
  )
}
