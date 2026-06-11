export default function Spinner({ size='md' }) {
  const s = { sm:'w-4 h-4', md:'w-6 h-6', lg:'w-8 h-8' }[size]
  return <div className={`${s} rounded-full border-2 border-breezy-border border-t-breezy-dark animate-spin`} />
}
