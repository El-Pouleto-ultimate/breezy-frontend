import Link from 'next/link'

export default function CookiesPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen bg-white">
      <Link href="/home" className="text-breezy-primary hover:underline mb-8 block font-medium">
        &larr; Retour
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-breezy-dark">Politique relative aux cookies</h1>
      <p className="text-breezy-muted leading-relaxed">
        Breezy utilise des cookies pour améliorer votre expérience. Cette page est un espace réservé.
      </p>
    </div>
  )
}