import Link from 'next/link'
export default function PrivacyPolicyPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen">
      <Link href="/connect" className="text-breezy-primary hover:underline mb-8 block">&larr; Retour</Link>
      <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
      <p className="text-breezy-dark leading-relaxed">
        Chez Breezy, nous prenons votre confidentialité au sérieux. Nous ne partageons pas vos données avec des tiers sans votre consentement explicite. Cette page est un espace réservé pour la politique de confidentialité complète.
      </p>
    </div>
  )
}
