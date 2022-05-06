import { decideFormat } from '../web/lib/decideFormat';

// There are certain collections used to add things like global styles to a front page
// which we don't want to use on DCR as we'd like to try and migrate these styles into DCR itself.
const blockedCollections = [
	'ba744122-6c99-417f-8ddd-5a5905eb4928', // Palette styles new do not delete
];

const enhanceSupportingContent = (
	supportingContent: FESupportingContent[],
	format: ArticleFormat,
): DCRSupportingContent[] => {
	return supportingContent.map((subLink) => ({
		// Some sublinks are to fronts and so don't have a `format` property
		format: (subLink.format && decideFormat(subLink.format)) || format,
		headline: subLink.header?.headline || '',
		url: subLink.properties.href || subLink.header?.url,
		kickerText: subLink.header?.kicker?.item?.properties.kickerText,
	}));
};

const enhanceCards = (collections: FEFrontCard[]): DCRFrontCard[] =>
	collections.map((faciaCard) => {
		const format = decideFormat(faciaCard.format || {});
		return {
			format,
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
				? enhanceSupportingContent(faciaCard.supportingContent, format)
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
			return {
				id,
				displayName,
				collectionType,
				containerPalette: decideContainerPalette(
					collection.config.metadata,
				),
				curated: enhanceCards(collection.curated),
				backfill: enhanceCards(collection.backfill),
				treats: enhanceCards(collection.treats),
			};
		});
};
