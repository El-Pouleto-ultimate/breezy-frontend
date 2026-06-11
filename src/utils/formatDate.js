// formatDate.js
// Utilitaires pour afficher les dates de manière lisible dans les posts.

// Affiche "il y a X minutes/heures/jours" à partir d'un timestamp ISO
// Ex : "2024-01-15T10:30:00Z" → "il y a 2 heures"
export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now  = new Date();
  const diffMs = now - date;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);

  if (seconds < 60)  return "à l'instant";
  if (minutes < 60)  return `il y a ${minutes} min`;
  if (hours < 24)    return `il y a ${hours} h`;
  if (days < 7)      return `il y a ${days} j`;

  // Au-delà d'une semaine : affiche la date complète
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

// Formate une date complète en "15 jan. 2024"
export function formatFull(dateString) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
