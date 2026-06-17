import Link from 'next/link'

export default function AdsPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen bg-white">
      <Link href="/home" className="text-breezy-primary hover:underline mb-8 block font-medium">
        &larr; Retour
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-breezy-dark">Informations sur les annonces</h1>
      <p className="text-breezy-muted leading-relaxed">
        Breezy n'affiche pas de publicités. Cette page est un espace réservé.
      </p>
    </div>
  )
}