import { Display } from '@guardian/types';
import { decideDesign } from '@root/src/web/lib/decideDesign';
import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decidePalette } from './decidePalette';

export const decideTrail = (trail: CAPITrailType): TrailType => {
	// We don't have tags here so we send an empty array
	const design = decideDesign({
		designType: trail.designType,
		tags: [],
		isLiveBlog: trail.isLiveBlog,
		isLive: true,
	});
	const format = {
		// We don't have enough data from CAPI to know what display should be
		display: Display.Standard,
		theme: decideTheme({ pillar: trail.pillar, design }),
		design,
	};
	const palette = decidePalette(format);
	return {
		...trail,
		format,
		palette,
	};
};
