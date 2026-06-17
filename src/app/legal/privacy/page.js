'use client'
import { useRouter } from 'next/navigation'

export default function PrivacyPolicyPage() {
  const router = useRouter()
  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen bg-white">
      <button onClick={() => router.back()} className="text-breezy-primary hover:underline mb-8 block font-medium">
        &larr; Retour
      </button>
      <h1 className="text-3xl font-bold mb-4 text-breezy-dark">Politique de confidentialité</h1>
      <p className="text-breezy-muted leading-relaxed">
        Chez Breezy, nous prenons votre confidentialité au sérieux.
      </p>
    </div>
  )
}