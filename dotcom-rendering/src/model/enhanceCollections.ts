import { ArticleDesign } from '@guardian/libs';
import { decideFormat } from '../web/lib/decideFormat';

const enhanceCards = (collections: FEFrontCard[]): DCRFrontCard[] => {
	const enhanced: DCRFrontCard[] = [];
	collections.forEach((faciaCard) => {
		if (faciaCard.format) {
			const format = decideFormat(faciaCard.format);
			enhanced.push({
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
			});
		}
	});
	return enhanced;
};

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
