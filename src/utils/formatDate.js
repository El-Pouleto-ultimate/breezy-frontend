export function timeAgo(dateString) {
  const date = new Date(dateString)
  const now  = new Date()
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60)   return `${diff}s`
  if (diff < 3600) return `${Math.floor(diff/60)}m`
  if (diff < 86400) return `${Math.floor(diff/3600)}h`
  return date.toLocaleDateString('fr-FR', { day:'numeric', month:'short' })
}
export function formatJoined(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', { month:'long', year:'numeric' })
}
