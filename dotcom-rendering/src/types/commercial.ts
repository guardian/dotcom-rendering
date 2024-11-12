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

export interface AdTargetParam {
	name: string;
	value: string | string[];
}

type CustomParams = {
	sens: 't' | 'f';
	urlkw: string[];
	[key: string]: string | string[] | number | number[] | boolean | boolean[];
};

export type AdTargeting =
	| {
			adUnit: string;
			customParams: CustomParams;
			disableAds?: false;
	  }
	| {
			disableAds: true;
	  };
