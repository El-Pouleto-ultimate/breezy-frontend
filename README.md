# Breezy: web client

The web front end of [Breezy](https://github.com/El-Pouleto-ultimate/breezy-infra), a Twitter-like social
network built as microservices.

Team project at CESI École d'Ingénieurs (distributed applications, June 2026).

Stack: Next.js 14, React 18, Tailwind CSS 3, axios.

## Features

- Sign up, sign in, and sessions that refresh themselves: on a 401, the client refreshes its token once and
  retries the request.
- Home feed, posts with images, likes, reposts, replies and @mentions.
- Profiles with follow and unfollow, user search, notifications.
- Settings, admin account creation, and legal pages.

Pages: `/connect`, `/signin`, `/register`, `/home`, `/search`, `/notifications`, `/profile`, `/compose`,
`/reply`, `/settings`, `/legal/*`. The `/messages` page is interface only: there is no messaging back end.

## Configuration

All API calls go through one axios client, [`src/services/api.js`](src/services/api.js).

| Variable | Role | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | base URL of the API | `/api`, routed to the gateway by nginx |
| `NEXT_PUBLIC_TOKEN_KEY` | localStorage key of the access token | `breezy_token` |
| `NEXT_PUBLIC_USE_MOCKS` | `true` serves mock data, without any back end | — |

## Run

The whole stack runs with Docker Compose from [breezy-infra](https://github.com/El-Pouleto-ultimate/breezy-infra).
On its own:

```bash
npm install
npm run dev       # http://localhost:3000
npm run build && npm start
npm run lint
```

## Team

[Estebge](https://github.com/Estebge), [haguetm](https://github.com/haguetm),
[Jessica14112005](https://github.com/Jessica14112005), [Tuture57](https://github.com/Tuture57).
