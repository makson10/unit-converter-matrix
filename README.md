# Unit Converter Matrix

REST API that converts a value between units of the same category, built with Express 5 and TypeScript. The project doubles as a GitFlow exercise.

Supported categories: temperature

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

## API

Every category exposes the same two endpoints under its own prefix:

| Method | Path                  | Purpose                                                          |
| ------ | --------------------- | ---------------------------------------------------------------- |
| GET    | `/{category}/units`   | List the units of the category and its base unit                 |
| POST   | `/{category}/convert` | Convert a value, body `{ "value": 5, "from": "km", "to": "mi" }` |

Results are rounded to 6 decimal places. Errors share one shape, `{ "error": "message" }`, with 400 for an unknown unit and 404 for an unknown route.

## API documentation

Swagger UI is served at [http://localhost:3000/docs](http://localhost:3000/docs) and the raw OpenAPI document at `/docs.json`. The document is generated from `@openapi` JSDoc blocks next to each route.

## Scripts

| Script               | Purpose                     |
| -------------------- | --------------------------- |
| `npm run dev`        | Run from source with reload |
| `npm run build`      | Compile to `dist/`          |
| `npm start`          | Run the compiled app        |
| `npm run typecheck`  | Type-check without emitting |
| `npm test`           | Run the test suite once     |
| `npm run test:watch` | Run tests in watch mode     |
| `npm run lint`       | Lint with ESLint            |
| `npm run format`     | Format with Prettier        |

## Development

Git hooks are installed by Husky on `npm install`:

- `pre-commit` runs ESLint and Prettier on staged files through lint-staged.
- `commit-msg` checks the message against [Conventional Commits](https://www.conventionalcommits.org/) with commitlint.

CI runs lint, typecheck, tests and build on every pull request and on pushes to `main` and `dev`.
