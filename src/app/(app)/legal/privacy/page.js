'use client'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen bg-white">
      <Link href="/home" className="text-breezy-primary hover:underline mb-8 block text-left font-medium">
        &larr; Retour
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-breezy-dark">Politique de confidentialité</h1>
      <p className="text-breezy-muted leading-relaxed">
        Chez Breezy, nous prenons votre confidentialité au sérieux.
      </p>
    </div>
  )
}