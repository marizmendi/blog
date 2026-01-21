## 2026-01-14 - Robust XSS Prevention in Markdown
**Vulnerability:** Markdown content processed by `remark-html` can contain raw HTML. If sanitization is disabled to allow HTML formatting, it opens the door to XSS attacks via `<script>` tags or javascript links.
**Learning:** `remark-html` (v15+) sanitizes by default but strips ALL HTML. To support rich content (safe HTML) while blocking attacks, we need a dedicated sanitizer.
**Prevention:** Configure `remark-html` with `{ sanitize: false }` to pass raw HTML, then pipe the output through `isomorphic-dompurify` to enforce a strict security policy that removes XSS vectors while preserving safe tags.

## 2026-01-21 - CSP Refinement for Next.js SSG
**Vulnerability:** Excessive permissions in CSP ('unsafe-eval').
**Learning:** Next.js Static Site Generation (SSG) builds do not require 'unsafe-eval' in 'script-src' for production, allowing for a stricter policy.
**Prevention:** Removed 'unsafe-eval' from 'Content-Security-Policy' in 'next.config.js'.
