import { describe, it, expect, vi } from 'vitest';
import { getPostData } from '../lib/posts';
import fs from 'fs';

// Mock fs
vi.mock('fs', () => {
    const readFileSync = vi.fn();
    const readdirSync = vi.fn().mockReturnValue(['test-post.md']);

    return {
        default: {
            readFileSync,
            readdirSync,
        },
        readFileSync,
        readdirSync,
    };
});

describe('Security: XSS Prevention', () => {
    it('should sanitize script tags from markdown content', async () => {
        const maliciousContent =
`---
title: Malicious Post
date: '2023-01-01'
---

<script>alert('XSS')</script>
[Click me](javascript:alert('XSS'))
<img src=x onerror=alert(1)>
Safe content`;

        // Configure the mock
        (fs.readFileSync as any).mockReturnValue(maliciousContent);

        const data = await getPostData('test-post');

        // console.log('Sanitized Output:', data.contentHtml);

        expect(data.contentHtml).not.toContain('<script>');
        expect(data.contentHtml).not.toContain('javascript:');
        expect(data.contentHtml).not.toContain('onerror=');
        expect(data.contentHtml).toContain('Safe content');
    });
});
