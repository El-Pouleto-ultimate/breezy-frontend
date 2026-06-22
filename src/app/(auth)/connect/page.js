'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'breezy_token'

export default function ConnectPage() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(TOKEN_KEY)) {
      router.replace('/home')
    } else {
      setChecked(true)
    }
  }, [router])

  if (!checked) return null
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left side: hero graphic for desktop */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-breezy-primary overflow-hidden relative">
        <svg viewBox="0 0 24 24" className="absolute w-[150%] h-[150%] fill-white opacity-20">
          <path d="M5.636 18.364A9 9 0 1 1 18.364 5.636 9 9 0 0 1 5.636 18.364zm12.02-1.41A7.5 7.5 0 1 0 6.344 7.047a7.5 7.5 0 0 0 11.312 9.907zm-9.197-5.987c.568.917 1.02 1.32 1.694 1.59.676.27 1.64.37 3.097.31l.084.043c.022.226-.028.66-.254 1.13-.2.42-.562.88-1.126 1.26-.56.38-1.314.69-2.336.79-.93.09-1.633-.08-2.15-.4-.517-.32-.85-.79-1.02-1.38-.336-1.19.012-2.68.76-4l.26.43c-.47.82-.69 1.87-.51 2.7.177.83.68 1.46 1.5 1.46z" />
        </svg>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-8 py-16">
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Logo circle */}
          <div className="w-16 h-16 bg-breezy-dark rounded-full flex items-center justify-center mb-8">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M5.636 18.364A9 9 0 1 1 18.364 5.636 9 9 0 0 1 5.636 18.364zm12.02-1.41A7.5 7.5 0 1 0 6.344 7.047a7.5 7.5 0 0 0 11.312 9.907zm-9.197-5.987c.568.917 1.02 1.32 1.694 1.59.676.27 1.64.37 3.097.31l.084.043c.022.226-.028.66-.254 1.13-.2.42-.562.88-1.126 1.26-.56.38-1.314.69-2.336.79-.93.09-1.633-.08-2.15-.4-.517-.32-.85-.79-1.02-1.38-.336-1.19.012-2.68.76-4l.26.43c-.47.82-.69 1.87-.51 2.7.177.83.68 1.46 1.5 1.46z" />
            </svg>
          </div>

          <h1 className="text-4xl font-black text-breezy-dark tracking-tight mb-3">Breezy</h1>
          <p className="text-center text-breezy-muted mb-12 leading-relaxed">
            L'essentiel, tout simplement.
          </p>

          <div className="w-full flex flex-col gap-4">
            <Link href="/register" className="w-full">
              <Button variant="primary_pill" className="text-base">Créer un compte</Button>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-breezy-border" />
              <span className="text-sm text-breezy-muted">ou</span>
              <div className="flex-1 h-px bg-breezy-border" />
            </div>

            <Link href="/signin" className="w-full">
              <Button variant="secondary_pill" className="text-base">S'authentifier</Button>
            </Link>
          </div>

          <p className="mt-10 text-xs text-breezy-muted text-center leading-relaxed px-4">
            En vous inscrivant, vous acceptez nos{' '}
            <Link href="/legal/terms" className="text-breezy-primary hover:underline">Conditions d'utilisation</Link>
            {' '}et notre{' '}
            <Link href="/legal/privacy" className="text-breezy-primary hover:underline">Politique de confidentialité</Link>
            , y compris l'utilisation de cookies.
          </p>

          <div className="mt-4 text-xs text-breezy-muted text-center flex flex-wrap justify-center gap-x-3 gap-y-1 px-4">
            <Link href="/legal/cookies" className="hover:underline">Politique relative aux cookies</Link>
            <Link href="/legal/accessibility" className="hover:underline">Accessibilité</Link>
            <Link href="/legal/ads" className="hover:underline">Informations sur les annonces</Link>
            <span>© 2026 Breezy Corp.</span>
          </div>

        </div>
      </div>
    </div>
  )
}
