# 🌬️ Breezy — Next.js Frontend

Réseau social léger, inspiré de Twitter/X. Interface mobile-first, React 18 + Next.js 14 App Router.

## Stack
- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **Axios** (appels API)
- **date-fns** (formatage des dates)

## Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.local.example .env.local
# → édite NEXT_PUBLIC_API_URL avec l'URL de ton API Gateway

# 3. Démarrer en développement
npm run dev
# → http://localhost:3000
```

## Structure
```
src/
├── app/
│   ├── (auth)/          # Pages publiques: connect, signin, register
│   └── (app)/           # Pages protégées: home, search, notifications, messages, profile, compose, reply
├── components/
│   ├── ui/              # Avatar, Button, Input, Spinner
│   ├── layout/          # AppShell, TopBar, BottomNav
│   ├── feed/            # PostCard, PostList, PostActions, ComposeFab
│   ├── profile/         # ProfileHeader
│   ├── notifications/   # NotificationItem, NotificationList
│   ├── messages/        # ConversationList, MessageThread, MessageInput
│   └── search/          # SearchBar
├── hooks/               # usePosts, useLike, useFollow, useComments, useAuth
├── services/            # api.js, authService, postService, userService...
├── context/             # AuthContext
└── utils/               # formatDate, validators
```

## Pages
| Route | Description |
|-------|-------------|
| `/connect` | Landing — Créer un compte / S'authentifier |
| `/signin` | Connexion sécurisée (Fx2) |
| `/register` | Création de compte (Fx1) |
| `/home` | Fil d'actualités (Fx3, Fx5, Fx6) |
| `/search` | Recherche + tendances (Fx13) |
| `/notifications` | Notifications like/follow/mention (Fx14-16) |
| `/messages` | Messages privés (Fx17) |
| `/profile` | Profil utilisateur connecté (Fx10, Fx11) |
| `/profile/[userId]` | Profil d'un autre utilisateur (Fx9) |
| `/profile/edit` | Modifier le profil (Fx10) |
| `/compose` | Composer un post (Fx3) |
| `/reply` | Répondre à un post (Fx7) |

## Variables d'environnement
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_TOKEN_KEY=breezy_token
```
