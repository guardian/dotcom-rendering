import { ArticleSpecial, ArticleDesign } from '@guardian/libs';
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
const decideSubLinkFormat = ({
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
		linkFormat.design === ArticleDesign.Media ||
		linkFormat.theme === ArticleSpecial.SpecialReport ||
		linkFormat.design === ArticleDesign.Analysis
	)
		return containerFormat;
	// Otherwise, we can allow the sublink to express its own styling
	return linkFormat;
};

// There are certain collections used to add things like global styles to a front page
// which we don't want to use on DCR as we'd like to try and migrate these styles into DCR itself.
const blockedCollections = [
	'ba744122-6c99-417f-8ddd-5a5905eb4928', // Palette styles new do not delete
];

const enhanceSupportingContent = (
	supportingContent: FESupportingContent[],
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
): DCRSupportingContent[] => {
	return supportingContent.map((subLink) => ({
		format: decideSubLinkFormat({
			linkFormat: subLink.format
				? decideFormat(subLink.format)
				: undefined,
			containerFormat: format,
			containerPalette,
		}),
		headline: subLink.header?.headline || '',
		url: subLink.properties.href || subLink.header?.url,
		kickerText: subLink.header?.kicker?.item?.properties.kickerText,
	}));
};

const enhanceCards = (
	collections: FEFrontCard[],
	containerPalette?: DCRContainerPalette,
): DCRFrontCard[] =>
	collections.map((faciaCard, index) => {
		// Cards with snaps won't have a set format.
		const format = decideFormat(faciaCard.format || {});
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
			kickerText: faciaCard.header.kicker?.item?.properties.kickerText,
			supportingContent: faciaCard.supportingContent
				? enhanceSupportingContent(
						faciaCard.supportingContent,
						format,
						containerPalette,
				  )
				: undefined,
			type: faciaCard.type,
			enriched: faciaCard.enriched,
		};
	});

const decideContainerPalette = (
	metadata?: { type: FEContainerPalette }[],
): DCRContainerPalette | undefined => {
	return metadata?.length && metadata[0].type ? metadata[0].type : undefined;
};

export const enhanceCollections = (
	collections: FECollectionType[],
): DCRCollectionType[] => {
	return collections
		.filter((collection) => !blockedCollections.includes(collection.id))
		.map((collection) => {
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
