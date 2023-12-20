import { createHash } from 'node:crypto';
import { ASSET_ORIGIN } from '../lib/assets';
import type { DCRBadgeType } from '../types/badge';
import { BADGES, SPECIAL_BADGES } from './badges';

/**
 * Fetches the corresponding badge using the series tag, if there's a match in the lookup.
 */
export const decideEditorialBadge = (
	seriesTag?: string,
): DCRBadgeType | undefined => {
	if (!seriesTag) return undefined;

	const badge = BADGES.find((b) => b.seriesTag === seriesTag);
	if (badge) {
		return {
			imageSrc: `${ASSET_ORIGIN}static/frontend/${badge.imageSrc}`,
			href: `/${seriesTag}`,
		};
	}

	// "Special" hidden badges have their series tags hashed
	const specialBadge = SPECIAL_BADGES.find((b) => {
		const badgeHash = createHash('md5')
			.update(b.salt + seriesTag)
			.digest('hex');
		return badgeHash.includes(b.hashedTag);
	});

	if (specialBadge) {
		return {
			imageSrc: `${ASSET_ORIGIN}static/frontend/${specialBadge.imageSrc}`,
			href: `/${seriesTag}`,
		};
	}

	// No badge or special badge found
	return undefined;
};
