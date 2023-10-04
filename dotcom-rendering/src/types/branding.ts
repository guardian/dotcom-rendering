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

export type BrandingKind = 'paid-content' | 'foundation' | 'sponsored';

export type SponsorshipBranding = {
	kind: BrandingKind;
	isFrontBranding: boolean;
	branding: Branding;
};

export type EditorialBranding = {
	kind: 'editorial';
	badge: DCRBadgeType;
};

/**
 * The type of branding that can be applied to any given collection
 */
export type CollectionBranding = SponsorshipBranding | EditorialBranding;
