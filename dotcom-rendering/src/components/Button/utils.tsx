import { SvgArrowRightStraight } from '@guardian/source/react-components';

const platformHostnames = [
	// CODE
	'code.dev-theguardian.com',
	'm.code.dev-theguardian.com',
	// PROD
	'theguardian.com',
	'www.theguardian.com',
];

/**
 * Note this uses an exact-match allowlist, so Guardian subdomains such as
 * support.theguardian.com and profile.theguardian.com count as external. Where
 * that isn’t wanted, use `isGuardianLink` instead.
 * @see ../../lib/isGuardianLink.ts
 */
export const isExternalLink = (url: string) => {
	try {
		return !platformHostnames.includes(new URL(url).hostname);
	} catch (_e) {
		// It's not an external link. It's also ... not a link.
		return false;
	}
};

export const getPropsForLinkUrl = (label: string) =>
	({
		iconSide: 'right',
		rel: 'noreferrer noopener',
		target: '_blank',
		'aria-label': `${label} (opens in a new tab)`,
		icon: <SvgArrowRightStraight />,
	}) as const;
