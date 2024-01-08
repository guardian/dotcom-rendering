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

/**
 * Branding that can be applied to an entire collection on a front
 *
 * The `kind` property here is used to disambiguate the kind of branding
 * a collection can have:
 * - Those funded by a third party
 * - Those that have an editorial badge from a hardcoded set
 */
export type CollectionBranding =
	| {
			/**
			 * A collection can have branding that is funded by a third party
			 */
			kind: BrandingType['name'];
			branding: Branding;
			/**
			 * In certain circumstances a collection might display the branding on behalf of an entire front
			 * In that case this property is true
			 */
			isFrontBranding: boolean;
			/**
			 * In certain circumstances a collection might display the branding only on its own container.
			 * Is eligible to display a brand logo.
			 */
			isContainerBranding: boolean;
			/**
			 * In certain circumstances a collection may display multiple brands within one container.
			 */
			hasMultipleBranding: boolean;
	  }
	| {
			/**
			 * Collections from certain series can have an 'editorial' badge selected from a hardcoded set
			 */
			kind: 'editorial';
			badge: DCRBadgeType;
	  };
