'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth' // Vérifie bien si c'est @/hooks/useAuth ou @/context/AuthContext selon ton projet
import AppShell from '@/components/layout/AppShell'

import { changePassword } from '@/services/authService'

export default function SettingsPage() {
  const { logout, user } = useAuth() // On récupère logout et l'utilisateur actuel
  const router = useRouter()
  
  // États pour le formulaire de mot de passe
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await changePassword({ oldPassword, newPassword })

      setSuccess(true)
      
      // 🔒 Déconnexion de sécurité automatique après 2 secondes
      setTimeout(() => {
        logout() // Vide le token et l'utilisateur global
        router.replace('/signin') // Redirection vers la page de connexion
      }, 2000)

    } catch (err) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell backHref="/home">
      <div className="p-6 max-w-xl mx-auto space-y-8">
        
        {/* En-tête des paramètres */}
        <div>
          <h1 className="text-2xl font-bold text-breezy-dark">Paramètres</h1>
          <p className="text-sm text-breezy-muted">Gère les informations de ton compte @{user?.username}</p>
        </div>

        <hr className="border-gray-100" />

        {/* Section Sécurité / Mot de passe */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-lg font-bold text-breezy-dark">Sécurité du compte</h2>
          <p className="text-xs text-breezy-muted">Modifie ton mot de passe pour sécuriser ton accès.</p>

          {success ? (
            <div className="bg-green-50 text-green-600 p-4 rounded-xl border border-green-200 text-sm font-medium animate-pulse">
              ✨ Mot de passe modifié avec succès ! Déconnexion de sécurité en cours...
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-xs font-semibold text-breezy-muted mb-2 uppercase tracking-wider">
                  Ancien mot de passe
                </label>
                <input 
                  type="password" 
                  required
                  value={oldPassword} 
                  onChange={e => setOldPassword(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-breezy-primary focus:bg-white transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-breezy-muted mb-2 uppercase tracking-wider">
                  Nouveau mot de passe
                </label>
                <input 
                  type="password" 
                  required
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-breezy-primary focus:bg-white transition-all text-sm"
                  placeholder="Minimum 6 caractères"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-6 py-2.5 bg-breezy-dark text-white font-medium rounded-full hover:opacity-95 disabled:opacity-50 transition-all text-sm"
                >
                  {loading ? 'Mise à jour...' : 'Enregistrer le mot de passe'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Optionnel : Bouton de déconnexion directe en bas de page */}
        <hr className="border-gray-100" />
        <div className="flex justify-start">
          <button 
            onClick={() => {
              logout()
              router.replace('/signin')
            }}
            className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            Se déconnecter de Breezy
          </button>
        </div>

      </div>
    </AppShell>
  )
}