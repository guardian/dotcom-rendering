import { decideDesign } from '@root/src/web/lib/decideDesign';
import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDisplay } from './decideDisplay';
import { decidePalette } from './decidePalette';

export const decideTrail = (trail: CAPITrailType): TrailType => {
	// We don't have tags here so we send an empty array
	const display = decideDisplay(trail.format);
	const design = decideDesign(trail.format);
	const theme = decideTheme(trail.format);

	const format: Format = {
		display,
		theme,
		design,
	};
	const palette = decidePalette(format);
	return {
		...trail,
		format,
		palette,
	};
};
