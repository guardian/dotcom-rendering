import { SvgArrowRightStraight } from '@guardian/source/react-components';

const platformHostnames = [
	// CODE
	'code.dev-theguardian.com',
	'm.code.dev-theguardian.com',
	// PROD
	'www.theguardian.com',
];

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
