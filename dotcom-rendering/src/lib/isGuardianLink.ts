import { safeParseURL } from './parse';

/**
 * Hosts that sit under theguardian.com but exist purely to redirect readers
 * off-site, so should be treated as external.
 */
const OUTBOUND_REDIRECTORS = new Set(['go.theguardian.com']);

const GUARDIAN_HOSTS = new Set([
	'theguardian.com',
	'code.dev-theguardian.com',
	'm.code.dev-theguardian.com',
	'localhost',
]);

/**
 * Is this href a link to a Guardian-owned destination?
 *
 * Relative URLs, fragments, `mailto:` and `tel:` all count as Guardian, i.e.
 * "not something we should open in a new tab".
 *
 * Deliberately *not* the same as `isExternalLink`, which uses an exact-match
 * allowlist and so treats support.theguardian.com and profile.theguardian.com
 * as external.
 * @see ../components/Button/utils.tsx
 */
export const isGuardianLink = (href: string): boolean => {
	const result = safeParseURL(href);

	// Relative or invalid, so it resolves against our own origin
	if (!result.ok) return true;

	const { protocol, hostname } = result.value;

	if (protocol !== 'http:' && protocol !== 'https:') return true;

	if (OUTBOUND_REDIRECTORS.has(hostname)) return false;

	return (
		GUARDIAN_HOSTS.has(hostname) ||
		hostname.endsWith('.theguardian.com') ||
		hostname.endsWith('.dev-theguardian.com')
	);
};
