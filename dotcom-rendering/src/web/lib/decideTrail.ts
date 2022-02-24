import { decideFormat } from './decideFormat';

export const decideTrail = (trail: CAPITrailType): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);

	return {
		...trail,
		format,
	};
};
