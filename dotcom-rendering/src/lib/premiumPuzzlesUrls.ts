const PROD_SUPPORT_BASE_URL = 'https://support.theguardian.com';
const PROD_PROFILE_BASE_URL = 'https://profile.theguardian.com';
const PROFILE_SUBDOMAIN_PREFIX = 'profile.';

/**
 * Derives the Support site origin for the current environment from the
 * Identity (profile) origin, which is already sent on every page's `config`:
 *
 * - `https://profile.thegulocal.com` -> `https://support.thegulocal.com`
 * - `https://profile.code.dev-theguardian.com` -> `https://support.code.dev-theguardian.com`
 * - `https://profile.theguardian.com` -> `https://support.theguardian.com`
 *
 * This relies on the naming convention that the Support and Identity sites
 * share the same parent domain. Falls back to production if `idUrl` is
 * missing or does not follow that convention.
 */
export const getSupportBaseUrl = (idUrl?: string): string => {
	if (idUrl === undefined || idUrl === '') return PROD_SUPPORT_BASE_URL;

	try {
		const { protocol, host } = new URL(idUrl);
		if (!host.startsWith(PROFILE_SUBDOMAIN_PREFIX)) {
			return PROD_SUPPORT_BASE_URL;
		}
		return `${protocol}//support.${host.slice(PROFILE_SUBDOMAIN_PREFIX.length)}`;
	} catch {
		return PROD_SUPPORT_BASE_URL;
	}
};

/**
 * Whether `path` is a same-site path (e.g. `/puzzles-and-games`). Rejects
 * absolute and protocol-relative URLs (`https://...`, `//evil.com`) so a path
 * prop can never be used as an open redirect.
 */
export const isSafeInternalPath = (path: string): boolean =>
	path.startsWith('/') && !path.startsWith('//') && !path.includes('\\');

/**
 * The path of an absolute URL (e.g. a page's `canonicalUrl`), or `fallback`
 * if the URL cannot be parsed.
 *
 * Repeated leading slashes are collapsed to one: a path starting with `//` is
 * a protocol-relative URL, which `isSafeInternalPath` (rightly) refuses, and
 * `frontend`'s puzzle page `canonicalUrl` currently comes with one
 * (`https://host//puzzles-and-games/...`).
 */
export const getPathFromUrl = (url: string, fallback: string): string => {
	try {
		return new URL(url).pathname.replace(/^\/{2,}/, '/');
	} catch {
		return fallback;
	}
};

/**
 * The "Subscribe" CTA of the premium puzzles modal: the Support site (region
 * is resolved by the Support site itself) with a `returnTo` path so the reader
 * lands back where they came from after subscribing.
 */
export const buildPremiumPuzzlesSubscribeUrl = ({
	idUrl,
	returnFromSubscribeToPath,
}: {
	idUrl?: string;
	returnFromSubscribeToPath: string;
}): string => {
	const params = new URLSearchParams({ source: 'puzzles' });
	if (isSafeInternalPath(returnFromSubscribeToPath)) {
		params.set('returnTo', returnFromSubscribeToPath);
	}
	return `${getSupportBaseUrl(idUrl)}/?${params.toString()}`;
};

/**
 * The "sign in" link of the premium puzzles modal: the Identity sign-in page
 * of the current environment (`idUrl`), falling back to production.
 */
export const getPremiumPuzzlesSignInUrl = (idUrl?: string): string =>
	`${idUrl ?? PROD_PROFILE_BASE_URL}/signin`;
