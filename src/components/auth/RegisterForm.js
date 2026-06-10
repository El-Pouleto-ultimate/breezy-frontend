// RegisterForm.jsx
// Formulaire de création de compte (Fx1).
// Wireframe de référence : Register_1.png

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { register } from "../../services/authService";
import { validateRegisterForm } from "../../utils/validators";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm() {
  const [form, setForm]       = useState({ email: "", password: "", username: "" });
  const [errors, setErrors]   = useState({});  // erreurs par champ
  const [apiError, setApiError] = useState(""); // erreur globale API
  const [loading, setLoading] = useState(false);

  const { setUser, saveToken } = useAuth();
  const navigate = useNavigate();

  // Met à jour un champ du formulaire sans écraser les autres
  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");

    // Validation — retourne un objet { champ: "message" }
    const fieldErrors = validateRegisterForm(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const data = await register(form);
      saveToken(data.token);
      setUser(data.user);
      navigate("/home");
    } catch (err) {
      setApiError(err?.response?.data?.message || "Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-semibold text-breezy-dark">Créer un compte</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium text-breezy-dark">
            Nom d'utilisateur
          </label>
          <Input
            id="username"
            type="text"
            placeholder="écrire ici"
            value={form.username}
            onChange={handleChange("username")}
            error={errors.username}
            disabled={loading}
            autoComplete="username"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reg-email" className="text-sm font-medium text-breezy-dark">
            Courriel
          </label>
          <Input
            id="reg-email"
            type="email"
            placeholder="écrire ici"
            value={form.email}
            onChange={handleChange("email")}
            error={errors.email}
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reg-password" className="text-sm font-medium text-breezy-dark">
            Mot de passe
          </label>
          <Input
            id="reg-password"
            type="password"
            placeholder="écrire ici"
            value={form.password}
            onChange={handleChange("password")}
            error={errors.password}
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        {apiError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {apiError}
          </p>
        )}

        <Button type="submit" loading={loading} className="w-full mt-1">
          Créer mon compte
        </Button>
      </form>

      <p className="text-sm text-center text-breezy-muted">
        Déjà un compte ?{" "}
        <Link to="/signin" className="font-medium text-breezy-dark underline underline-offset-2">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
