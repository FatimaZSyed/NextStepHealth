# Lab Results Helper Frontend

A basic React/Vite frontend based on the current Python lab-results project.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Current fields

- Ferritin
- LDL cholesterol
- Vitamin D

## Important

This version runs the rules directly in JavaScript so it works without a web API.
Your current Python files are command-line code, not an HTTP backend yet.

If you later add a Flask or FastAPI endpoint, `src/analyze.js` can be replaced with a `fetch()` call to the Python backend instead.
