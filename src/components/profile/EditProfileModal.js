// EditProfileModal.jsx
// Modal de modification du profil (nom, bio, avatar) (Fx10).
// S'ouvre depuis ProfileActions quand isOwn === true.
//
// Props :
//   profile   : profil actuel
//   isOpen    : boolean
//   onClose   : function
//   onSaved   : function(updatedProfile) — callback après sauvegarde

import { useState, useEffect } from "react";
import { updateProfile } from "../../services/userService";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function EditProfileModal({ profile, isOpen, onClose, onSaved }) {
  const { user } = useAuth();
  const [form, setForm]       = useState({ username: "", bio: "", avatar: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Remplit le formulaire avec les données actuelles à l'ouverture
  useEffect(() => {
    if (profile && isOpen) {
      setForm({
        username: profile.username || "",
        bio:      profile.bio      || "",
        avatar:   profile.avatar   || "",
      });
    }
  }, [profile, isOpen]);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.username.trim()) {
      setError("Le nom d'utilisateur ne peut pas être vide.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const updated = await updateProfile(user.id, form);
      if (onSaved) onSaved(updated);
      onClose();
    } catch {
      setError("Impossible de sauvegarder les modifications.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modifier le profil">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-breezy-dark">Nom d'utilisateur</label>
          <Input
            value={form.username}
            onChange={handleChange("username")}
            placeholder="Ton nom"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-breezy-dark">Biographie courte</label>
          <textarea
            value={form.bio}
            onChange={handleChange("bio")}
            placeholder="Quelques mots sur toi..."
            rows={3}
            maxLength={160}
            disabled={loading}
            className="
              bg-white border border-breezy-border rounded-lg px-3 py-2 text-sm
              resize-none focus:outline-none focus:ring-2 focus:ring-breezy-dark
            "
          />
          <span className="text-xs text-breezy-muted text-right">{form.bio.length}/160</span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-breezy-dark">URL de l'avatar</label>
          <Input
            value={form.avatar}
            onChange={handleChange("avatar")}
            placeholder="https://..."
            disabled={loading}
            type="url"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex gap-3 justify-end pt-1">
          <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button type="submit" loading={loading}>
            Sauvegarder
          </Button>
        </div>
      </form>
    </Modal>
  );
}
