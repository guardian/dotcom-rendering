import type { Branding } from '../types/branding';

export const getOphanComponents = (
	branding: Branding,
): { ophanComponentName: string; ophanComponentLink: string } => {
	const formattedSponsorName = branding.sponsorName
		.toLowerCase()
		.replace(' ', '-');
	const componentName = `article-${formattedSponsorName}`;
	return {
		ophanComponentName: `labs-logo | ${componentName}`,
		ophanComponentLink: `labs-logo-${componentName}`,
	};
};
