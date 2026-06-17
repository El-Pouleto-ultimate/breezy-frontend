'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Spinner from '@/components/ui/Spinner'

export default function AppLayout({ children }) {
  const { token, loading } = useAuth()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  // On attend que l'authentification ait fait son premier check
  useEffect(() => {
    if (!loading) {
      setIsReady(true)
    }
  }, [loading])

  // Redirection sécurisée
  useEffect(() => {
    if (isReady && !loading && !token) {
      router.replace('/connect')
    }
  }, [token, loading, isReady, router])

  if (loading || !isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-breezy-bg">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!token) return null

  return <>{children}</>
}