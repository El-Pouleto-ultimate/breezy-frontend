// validators.js
// Fonctions de validation réutilisables pour les formulaires.

// Valide le format d'un email
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Valide la longueur d'un mot de passe (min 6 chars)
export function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

// Valide qu'un username n'est pas vide et ne contient pas d'espaces
export function isValidUsername(username) {
  return typeof username === "string" && username.trim().length >= 2;
}

// Retourne un objet d'erreurs pour le formulaire de register
// { email?: string, password?: string, username?: string }
export function validateRegisterForm({ email, password, username }) {
  const errors = {};
  if (!email?.trim())           errors.email = "L'email est requis.";
  else if (!isValidEmail(email)) errors.email = "Format d'email invalide.";

  if (!password?.trim())             errors.password = "Le mot de passe est requis.";
  else if (!isValidPassword(password)) errors.password = "Minimum 6 caractères.";

  if (!username?.trim())              errors.username = "Le nom d'utilisateur est requis.";
  else if (!isValidUsername(username)) errors.username = "Minimum 2 caractères, sans espaces.";

  return errors; // objet vide = formulaire valide
}
