import type { FETrailType, TrailType } from '../types/trails.ts';
import { decideFormat } from './decideFormat.ts';
import { getDataLinkNameCard } from './getDataLinkName.ts';

export const decideTrail = (trail: FETrailType, index = 0): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);

	return {
		...trail,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
	};
};
