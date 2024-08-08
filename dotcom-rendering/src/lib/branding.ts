import { isUndefined } from '@guardian/libs';
import type { DCRBadgeType } from '../types/badge';
import type {
	Branding,
	BrandingType,
	CollectionBranding,
	EditionBranding,
} from '../types/branding';
import { assertUnreachable } from './assert-unreachable';
import type { EditionId } from './edition';
import type { NonEmptyArray } from './tuple';
import { isNonEmptyArray } from './tuple';

/**
 * For the sake of determining branding on a collection, these are the only
 * properties we care about for any given card
 */
type CardWithBranding = { properties: { editionBrandings: EditionBranding[] } };

export const pickBrandingForEdition = (
	editionBrandings: EditionBranding[],
	editionId: EditionId,
): Branding | undefined =>
	editionBrandings.find(
		({ edition, branding }) => edition.id === editionId && branding,
	)?.branding;

/**
 * Retrieve the branding object from each of the cards in an array of cards, for a given edition
 *
 * @returns `undefined` if AT LEAST ONE of the cards is missing branding,
 * otherwise returns a non-empty array of branding
 */
const getBrandingFromCards = (
	cards: CardWithBranding[],
	editionId: EditionId,
): NonEmptyArray<Branding> | undefined => {
	const brandings: Branding[] = [];
	for (const card of cards) {
		const branding = pickBrandingForEdition(
			card.properties.editionBrandings,
			editionId,
		);
		// If a single card is missing branding then we bail out immediately
		if (!branding) {
			return undefined;
		}
		brandings.push(branding);
	}
	if (!isNonEmptyArray(brandings)) {
		return undefined;
	}
	return brandings;
};

const getBrandingType = ([
	firstBranding,
	...restBranding
]: NonEmptyArray<Branding>): BrandingType['name'] | undefined => {
	const name = firstBranding.brandingType?.name;

	if (!name) {
		return undefined;
	}

	const allNamesMatch = restBranding.every(
		({ brandingType }) => brandingType?.name === name,
	);

	if (!allNamesMatch) {
		return undefined;
	}

	return name;
};

/**
 * Check each branding has the same sponsor name
 */
const everyCardHasSameSponsor = ([
	firstBranding,
	...restBranding
]: NonEmptyArray<Branding>): boolean =>
	restBranding.every(
		(branding) => branding.sponsorName === firstBranding.sponsorName,
	);

/**
 * TODO verify that this is what is necessary for two branding to be equal
 */
const brandingEqual = (b1: Branding, b2: Branding) => {
	return (
		b1.brandingType?.name === b2.brandingType?.name &&
		b1.sponsorName === b2.sponsorName
	);
};

export const isPaidContentSameBranding = (
	collectionBranding?: CollectionBranding,
): boolean =>
	collectionBranding?.kind === 'paid-content' &&
	!collectionBranding.hasMultipleBranding;

export const badgeFromBranding = (
	collectionBranding: CollectionBranding | undefined,
): DCRBadgeType | undefined => {
	switch (collectionBranding?.kind) {
		case 'paid-content': {
			if (collectionBranding.hasMultipleBranding) return undefined;
			const { logo } = collectionBranding.branding;
			return {
				imageSrc: logo.src,
				href: logo.link,
			};
		}
		case 'sponsored':
		case 'foundation': {
			const { logo } = collectionBranding.branding;
			return {
				imageSrc: logo.src,
				href: logo.link,
			};
		}
		case undefined: {
			return undefined;
		}
		default: {
			return assertUnreachable(collectionBranding);
		}
	}
};

export const decideCollectionBranding = ({
	frontBranding,
	couldDisplayFrontBranding,
	cards,
	editionId,
	isContainerBranding,
}: {
	frontBranding: Branding | undefined;
	couldDisplayFrontBranding: boolean;
	cards: CardWithBranding[];
	editionId: EditionId;
	isContainerBranding: boolean;
}): CollectionBranding | undefined => {
	// If this collection is eligible to display front branding
	// AND there is front branding defined, we should display it
	if (couldDisplayFrontBranding && !isUndefined(frontBranding)) {
		const kind = getBrandingType([frontBranding]);
		if (!kind) {
			return undefined;
		}
		return {
			kind,
			isFrontBranding: true,
			branding: frontBranding,
			isContainerBranding,
			hasMultipleBranding: false,
		};
	}

	// Retrieve an array of branding from the cards that belong to the collection
	// If this is valid (aka not undefined), then we can use it to derive the
	// branding of the collection
	const brandingForCards = getBrandingFromCards(cards, editionId);
	if (!brandingForCards) {
		return undefined;
	}

	const kind = getBrandingType(brandingForCards);
	if (!kind) {
		return undefined;
	}

	const [branding] = brandingForCards;

	// If this collection belongs to a front that has branding, and the branding
	// derived from the cards is the same, then don't display this branding.
	// This takes care of the case when another card is displaying the branding
	// on behalf of the whole front and this collection is further down the
	// front, with its branding hidden
	if (!isUndefined(frontBranding) && brandingEqual(frontBranding, branding)) {
		return undefined;
	}

	const hasMultipleBranding = !everyCardHasSameSponsor(brandingForCards);
	if (kind !== 'paid-content' && hasMultipleBranding) {
		return undefined;
	}

	return {
		kind,
		isFrontBranding: false,
		branding,
		isContainerBranding,
		hasMultipleBranding,
	};
};

export const decideTagPageBranding = ({
	branding,
}: {
	branding: Branding;
}): CollectionBranding | undefined => {
	// If this tagpage is eligible to display branding
	// AND there is branding defined, we should display it
	const kind = getBrandingType([branding]);
	if (!kind) return undefined;
	return {
		kind,
		isFrontBranding: true,
		branding,
		isContainerBranding: false,
		hasMultipleBranding: false,
	};
};
