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
 * The URL of the page the reader is on, to send them back to after they
 * subscribe or sign in: the origin and the path, with no query string or hash.
 * Puzzle pages are fully described by their path, and leaving the rest out keeps
 * tracking parameters out of the return link.
 *
 * Repeated leading slashes in the path are collapsed to one.
 *
 * Returns `undefined` when the page is not served over `https`: Support and
 * Identity ignore any other return URL, so there is nothing useful to send.
 */
export const getCurrentPageUrl = (location: {
	protocol: string;
	origin: string;
	pathname: string;
}): string | undefined => {
	if (location.protocol !== 'https:') return undefined;
	return `${location.origin}${location.pathname.replace(/^\/{2,}/, '/')}`;
};

/**
 * The "Subscribe" CTA of the premium puzzles modal: the Support site (region
 * is resolved by the Support site itself) with a `returnUrl`, a full `https`
 * URL, so the reader lands back where they came from after subscribing.
 */
export const buildPremiumPuzzlesSubscribeUrl = ({
	idUrl,
	returnUrl,
}: {
	idUrl?: string;
	returnUrl?: string;
}): string => {
	const params = new URLSearchParams({ source: 'puzzles' });
	if (returnUrl !== undefined) {
		params.set('returnUrl', returnUrl);
	}
	return `${getSupportBaseUrl(idUrl)}/?${params.toString()}`;
};

/**
 * The "sign in" link of the premium puzzles modal: the Identity sign-in page
 * of the current environment (`idUrl`), falling back to production, with a
 * `returnUrl` so the reader comes back to the puzzle after signing in.
 */
export const getPremiumPuzzlesSignInUrl = (
	idUrl?: string,
	returnUrl?: string,
): string => {
	const base = `${idUrl ?? PROD_PROFILE_BASE_URL}/signin`;
	if (returnUrl === undefined) return base;
	return `${base}?${new URLSearchParams({ returnUrl }).toString()}`;
};
