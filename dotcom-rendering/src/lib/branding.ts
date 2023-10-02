import type { Branding, EditionBranding } from '../types/branding';
import type { EditionId } from './edition';

export const pickBrandingForEdition = (
	editionBrandings: EditionBranding[],
	editionId: EditionId,
): Branding | undefined =>
	editionBrandings.find(
		({ edition, branding }) => edition.id === editionId && branding,
	)?.branding;
