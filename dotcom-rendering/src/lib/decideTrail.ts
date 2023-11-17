import type { DCRFrontCard } from '../types/front';
import type { FETrailType, TrailType } from '../types/trails';
import { decideFormat } from './decideFormat';
import { getDataLinkNameCard } from './getDataLinkName';

const filterTrails = <T extends DCRFrontCard | TrailType | FETrailType>(
	trails: T[],
): T[] =>
	trails.filter(
		(trail) =>
			/* TODO: remove this once we have a better solution
						for filtering undesired articles See issue:
						https://github.com/guardian/dotcom-rendering/issues/9528 */
			!trail.url.includes('/info/2023/nov/15/removed-document'),
	);

const decideTrail = (trail: FETrailType, index = 0): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);
	return {
		...trail,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
	};
};

export { decideTrail, filterTrails };
