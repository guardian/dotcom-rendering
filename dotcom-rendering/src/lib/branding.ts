import { decideEditorialBadge } from '../model/decideEditorialBadge';
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

export const badgeFromBranding = (
	collectionBranding: CollectionBranding | undefined,
): DCRBadgeType | undefined => {
	switch (collectionBranding?.kind) {
		case 'paid-content':
		case 'sponsored':
		case 'foundation': {
			const { logo } = collectionBranding.branding;
			return {
				imageSrc: logo.src,
				href: logo.link,
			};
		}
		case 'editorial': {
			return collectionBranding.badge;
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
	seriesTag,
	cards,
	editionId,
}: {
	frontBranding: Branding | undefined;
	couldDisplayFrontBranding: boolean;
	seriesTag: string | undefined;
	cards: CardWithBranding[];
	editionId: EditionId;
}): CollectionBranding | undefined => {
	// If this collection is eligible to display front branding
	// AND there is front branding defined, we should display it
	if (couldDisplayFrontBranding && frontBranding !== undefined) {
		const kind = getBrandingType([frontBranding]);
		if (!kind) {
			return undefined;
		}
		return {
			kind,
			isFrontBranding: true,
			branding: frontBranding,
		};
	}

	// If the series tag of this collection matches an editorial badge, we should use that
	const editorialBadge = decideEditorialBadge(seriesTag);
	if (editorialBadge) {
		return {
			kind: 'editorial',
			badge: editorialBadge,
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
	if (frontBranding !== undefined && brandingEqual(frontBranding, branding)) {
		return undefined;
	}

	// Ensure each of the card's branding has the same sponsor
	if (!everyCardHasSameSponsor(brandingForCards)) {
		return undefined;
	}

	return {
		kind,
		isFrontBranding: false,
		branding,
	};
};
