import type { Branding } from '../types/branding';
import type {
	CommercialProperties,
	EditionCommercialProperties,
} from '../types/commercial';

/**
 * Sponsorship logo should never be wider than 140px.
 * This method returns dimensions in the correct aspect ratio,
 * capped at 140px wide.
 */
const cappedDimensions = ({
	logo: { dimensions },
}: Branding): { width: number; height: number } => {
	if (dimensions.width <= 140) return dimensions;
	const scaling = 140 / dimensions.width;
	return {
		width: 140,
		height: Math.round(dimensions.height * scaling),
	};
};

const enhanceEditionCommercialProperties = (
	properties: EditionCommercialProperties,
): EditionCommercialProperties => {
	const { branding } = properties;
	if (!branding) return properties;

	const dimensions = cappedDimensions(branding);
	return {
		...properties,
		branding: {
			...branding,
			logo: {
				...branding.logo,
				dimensions,
			},
		},
	};
};

export const enhanceCommercialProperties = ({
	UK,
	US,
	AU,
	INT,
	EUR,
}: CommercialProperties): CommercialProperties => ({
	UK: enhanceEditionCommercialProperties(UK),
	US: enhanceEditionCommercialProperties(US),
	AU: enhanceEditionCommercialProperties(AU),
	INT: enhanceEditionCommercialProperties(INT),
	EUR: enhanceEditionCommercialProperties(EUR),
});
