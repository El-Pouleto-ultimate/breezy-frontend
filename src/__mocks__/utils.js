// ─── Helper: détecte si le mode mock est actif ────────────────────────
export const isMockEnabled = () =>
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_USE_MOCKS === 'true'

// Simule un délai réseau pour un rendu réaliste
export const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))
