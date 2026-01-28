import { SvgArrowRightStraight } from '@guardian/source/react-components';

const platformHostnames = [
	// CODE
	'https://code.dev-theguardian.com/',
	'https://m.code.dev-theguardian.com/',
	// PROD
	'www.theguardian.com',
];

export const isExternalLink = (url: string) =>
	!platformHostnames.includes(new URL(url).hostname);

export const getPropsForLinkUrl = (label: string) =>
	({
		iconSide: 'right',
		rel: 'noreferrer noopener',
		target: '_blank',
		'aria-label': `${label} (opens in a new tab)`,
		icon: <SvgArrowRightStraight />,
	}) as const;
