## 2026-01-13 - Markdown XSS Vulnerability
**Vulnerability:** The application was using `remark-html` to render Markdown to HTML without any sanitization. This allowed Stored XSS if the Markdown content contained malicious HTML/scripts.
**Learning:** `remark-html` does not sanitize output by default. It's a common misconception that markdown parsers are safe; they often pass through HTML.
**Prevention:** Always pair `remark-html` with a sanitizer like `dompurify` (via `isomorphic-dompurify` for SSR/Next.js) or use `rehype-sanitize` in the processing pipeline.
