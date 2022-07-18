import type { DCRSnapType, FESnapType } from '../types/front';

/**
 *
 * This function takes a `FESnapType` and turns it into a `DCRSnapType`. It mutates
 * certain properties such as embedCss to work with Emotion.
 *
 * @returns the DCR snap with its properties mutated
 */
export const enhanceSnaps = (
	snap: FESnapType | undefined,
): DCRSnapType | undefined => {
	const dcrSnap = snap;

	// Emotion doesn't parse this conditional CSS correctly which is used by some thrashers to check
	// if there’s a page skin. This regex fixes the vast majority of these cases should allow future snaps
	// to be built with DCR in mind.
	if (dcrSnap?.embedCss) {
		dcrSnap.embedCss = dcrSnap.embedCss.replace(
			/body:not\(\.has-active-pageskin\)(?! &)/g,
			'body:not(.has-active-pageskin) &',
		);
	}

	return dcrSnap;
};
