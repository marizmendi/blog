## 2026-01-16 - Missing Security Headers & Path Validation
**Vulnerability:** Missing `next.config.js` meant no security headers (X-Frame-Options, etc.) were set. Also, `lib/posts.ts` lacked validation for file IDs, allowing potential path traversal.
**Learning:** Default Next.js setups often omit security headers. File-system access based on inputs (even internal ones) should always be validated.
**Prevention:** Always verify `next.config.js` exists and has headers. Use strict validation for any file system access.

## 2026-01-14 - Robust XSS Prevention in Markdown
**Vulnerability:** Markdown content processed by `remark-html` can contain raw HTML. If sanitization is disabled to allow HTML formatting, it opens the door to XSS attacks via `<script>` tags or javascript links.
**Learning:** `remark-html` (v15+) sanitizes by default but strips ALL HTML. To support rich content (safe HTML) while blocking attacks, we need a dedicated sanitizer.
**Prevention:** Configure `remark-html` with `{ sanitize: false }` to pass raw HTML, then pipe the output through `isomorphic-dompurify` to enforce a strict security policy that removes XSS vectors while preserving safe tags.
