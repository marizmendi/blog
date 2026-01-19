# Sentinel's Journal

## 2026-01-15 - Missing Default Security Headers in Next.js
**Vulnerability:** Application was missing standard HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, etc.) and exposing `X-Powered-By: Next.js`.
**Learning:** Next.js does not include these headers by default. `X-Powered-By` must be explicitly disabled in `next.config.js`.
**Prevention:** Always initialize new Next.js projects with a secure `next.config.js` that defines these headers.

## 2026-01-14 - Robust XSS Prevention in Markdown
**Vulnerability:** Markdown content processed by `remark-html` can contain raw HTML. If sanitization is disabled to allow HTML formatting, it opens the door to XSS attacks via `<script>` tags or javascript links.
**Learning:** `remark-html` (v15+) sanitizes by default but strips ALL HTML. To support rich content (safe HTML) while blocking attacks, we need a dedicated sanitizer.
**Prevention:** Configure `remark-html` with `{ sanitize: false }` to pass raw HTML, then pipe the output through `isomorphic-dompurify` to enforce a strict security policy that removes XSS vectors while preserving safe tags.
