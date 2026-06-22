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

  if (!form.password) {
    errors.password = "Le mot de passe est requis."
  } else if (form.password.length < 8) {
    errors.password = "Le mot de passe doit faire au moins 8 caractères."
  } else if (!/[A-Z]/.test(form.password)) {
    errors.password = "Le mot de passe doit contenir au moins une majuscule."
  } else if (!/[0-9]/.test(form.password)) {
    errors.password = "Le mot de passe doit contenir au moins un chiffre."
  }

  return errors
}
