import { ArticleDesign } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';
import type { Props as CardProps } from './Card/Card';
import { Card } from './Card/Card';

type Props = {
	trail: DCRFrontCard;
} & Partial<CardProps> &
	Pick<CardProps, 'imageLoading'>;

/**
 * A wrapper around the normal Card component providing sensible defaults for Cards on front containers.
 *
 * Any prop used by the original Card can be used in FrontCard to override the defaults.
 *
 * Note: Below parameters are not an exhaustive list of params used by FrontCard, rather they are a list of
 * commonly overridden params to make it easier for a developer to know if they actually need to override these values.
 *
 * @param props
 * @param [props.headlineSize] - Defaults to "medium"
 * @param [props.imagePosition] - Defaults to "top"
 * @param [props.imagePositionOnMobile] - Defaults to "left"
 * @param [props.imageSize] - Defaults to "small"
 * @param [props.supportingContent] - Defaults to undefined, set to trail.supportingContent if you want this card to show sublinks.
 * @param [props.trailText] - Defaults to undefined, set to `trail.trailText` if you want this card to show trail text.
 */
export const FrontCard = (props: Props) => {
	const { trail, ...cardProps } = props;
	const defaultProps: Omit<CardProps, 'imageLoading'> = {
		linkTo: trail.url,
		format: trail.format,
		headlineText: trail.headline,
		byline: trail.byline,
		showByline: trail.showByline,
		showQuotedHeadline: trail.showQuotedHeadline,
		webPublicationDate: trail.webPublicationDate,
		kickerText: trail.kickerText,
		showPulsingDot: trail.format.design === ArticleDesign.LiveBlog,
		showClock: false,
		imageUrl: trail.image,
		imageAltText: trail.imageAltText,
		isCrossword: trail.isCrossword,
		isPlayableMediaCard: true,
		starRating: trail.starRating,
		dataLinkName: trail.dataLinkName,
		snapData: trail.snapData,
		discussionApiUrl: trail.discussionApiUrl,
		discussionId: trail.discussionId,
		avatarUrl: trail.avatarUrl,
		mainMedia: trail.mainMedia,
		isExternalLink: trail.isExternalLink,
		branding: trail.branding,
		slideshowImages: trail.slideshowImages,
		showLivePlayable: trail.showLivePlayable,
	};

	return Card({ ...defaultProps, ...cardProps });
};
