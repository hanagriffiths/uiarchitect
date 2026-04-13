# UI Architect

UI Architect is a small full-stack tool that turns a **screenshot of a user interface** into a **hierarchical architecture tree** for the stack you pick. You upload an image in the app, choose a language, and the backend uses an OpenAI vision model to propose named sections and reusable units as JSON.

## Repository layout

| Directory | Role |
|-----------|------|
| [`uiarchitect-frontend`](uiarchitect-frontend/) | Expo (React Native) client with Expo Router and NativeWind |
| [`uiarchitect-backend`](uiarchitect-backend/) | FastAPI service that proxies image analysis to OpenAI |

## How it works

1. The **frontend** lets you pick an image from the library and a target language: JavaScript, TypeScript, Python, or Kotlin.
2. The image is sent as `multipart/form-data` to `POST /api/generate`.
3. The **backend** encodes the image, calls the model with a structured prompt, and returns JSON shaped as a tree (`name`, `type`, `children`). Non-UI images are rejected with a clear error.
4. The app navigates to a **component tree** screen that renders that hierarchy.

Language-specific output rules (React Native vs FastAPI-style vs Android-style naming and node types) are defined in the backend’s AI prompt.

## Prerequisites

- **Node.js** (LTS recommended) and npm
- **Python 3.10+** with `pip`
- An **OpenAI API key** with access to the configured chat vision model (`gpt-4o-mini` in code)

## Backend setup

From the repository root:

```bash
cd uiarchitect-backend
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install fastapi "uvicorn[standard]" python-dotenv openai python-multipart
```

Create a `.env` file in `uiarchitect-backend` (do not commit secrets):

```env
OPENAI_API_KEY=sk-...
# Optional: origin allowed by CORS (defaults if unset)
FRONTEND_URL=http://localhost:8081
```

Start the API:

```bash
uvicorn app.main:app --reload
```

The server listens on port **8000** by default. `GET /` returns a short health message; generation is under **`/api/generate`**.

## Frontend setup

```bash
cd uiarchitect-frontend
npm install
npm start
```

Then open the app in Expo Go, an emulator/simulator, or the web target from the Expo CLI. The client is configured to call the backend at **`http://127.0.0.1:8000/api`** (see `components/Hero.tsx`). If you change host or port, update that constant or point CORS `FRONTEND_URL` at the URL your Expo dev server uses.

## API (brief)

- **`POST /api/generate`** — multipart body: `image` (file), `language` (string), `mimeType` (string, e.g. `image/png`). Returns `{ success, data | error, message?, language? }`.

## Scripts

**Frontend** (`uiarchitect-frontend/package.json`): `npm start`, `npm run android`, `npm run ios`, `npm run web`, `npm run lint`.

**Backend**: run via `uvicorn` as shown above.
