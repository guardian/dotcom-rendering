// ── Utility helpers ───────────────────────────────────────────────────────────

export const stripHtmlTags = (html: string): string =>
	html.replace(/<[^>]+>/g, '').trim();
