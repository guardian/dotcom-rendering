import { Badge } from './Badge';

export default {
	component: Badge,
	title: 'Components/Badge',
};

const BADGES = {
	hardcoded: {
		imageSrc:
			'https://assets.guim.co.uk/static/frontend/badges/this-is-europe.svg',
		href: '/world/series/this-is-europe',
	},
	foundation: {
		imageSrc:
			'https://static.theguardian.com/commercial/sponsor/19/Dec/2022/57ba1d00-b2bd-4f6d-ba35-15a82b8d9507-0094b90a-bdb8-4e97-b866-dcf49179b29d-theguardian.org.png',
		href: 'https://theguardian.org/',
		label: 'Supported by',
		aboutThisLinkHref:
			'https://www.theguardian.com/environment/2023/jan/06/about-animals-farmed-investigating-modern-farming-around-the-world',
		width: 280,
		height: 180,
	},
	sponsored: {
		imageSrc:
			'https://static.theguardian.com/commercial/sponsor/30/Jun/2023/de73b4b2-0a99-4f41-9ad2-aaeb21a95eb0-Google_Pixel_Logo_Grey.png',
		href: 'https://store.google.com/product/pixel_7a',
		label: 'Supported by',
		aboutThisLinkHref:
			'https://www.theguardian.com/info/2016/jan/25/content-funding',
		width: 124,
		height: 45,
	},
	paid: {
		imageSrc:
			'https://static.theguardian.com/commercial/sponsor/08/Jun/2023/25aa36aa-6f9a-4d41-9f42-1630abe4b6a1-NU_Logo_Black_pos280.png',
		href: 'https://www.northumbria.ac.uk/study-at-northumbria/ucas-clearing-confirmation-adjustment-and-extra',
		label: 'Paid for by',
		aboutThisLinkHref: '',
		width: 280,
		height: 180,
	},
};

export const Hardcoded = () => {
	return <Badge {...BADGES.hardcoded} />;
};
Hardcoded.storyName = 'Hardcoded';

export const FoundationFunded = () => {
	return <Badge {...BADGES.foundation} />;
};
FoundationFunded.storyName = 'Sponsored Badge - foundation funded';

export const Sponsored = () => {
	return <Badge {...BADGES.sponsored} />;
};
Sponsored.storyName = 'Sponsored Badge - sponsored';

export const Paid = () => {
	return <Badge {...BADGES.paid} />;
};
Paid.storyName = 'Sponsored Badge - paid';
