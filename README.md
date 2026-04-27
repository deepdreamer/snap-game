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

## Project Structure

| Path | Description |
|------|-------------|
| [`index.html`](index.html) | HTML entry point |
| [`src/main.tsx`](src/main.tsx) | App entry point — mounts React root |
| [`src/App.tsx`](src/App.tsx) | Root component, sets up context provider and layout |
| [`src/context/CardGameContext.tsx`](src/context/CardGameContext.tsx) | Game state — deck, drawn cards, score, match logic |
| [`src/services/DeckOfCardsApi.tsx`](src/services/DeckOfCardsApi.tsx) | API client for Deck of Cards API |
| [`src/components/`](src/components/) | UI components — Card, DrawCardButton, MatchMessage, Heading, MainContainer |
| [`src/App.test.tsx`](src/App.test.tsx) | Integration tests |
| [`src/test/setup.js`](src/test/setup.js) | Vitest + MSW test setup |
| [`public/icons.svg`](public/icons.svg) | Card suit icons sprite |
| [`vite.config.ts`](vite.config.ts) | Vite configuration |
| [`docker-compose.yaml`](docker-compose.yaml) | Local dev environment |

