import type { Branding } from './branding';
import type { EditionId } from './edition';

interface EditionCommercialProperties {
	adTargeting: AdTargetParam[];
	branding?: Branding;
}

export type CommercialProperties = {
	[E in EditionId]: EditionCommercialProperties;
};
