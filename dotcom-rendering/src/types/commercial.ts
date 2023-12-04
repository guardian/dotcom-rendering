import type { EditionId } from '../lib/edition';
import type { Branding } from './branding';

export interface EditionCommercialProperties {
	adTargeting: AdTargetParam[];
	branding?: Branding;
}

export type CommercialProperties = {
	[E in EditionId]: EditionCommercialProperties;
};

/**
 * key: a front, e.g. "uk" or "uk/sport"
 * value: an array of collection names
 */
export type FrontsBannerAdCollections = {
	[key: string]: string[];
};
