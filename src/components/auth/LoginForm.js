// LoginForm.jsx
// Formulaire de connexion (Fx2).
// Wireframe de référence : Sign_In_1.png

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../services/authService";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const { setUser, saveToken } = useAuth();
  const navigate = useNavigate();

  function validate() {
    if (!email.trim() || !password.trim()) {
      setError("Tous les champs sont obligatoires.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Adresse email invalide.");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await login({ email, password });
      saveToken(data.token);
      setUser(data.user);
      navigate("/home");
    } catch (err) {
      setError(err?.response?.data?.message || "Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-semibold text-breezy-dark">Se connecter</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-breezy-dark">
            Courriel
          </label>
          <Input
            id="email"
            type="email"
            placeholder="écrire ici"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-breezy-dark">
            Mot de passe
          </label>
          <Input
            id="password"
            type="password"
            placeholder="écrire ici"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button type="submit" loading={loading} className="w-full mt-1">
          Se connecter
        </Button>
      </form>

      <p className="text-sm text-center text-breezy-muted">
        Pas encore de compte ?{" "}
        <Link to="/register" className="font-medium text-breezy-dark underline underline-offset-2">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
