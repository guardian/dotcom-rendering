import { ArticleDesign } from '@guardian/libs';
import type { Props as CardProps } from './Card/Card';
import { Card } from './Card/Card';

type Props = {
	trail: TrailType;
} & Partial<CardProps>;

/**
 * A wrapper around the normal Card component providing sensible defaults for Cards on front containers.
 * @param {string} [headlineSize=medium]
 * @property {string} [imagePosition=top]
 * @property {string} [imagePositionOnMobile=left]
 * @property {string} [imageSize=medium]
 */
export const FrontCard = (props: Props) => {
	const { trail } = props;
	const defaultProps: CardProps = {
		linkTo: trail.url,
		format: trail.format,
		headlineText: trail.headline,
		byline: trail.byline,
		showByline: trail.showByline,
		showQuotes:
			trail.format.design === ArticleDesign.Comment ||
			trail.format.design === ArticleDesign.Letter,
		webPublicationDate: trail.webPublicationDate,
		kickerText: trail.kickerText,
		showPulsingDot: trail.format.design === ArticleDesign.LiveBlog,
		showSlash: true,
		showClock: false,
		imageUrl: trail.image,
		mediaType: trail.mediaType,
		mediaDuration: trail.mediaDuration,
		starRating: trail.starRating,
		branding: trail.branding,
		dataLinkName: trail.dataLinkName,
		snapData: trail.snapData,
		discussionId: trail.discussionId,
		supportingContent: trail.supportingContent,
	};

	return Card({ ...defaultProps, ...props });
};
