const EMAIL_PREVIEW_BASE_URL = 'https://email-rendering.guardianapis.com';
const FRONTS_EMAIL_PREVIEW_PATH = 'fronts';
const ARTICLE_EMAIL_PREVIEW_PATH = 'article';
const FRONTS_EMAIL_PREVIEW_VARIANT = 'persephone';
const ARTICLE_EMAIL_PREVIEW_VARIANT = 'kronos';
const READ_ONLY_PARAM_KEY = 'readonly';
const READ_ONLY_PARAM_VALUE = 'true';

const getPathname = (urlOrPath: string): string => {
	try {
		return new URL(urlOrPath, EMAIL_PREVIEW_BASE_URL).pathname;
	} catch {
		return urlOrPath;
	}
};

const normalizePathSegment = (pathSegment: string): string => {
	try {
		return encodeURIComponent(decodeURIComponent(pathSegment));
	} catch {
		return encodeURIComponent(pathSegment);
	}
};

const normalizeNewsletterPath = (path: string): string =>
	path.split('/').filter(Boolean).map(normalizePathSegment).join('/');

const stripTrailingEmailSegment = (path: string): string =>
	path.replace(/\/+$/, '').replace(/\/email$/, '');

const stripLeadingArticleSegment = (path: string): string =>
	path.replace(/^\/+article\//, '/');

const isEmailNamespacePath = (path: string): boolean =>
	/^\/+email\//.test(path);

const isArticleNamespacePath = (path: string): boolean =>
	/^\/+article\//.test(path);

const buildPreviewUrl = ({
	path,
	previewType,
	variant,
}: {
	path: string;
	previewType: string;
	variant: string;
}): string | undefined => {
	const normalizedPath = normalizeNewsletterPath(path);
	if (!normalizedPath) return undefined;

	const previewUrl = new URL(
		`${previewType}/${normalizedPath}`,
		`${EMAIL_PREVIEW_BASE_URL}/`,
	);
	previewUrl.search = new URLSearchParams({
		variant,
		[READ_ONLY_PARAM_KEY]: READ_ONLY_PARAM_VALUE,
	}).toString();

	return previewUrl.toString();
};

export const buildNewsletterPreviewUrl = ({
	exampleUrl,
	category,
}: {
	exampleUrl?: string;
	category?: string;
}): string | undefined => {
	if (!exampleUrl) return undefined;
	const pathname = getPathname(exampleUrl);

	if (isEmailNamespacePath(pathname)) {
		return buildPreviewUrl({
			path: pathname,
			previewType: FRONTS_EMAIL_PREVIEW_PATH,
			variant: FRONTS_EMAIL_PREVIEW_VARIANT,
		});
	}

	if (isArticleNamespacePath(pathname)) {
		const articlePath = stripLeadingArticleSegment(
			stripTrailingEmailSegment(pathname),
		);

		return buildPreviewUrl({
			path: articlePath,
			previewType: ARTICLE_EMAIL_PREVIEW_PATH,
			variant: ARTICLE_EMAIL_PREVIEW_VARIANT,
		});
	}

	if (category === 'fronts-based') {
		return buildPreviewUrl({
			path: pathname,
			previewType: FRONTS_EMAIL_PREVIEW_PATH,
			variant: FRONTS_EMAIL_PREVIEW_VARIANT,
		});
	}

	if (category === 'article-based' || category === 'article-based-legacy') {
		const articlePath = stripTrailingEmailSegment(pathname);

		return buildPreviewUrl({
			path: articlePath,
			previewType: ARTICLE_EMAIL_PREVIEW_PATH,
			variant: ARTICLE_EMAIL_PREVIEW_VARIANT,
		});
	}

	return undefined;
};
