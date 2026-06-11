// truncate.js
// Utilitaire pour valider et tronquer le contenu d'un post (Fx3 — 280 chars max).

export const MAX_POST_LENGTH = 280;

// Retourne le nombre de caractères restants (peut être négatif si dépassé)
export function charsLeft(text) {
  return MAX_POST_LENGTH - (text?.length || 0);
}

// Retourne true si le texte est dans la limite
export function isWithinLimit(text) {
  return charsLeft(text) >= 0;
}

// Tronque le texte à la limite (utilisé si on veut forcer la limite)
export function truncate(text) {
  return text.slice(0, MAX_POST_LENGTH);
}
