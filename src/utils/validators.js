export const isValidEmail    = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
export const isValidPassword = (p) => typeof p === 'string' && p.length >= 6
export const isValidUsername = (u) => typeof u === 'string' && u.trim().length >= 2

export function validateRegisterForm({ email, password, username }) {
  const errors = {}
  if (!email?.trim())           errors.email = "L'email est requis."
  else if (!isValidEmail(email)) errors.email = 'Format invalide.'
  if (!password?.trim())              errors.password = 'Le mot de passe est requis.'
  else if (!isValidPassword(password)) errors.password = 'Minimum 6 caractères.'
  if (!username?.trim())              errors.username = "Le nom est requis."
  return errors
}
