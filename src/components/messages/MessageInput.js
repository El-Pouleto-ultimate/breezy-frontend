// MessageInput.jsx
// Champ de saisie pour les messages privés (Fx17).
//
// Props :
//   onSend : function(content) — appelée avec le texte du message

import { useState } from "react";
import Button from "../ui/Button";

export default function MessageInput({ onSend }) {
  const [text, setText]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim() || loading) return;
    setLoading(true);
    try {
      await onSend(text.trim());
      setText("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-breezy-border">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écrire un message..."
        className="
          flex-1 bg-white border border-breezy-border rounded-lg px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-breezy-dark
        "
        disabled={loading}
      />
      <Button type="submit" size="sm" disabled={!text.trim()} loading={loading}>
        Envoyer
      </Button>
    </form>
  );
}
