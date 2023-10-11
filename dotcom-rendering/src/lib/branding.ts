import { decideEditorialBadge } from '../model/decideEditorialBadge';
import type { DCRBadgeType } from '../types/badge';
import type {
	Branding,
	BrandingKind,
	CollectionBranding,
	EditionBranding,
} from '../types/branding';
import type { EditionId } from './edition';
import { guard } from './guard';
import type { NonEmptyArray } from './non-empty-array';
import { isNonEmptyArray } from './non-empty-array';

/**
 * For the sake of determine branding on a collection, these are the only
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

const isCollectionBrandingKind = guard([
	'paid-content',
	'sponsored',
	'foundation',
] as const);

const getBrandingType = ([
	firstBranding,
	...restBranding
]: NonEmptyArray<Branding>): BrandingKind | undefined => {
	const name = firstBranding.brandingType?.name;

	if (!isCollectionBrandingKind(name)) {
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

	const editorialBadge = decideEditorialBadge(seriesTag);
	if (editorialBadge) {
		return {
			kind: 'editorial',
			badge: editorialBadge,
		};
	}

	const brandingForCards = getBrandingFromCards(cards, editionId);

	if (!brandingForCards) {
		return undefined;
	}

	const kind = getBrandingType(brandingForCards);

	if (!kind) {
		return undefined;
	}

	const [branding] = brandingForCards;

	if (frontBranding && brandingEqual(frontBranding, branding)) {
		return undefined;
	}

	if (!everyCardHasSameSponsor(brandingForCards)) {
		return undefined;
	}

	return {
		kind,
		isFrontBranding: false,
		branding,
	};
};
