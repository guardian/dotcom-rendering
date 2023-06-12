import type { FETrailType, TrailType } from '../types/trails';
import { decideFormat } from './decideFormat';
import { getDataLinkNameCard } from './getDataLinkName';

export const decideTrail = (trail: FETrailType, index = 0): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);

	return {
		...trail,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
	};
};
