# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [1.0.1] - 2026-09-08

### Fixed

- `POST /{category}/convert` returned 500 when the request had no body, a non-JSON body or a body with missing or mistyped fields. It now validates the body and responds 400 with a descriptive error.

## [1.0.0] - 2026-09-08

### Added

- Length category: `GET /length/units` and `POST /length/convert` for mm, cm, m, km, in, ft, yd and mi.
- Weight category: `GET /weight/units` and `POST /weight/convert` for mg, g, kg, t, oz and lb.
- Temperature category: `GET /temperature/units` and `POST /temperature/convert` for C, F and K.
- Conversion engine with factor-based and custom unit definitions, results rounded to 6 decimal places.
- Swagger UI at `/docs` and the raw OpenAPI document at `/docs.json`.
- `GET /health` reporting status and version.
- JSON error responses with 400 for unknown units and 404 for unknown routes.
