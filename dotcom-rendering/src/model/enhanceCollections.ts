import { ArticleDesign } from '@guardian/libs';
import { decideFormat } from '../web/lib/decideFormat';

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
				isLiveBlog: format.design === ArticleDesign.LiveBlog,
				url: faciaCard.header.url,
				headline: faciaCard.header.headline,
				webPublicationDate: faciaCard.card.webPublicationDateOption
					? new Date(
							faciaCard.card.webPublicationDateOption,
					  ).toISOString()
					: undefined,
				image: faciaCard.properties.maybeContent?.trail.trailPicture
					?.allImages[0].url,
				kickerText:
					faciaCard.header.kicker?.item?.properties.kickerText,
			};
		});

export const enhanceCollections = (
	collections: FECollectionType[],
): DCRCollectionType[] => {
	return collections.map((collection) => {
		return {
			...collection,
			curated: enhanceCards(collection.curated),
			backfill: enhanceCards(collection.backfill),
			treats: enhanceCards(collection.treats),
		};
	});
};
