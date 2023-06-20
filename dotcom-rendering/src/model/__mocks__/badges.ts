import type { BadgeType, SpecialBadgeType } from '../../types/badge';

// NB this is a MOCK file, don't accidentally import!

/** Mocked version of BADGES for testing */
export const BADGES: BadgeType[] = [
	{
		seriesTag: 'world/series/the-new-arrivals',
		imageSrc: 'badges/new-arrivals.png',
	},
	{
		seriesTag: 'uk-news/series/the-brexit-gamble',
		imageSrc: 'badges/EUReferendumBadge.svg',
	},
];

/** Mocked version of SPECIAL_BADGES for testing */
export const SPECIAL_BADGES: SpecialBadgeType[] = [
	{
		salt: 'bgxx248cpdecau4434hd',
		hashedTag: '618e8af611c0f8430ffb330a1f3c344f',
		imageSrc: 'badges/newsletter-badge.svg',
	},
	{
		salt: 'p9s52e6pkjp7q4h5x89g',
		hashedTag: 'eded82359738a7be7f4ab693d339a74c',
		imageSrc: 'badges/this-is-europe.svg',
	},
];
