import type { EditionId } from '../lib/edition.ts';
import type { Branding } from './branding.ts';

export interface EditionCommercialProperties {
	adTargeting: AdTargetParam[];
	branding?: Branding;
}

export type CommercialProperties = {
	[E in EditionId]: EditionCommercialProperties;
};
