const EMAIL_PREVIEW_BASE_URL = 'https://email-rendering.guardianapis.com';
const FRONTS_EMAIL_PREVIEW_PATH = 'fronts';
const ARTICLE_EMAIL_PREVIEW_PATH = 'article';
const FRONTS_EMAIL_PREVIEW_VARIANT = 'persephone';
const ARTICLE_EMAIL_PREVIEW_VARIANT = 'kronos';

const normalizeNewsletterPath = (path: string): string =>
	path
		.split('/')
		.filter(Boolean)
		.map((part) => encodeURIComponent(part))
		.join('/');

const stripTrailingEmailSegment = (path: string): string =>
	path.replace(/\/+$/, '').replace(/\/email$/, '');

export const buildNewsletterPreviewUrl = ({
	renderPath,
	category,
}: {
	renderPath?: string;
	category?: string;
}): string | undefined => {
	if (!renderPath) return undefined;

	if (category === 'fronts-based') {
		const normalizedPath = normalizeNewsletterPath(renderPath);

		return `${EMAIL_PREVIEW_BASE_URL}/${FRONTS_EMAIL_PREVIEW_PATH}/${normalizedPath}?variant=${FRONTS_EMAIL_PREVIEW_VARIANT}`;
	}

	if (category === 'article-based' || category === 'article-based-legacy') {
		const articlePath = stripTrailingEmailSegment(renderPath);
		if (!articlePath) return undefined;

		const normalizedPath = normalizeNewsletterPath(articlePath);

		return `${EMAIL_PREVIEW_BASE_URL}/${ARTICLE_EMAIL_PREVIEW_PATH}/${normalizedPath}?variant=${ARTICLE_EMAIL_PREVIEW_VARIANT}`;
	}

	return undefined;
};
