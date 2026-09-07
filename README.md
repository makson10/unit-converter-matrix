# Unit Converter Matrix

REST API that converts a value between units of the same category, built with Express 5 and TypeScript. The project doubles as a GitFlow exercise; the plan lives in [docs/project.md](docs/project.md) and the step-by-step roadmap in [docs/roadmap.md](docs/roadmap.md).

Supported categories: none yet

## Quick start

```sh
npm install
npm run dev
```

The server listens on port 3000 by default; set `PORT` to change it.

```sh
curl http://localhost:3000/health
# {"status":"ok","version":"0.1.0"}
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Run from source with reload |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run the compiled app |
| `npm run typecheck` | Type-check without emitting |
