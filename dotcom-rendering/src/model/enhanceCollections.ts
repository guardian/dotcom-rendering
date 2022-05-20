import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { decideFormat } from '../web/lib/decideFormat';
import { getDataLinkNameCard } from '../web/lib/getDataLinkName';

/**
 *
 * This function makes the decision about when we use the parent's (the
 * container's) format property to override the styling of a sublink, and
 * when we allow the sublink to express its own styling.
 *
 * Eg. If you had a sublink to a lifestyle article, when should it use pink for
 * the kicker and when would that not look right
 *
 * @returns the format property that we will use to style the sublink
 */
const decidePresentationFormat = ({
	linkFormat,
	containerFormat,
	containerPalette,
}: {
	linkFormat?: ArticleFormat;
	containerFormat: ArticleFormat;
	containerPalette?: DCRContainerPalette;
}): ArticleFormat => {
	// Some sublinks are to fronts and so don't have a `format` property
	if (!linkFormat) return containerFormat;
	// If the container has a special palette, use the container format
	if (containerPalette) return containerFormat;
	// These types of article styles have background styles that sublinks
	// need to respect so we use the container format here
	if (
		linkFormat.design === ArticleDesign.LiveBlog ||
		linkFormat.design === ArticleDesign.Gallery ||
		linkFormat.design === ArticleDesign.Audio ||
		linkFormat.design === ArticleDesign.Video ||
		linkFormat.theme === ArticleSpecial.SpecialReport ||
		linkFormat.design === ArticleDesign.Analysis
	)
		return containerFormat;
	// Otherwise, we can allow the sublink to express its own styling
	return linkFormat;
};

const enhanceSupportingContent = (
	supportingContent: FESupportingContent[],
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
): DCRSupportingContent[] => {
	return supportingContent.map((subLink) => {
		// This is the actual DCR format for this sublink
		const linkFormat = subLink.format
			? decideFormat(subLink.format)
			: undefined;
		// This is the format used to decide how the sublink looks (we vary this based
		// on the container background colour)
		const presentationFormat = decidePresentationFormat({
			linkFormat,
			containerFormat: format,
			containerPalette,
		});
		return {
			format: presentationFormat,
			headline: subLink.header?.headline || '',
			url: subLink.properties.href || subLink.header?.url,
			kickerText:
				subLink.header?.kicker?.item?.properties.kickerText ||
				(linkFormat && linkFormat.design === ArticleDesign.LiveBlog
					? 'Live'
					: undefined),
		};
	});
};

const enhanceCards = (
	collections: FEFrontCard[],
	containerPalette?: DCRContainerPalette,
): DCRFrontCard[] =>
	collections
		.filter(
			(card: FEFrontCard): card is FEFrontCard & { format: CAPIFormat } =>
				!!card.format,
		)
		.map((faciaCard, index) => {
			const format = decideFormat(faciaCard.format);
			const group = `${faciaCard.card.group}${
				faciaCard.display.isBoosted ? '+' : ''
			}`;
			const dataLinkName = getDataLinkNameCard(format, group, index + 1);
			return {
				format,
				dataLinkName,
				url: faciaCard.header.url,
				headline: faciaCard.header.headline,
				trailText: faciaCard.card.trailText,
				webPublicationDate: faciaCard.card.webPublicationDateOption
					? new Date(
							faciaCard.card.webPublicationDateOption,
					  ).toISOString()
					: undefined,
				image: faciaCard.properties.maybeContent?.trail.trailPicture
					?.allImages[0].url,
				kickerText:
					faciaCard.header.kicker?.item?.properties.kickerText,
				supportingContent: faciaCard.supportingContent
					? enhanceSupportingContent(
							faciaCard.supportingContent,
							format,
							containerPalette,
					  )
					: undefined,
			};
		});

const decideContainerPalette = (
	metadata?: { type: FEContainerPalette }[],
): DCRContainerPalette | undefined => {
	switch (metadata?.[0]?.type) {
		case 'EventPalette':
			return 'EventPalette';
		case 'SombreAltPalette':
			return 'SombreAltPalette';
		case 'EventAltPalette':
			return 'EventAltPalette';
		case 'InvestigationPalette':
			return 'InvestigationPalette';
		case 'LongRunningAltPalette':
			return 'LongRunningAltPalette';
		case 'LongRunningPalette':
			return 'LongRunningPalette';
		case 'SombrePalette':
			return 'SombrePalette';
		case 'BreakingPalette':
			return 'BreakingPalette';
		case 'Canonical':
		case 'Dynamo':
		case 'Special':
		case 'DynamoLike':
		case 'Breaking':
		case 'Podcast':
		case 'Branded':
		default:
			return undefined;
	}
};

export const enhanceCollections = (
	collections: FECollectionType[],
): DCRCollectionType[] => {
	return collections.map((collection) => {
		const { id, displayName, collectionType } = collection;
		const containerPalette = decideContainerPalette(
			collection.config.metadata,
		);
		return {
			id,
			displayName,
			collectionType,
			containerPalette,
			curated: enhanceCards(collection.curated, containerPalette),
			backfill: enhanceCards(collection.backfill, containerPalette),
			treats: enhanceCards(collection.treats, containerPalette),
		};
	});
};
