import type { CAPITrailType, TrailType } from '../../types/trails';
import { decideFormat } from './decideFormat';
import { getDataLinkNameCard } from './getDataLinkName';

export const decideTrail = (trail: CAPITrailType, index = 0): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);

	return {
		...trail,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index + 1),
	};
};
