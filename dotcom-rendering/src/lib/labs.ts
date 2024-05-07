import type { Branding } from '../types/branding';
import type { EditionId } from './edition';

export const getOphanComponents = ({
	branding,
	locationPrefix,
}: {
	branding: Branding;
	/**
	 * Allows clicks to be attributed to different areas of content
	 */
	locationPrefix: 'article-meta' | 'article-related-content';
}): { ophanComponentName: string; ophanComponentLink: string } => {
	const formattedSponsorName = branding.sponsorName
		.toLowerCase()
		.replace(' ', '-');
	const componentName = `${locationPrefix}-${formattedSponsorName}`;
	return {
		ophanComponentName: `labs-logo | ${componentName}`,
		ophanComponentLink: `labs-logo-${componentName}`,
	};
};

export const getLabsUrlSuffix = (editionId: EditionId): string => {
	switch (editionId) {
		case 'AU':
			return '-australia';
		case 'US':
			return '-us';
		default:
			return '';
	}
};
