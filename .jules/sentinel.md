# Sentinel's Journal

## 2026-01-15 - Missing Default Security Headers in Next.js
**Vulnerability:** Application was missing standard HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, etc.) and exposing `X-Powered-By: Next.js`.
**Learning:** Next.js does not include these headers by default. `X-Powered-By` must be explicitly disabled in `next.config.js`.
**Prevention:** Always initialize new Next.js projects with a secure `next.config.js` that defines these headers.
