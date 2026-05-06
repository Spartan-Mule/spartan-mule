# AGENTS.md

## Cursor Cloud specific instructions

This is a zero-dependency static web app (HTML/CSS/vanilla JS). There is no package manager, no build step, and no test framework.

### Running the app

Serve the project root with any static HTTP server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. The app uses `localStorage` for persistence—no database or backend needed.

### Linting / Testing

There are no configured lint tools or automated tests. To validate correctness, open the app in a browser and manually exercise the add/complete/delete/clear-completed flows.

### Key notes

- The app is entirely client-side; all state lives in the browser's `localStorage`.
- No environment variables or secrets are required.
- No external services, Docker, or databases are involved.
