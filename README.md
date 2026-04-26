# Frontend task assigment. A card game.

A card game built with React and TypeScript. Draw cards from a shuffled deck and score points when consecutive cards share the same value or suit.

## Last build is hosted as demo:
https://lighthearted-cupcake-5b501b.netlify.app/

## Tech stack

- React 19 + TypeScript
- Vite
- [Deck of Cards API](https://deckofcardsapi.com)
- Vitest + Testing Library + MSW for tests
- Docker for local development

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/deepdreamer/snap-game
cd snap-game
```

### 2. Configure environment

Copy the example below into a `.env` file at the project root. Get your user and group IDs by running `id -u` and `id -g`:

```
USER_ID=1000
GROUP_ID=1000
VITE_API_BASE_URL=https://deckofcardsapi.com
```

### 3. Start the dev server

```
docker compose up -d
```

App is available at `http://localhost:5173`

### 4. Run tests

```
docker compose run --rm app-dev npm test -- --run
```

### 5. Build for production

```
docker compose run --rm app-dev npm run build
```

Output is written to `dist/`. Serve it with any static file host. If using Nginx, configure `try_files $uri /index.html` to support client-side routing.

