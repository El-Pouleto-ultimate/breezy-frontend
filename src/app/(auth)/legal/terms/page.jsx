import Link from 'next/link'
export default function TermsOfUsePage() {
  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen">
      <Link href="/connect" className="text-breezy-primary hover:underline mb-8 block">&larr; Retour</Link>
      <h1 className="text-3xl font-bold mb-4">Conditions d'utilisation</h1>
      <p className="text-breezy-dark leading-relaxed">
        En utilisant Breezy, vous acceptez de respecter nos directives communautaires. Ne postez pas de contenu illégal ou inapproprié. Cette page est un espace réservé pour les conditions d'utilisation complètes.
      </p>
    </div>
  )
}
