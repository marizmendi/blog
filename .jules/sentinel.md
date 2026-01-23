## 2026-01-14 - Robust XSS Prevention in Markdown
**Vulnerability:** Markdown content processed by `remark-html` can contain raw HTML. If sanitization is disabled to allow HTML formatting, it opens the door to XSS attacks via `<script>` tags or javascript links.
**Learning:** `remark-html` (v15+) sanitizes by default but strips ALL HTML. To support rich content (safe HTML) while blocking attacks, we need a dedicated sanitizer.
**Prevention:** Configure `remark-html` with `{ sanitize: false }` to pass raw HTML, then pipe the output through `isomorphic-dompurify` to enforce a strict security policy that removes XSS vectors while preserving safe tags.

## 2026-01-21 - CSP Refinement for Next.js SSG
**Vulnerability:** Excessive permissions in CSP ('unsafe-eval').
**Learning:** Next.js Static Site Generation (SSG) builds do not require 'unsafe-eval' in 'script-src' for production, allowing for a stricter policy.
**Prevention:** Removed 'unsafe-eval' from 'Content-Security-Policy' in 'next.config.js'.

## 2026-01-22 - Path Traversal Protection in File Access
**Vulnerability:** User input used directly in `path.join` can allow directory traversal (`../`) to access files outside the intended directory.
**Learning:** `path.join` normalizes paths but does not restrict them to a root.
**Prevention:** Always resolve the final path using `path.resolve` and verify it starts with the intended root directory (appended with `path.sep` to prevent partial prefix matches).

## 2026-01-23 - Hardening DOMPurify against CSS Injection and Phishing
**Vulnerability:** Default `DOMPurify` configuration allows `<style>` tags and form elements (`<form>`, `<input>`, etc.), enabling CSS injection (DoS, defacement) and Phishing attacks.
**Learning:** For blog content, rich HTML is rarely needed beyond formatting. Interactive elements and global styles pose unnecessary risks.
**Prevention:** Explicitly forbid `style`, `form`, `input`, `select`, `textarea`, `button`, `iframe`, and `object` tags in `DOMPurify` configuration.
