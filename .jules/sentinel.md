## 2026-01-16 - Missing Security Headers & Path Validation
**Vulnerability:** Missing `next.config.js` meant no security headers (X-Frame-Options, etc.) were set. Also, `lib/posts.ts` lacked validation for file IDs, allowing potential path traversal.
**Learning:** Default Next.js setups often omit security headers. File-system access based on inputs (even internal ones) should always be validated.
**Prevention:** Always verify `next.config.js` exists and has headers. Use strict validation for any file system access.
