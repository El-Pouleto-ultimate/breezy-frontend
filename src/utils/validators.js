export const isValidEmail    = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
export const isValidPassword = (p) => typeof p === 'string' && p.length >= 6
export const isValidUsername = (u) => typeof u === 'string' && u.trim().length >= 2

export function validateRegisterForm(form) {
  const errors = {}

  // Validation du nom d'utilisateur
  if (!form.username || !form.username.trim()) {
    errors.username = "Le nom d'utilisateur est requis."
  }

  // Validation de l'email
  if (!form.email || !form.email.trim()) {
    errors.email = "Le courriel est requis."
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Le courriel n'est pas valide."
  }

  // ⚡ LA SÉCURITÉ : Validation du mot de passe (6 caractères min.)
  if (!form.password) {
    errors.password = "Le mot de passe est requis."
  } else if (form.password.length < 6) {
    errors.password = "Le mot de passe doit contenir au moins 6 caractères."
  }

  return errors
}
