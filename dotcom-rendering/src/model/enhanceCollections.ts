import { ArticleSpecial, ArticleDesign } from '@guardian/libs';
import { decideFormat } from '../web/lib/decideFormat';

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
	linkFormat?: CAPIFormat;
	containerFormat: ArticleFormat;
	containerPalette?: DCRContainerPalette;
}): ArticleFormat => {
	// Some sublinks are to fronts and so don't have a `format` property
	if (!linkFormat) return containerFormat;
	// If the container has a special palette, use the container format
	if (containerPalette) return containerFormat;
	// Convert from CAPI to DCR format
	const dcrLinkFormat = decideFormat(linkFormat);
	// These types of article styles have background styles that sublinks
	// need to respect so we use the container format here
	if (
		dcrLinkFormat.design === ArticleDesign.LiveBlog ||
		dcrLinkFormat.design === ArticleDesign.Media ||
		dcrLinkFormat.theme === ArticleSpecial.SpecialReport
	)
		return containerFormat;
	// Otherwise, we can allow the sublink to express its own styling
	return dcrLinkFormat;
};

const enhanceSupportingContent = (
	supportingContent: FESupportingContent[],
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
): DCRSupportingContent[] => {
	return supportingContent.map((subLink) => ({
		format: decideSubLinkFormat({
			linkFormat: subLink.format,
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
							containerPalette,
					  )
					: undefined,
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
