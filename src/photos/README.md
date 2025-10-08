Unsplash integration for the photos component

- Location: `src/photos/index.jsx`
- Purpose: Fetches Unsplash user profile and latest photos.

Configuration

1. Open `src/photos/doc.js` and set:
   - `CLIENT_KEY` - your Unsplash application Access Key (public)
   - `CS_KEY` - (optional) your Unsplash API Bearer token (for authenticated `/me` access)

2. If you don't provide `CS_KEY`, the component falls back to a demo username (`unsplash`) and uses `CLIENT_KEY` for public endpoints.

Running the app

- Start the dev server (from project root):

```powershell
npm install; npm run dev
```

Notes

- Unsplash enforces rate limits; for a production integration, proxy requests server-side or implement caching.
- If you need to show a specific user's photos, modify `demoUsername` in `src/photos/index.jsx` or expose a prop to the component.
