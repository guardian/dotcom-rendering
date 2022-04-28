import { decideFormat } from '../web/lib/decideFormat';

const enhanceSupportingContent = (
	supportingContent: FESupportingContent[],
	format: ArticleFormat,
): DCRSupportingContent[] => {
	return supportingContent.map((subLink) => ({
		// Some sublinks are to fronts and so don't have a `format` property
		format: (subLink.format && decideFormat(subLink.format)) || format,
		headline: subLink.header?.headline || '',
		url: subLink.properties.href,
		kickerText: subLink.header?.kicker?.item?.properties.kickerText,
	}));
};

const enhanceCards = (collections: FEFrontCard[]): DCRFrontCard[] =>
	collections
		.filter(
			(card: FEFrontCard): card is FEFrontCard & { format: CAPIFormat } =>
				!!card.format,
		)
		.map((faciaCard) => {
			const format = decideFormat(faciaCard.format);
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
				kickerText:
					faciaCard.header.kicker?.item?.properties.kickerText,
				supportingContent: faciaCard.supportingContent
					? enhanceSupportingContent(
							faciaCard.supportingContent,
							format,
					  )
					: undefined,
			};
		});

export const enhanceCollections = (
	collections: FECollectionType[],
): DCRCollectionType[] => {
	return collections.map((collection) => {
		const { id, displayName, collectionType } = collection;
		return {
			id,
			displayName,
			collectionType,
			curated: enhanceCards(collection.curated),
			backfill: enhanceCards(collection.backfill),
			treats: enhanceCards(collection.treats),
		};
	});
};
