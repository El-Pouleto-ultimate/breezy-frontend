// MessagesPage.jsx
// Page Messages privés (Fx17).
// Layout deux colonnes : liste des conversations à gauche, fil actif à droite.

import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import ConversationList from "../components/messages/ConversationList";
import MessageThread from "../components/messages/MessageThread";
import MessageInput from "../components/messages/MessageInput";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv]       = useState(null);
  const [messages, setMessages]           = useState([]);
  const [loadingConvs, setLoadingConvs]   = useState(false);
  const [loadingMsgs, setLoadingMsgs]     = useState(false);

  // Charge la liste des conversations au montage
  useEffect(() => {
    setLoadingConvs(true);
    api.get("/messages/conversations")
      .then((res) => setConversations(res.data.conversations || []))
      .finally(() => setLoadingConvs(false));
  }, []);

  // Charge les messages quand une conversation est sélectionnée
  useEffect(() => {
    if (!activeConv) return;
    setLoadingMsgs(true);
    api.get(`/messages/conversations/${activeConv.id}`)
      .then((res) => setMessages(res.data.messages || []))
      .finally(() => setLoadingMsgs(false));
  }, [activeConv]);

  // Envoie un message dans la conversation active
  async function handleSend(content) {
    const res = await api.post(`/messages/conversations/${activeConv.id}`, { content });
    setMessages((prev) => [...prev, res.data]);
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold text-breezy-dark mb-5">Messages</h1>

      {/* Layout deux colonnes */}
      <div className="flex border border-breezy-border rounded-xl overflow-hidden bg-breezy-card" style={{ height: "70vh" }}>

        {/* ── Colonne gauche : liste des conversations ── */}
        <div className="w-64 flex-shrink-0">
          {loadingConvs
            ? <div className="flex justify-center p-8"><Spinner /></div>
            : (
              <ConversationList
                conversations={conversations}
                activeId={activeConv?.id}
                onSelectConversation={setActiveConv}
              />
            )
          }
        </div>

        {/* ── Colonne droite : fil de messages ── */}
        <div className="flex-1 flex flex-col border-l border-breezy-border">
          {!activeConv ? (
            // Aucune conversation sélectionnée
            <div className="flex-1 flex items-center justify-center text-sm text-breezy-muted">
              Sélectionne une conversation
            </div>
          ) : loadingMsgs ? (
            <div className="flex-1 flex items-center justify-center"><Spinner /></div>
          ) : (
            <>
              {/* En-tête : nom de l'interlocuteur */}
              <div className="px-4 py-3 border-b border-breezy-border font-medium text-sm text-breezy-dark">
                {activeConv.otherUser?.username}
              </div>

              {/* Messages */}
              <MessageThread messages={messages} currentUserId={user?.id} />

              {/* Zone de saisie */}
              <MessageInput onSend={handleSend} />
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
