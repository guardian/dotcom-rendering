import { decideDesign } from '@root/src/web/lib/decideDesign';
import { decideTheme } from '@root/src/web/lib/decideTheme';

export const decideTrail = (trail: CAPITrailType): TrailType => {
	// We don't have tags here so we send an empty array
	const design = decideDesign(trail.designType, []);
	return {
		...trail,
		pillar: decideTheme({ pillar: trail.pillar, design }),
		design,
	};
};
