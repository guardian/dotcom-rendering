import type { FESnap } from '../frontend/feFront';
import type { DCRSnapType, SnapAtoms } from '../types/front';

/**
 * Maps the atom block elements sent on a snap (each as its own optional field)
 * into a single `SnapAtoms` object, if any are present.
 */
const enhanceSnapAtoms = (snap: FESnap): SnapAtoms | undefined => {
	const atoms: SnapAtoms = {
		guide: snap.GuideAtom,
		qanda: snap.QandaAtom,
		profile: snap.ProfileAtom,
		timeline: snap.TimelineAtom,
		audio: snap.AudioAtom,
		explainer: snap.ExplainerAtom,
		cta: snap.CtaAtom,
	};

	const hasAtom = Object.values(atoms).some((atom) => atom !== undefined);

	return hasAtom ? atoms : undefined;
};

/**
 *
 * This function takes a `FESnapType` and turns it into a `DCRSnapType`. It mutates
 * certain properties such as embedCss to work with Emotion.
 *
 * @returns the DCR snap with its properties mutated
 */
export const enhanceSnaps = (
	snap: FESnap | undefined,
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

	if (dcrSnap) {
		return {
			...dcrSnap,
			atoms: enhanceSnapAtoms(dcrSnap),
		};
	}

	return dcrSnap;
};
