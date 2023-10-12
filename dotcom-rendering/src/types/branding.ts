import type { EditionId } from '../lib/edition';
import type { DCRBadgeType } from './badge';

type BrandingLogo = {
	src: string;
	link: string;
	label: string;
	dimensions: { width: number; height: number };
};

/**
 * @see https://github.com/guardian/commercial-shared/blob/35cdf4e1/src/main/scala/com/gu/commercial/branding/BrandingType.scala
 */
export type BrandingType =
	| { name: 'paid-content' }
	| { name: 'foundation' }
	| { name: 'sponsored' };

export interface Branding {
	brandingType?: BrandingType;
	sponsorName: string;
	logo: BrandingLogo;
	aboutThisLink: string;
	logoForDarkBackground?: BrandingLogo;
}

export interface EditionBranding {
	edition: {
		id: EditionId;
	};
	branding?: Branding;
}

export type BrandingKind = BrandingType['name'];

/**
 * Branding that can be applied to an entire collection on a front
 */
export type CollectionBranding =
	| {
			kind: BrandingKind;
			/**
			 * In certain circumstances a collection might display the branding on behalf of an entire front
			 * In that case this property is true
			 */
			isFrontBranding: boolean;
			branding: Branding;
	  }
	| {
			/**
			 * Collections from certain series can have an 'editorial' badge selected set hardcoded in DCR
			 */
			kind: 'editorial';
			badge: DCRBadgeType;
	  };
