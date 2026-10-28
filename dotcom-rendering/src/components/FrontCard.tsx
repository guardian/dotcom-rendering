import { css } from '@emotion/react';
import { ArticleDesign } from '../lib/articleFormat';
import { isMediaCard } from '../lib/cardHelpers';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { DCRFrontCard } from '../types/front';
import type { Props as CardProps } from './Card/Card';
import { Card } from './Card/Card';
import { CustomSubNav } from './Masthead/Titlepiece/CustomSubNav';

type Props = {
	trail: DCRFrontCard;
} & Partial<CardProps> &
	Pick<CardProps, 'imageLoading' | 'serverTime'>;

/**
 * A wrapper around the normal Card component providing sensible defaults for Cards on front containers.
 *
 * Any prop used by the original Card can be used in FrontCard to override the defaults.
 *
 * Note: Below parameters are not an exhaustive list of params used by FrontCard, rather they are a list of
 * commonly overridden params to make it easier for a developer to know if they actually need to override these values.
 *
 * @param props
 * @param [props.mediaPositionOnDesktop] - Defaults to "top"
 * @param [props.mediaPositionOnMobile] - Defaults to "left"
 * @param [props.mediaSize] - Defaults to "small"
 * @param [props.supportingContent] - Defaults to undefined, set to trail.supportingContent if you want this card to show sublinks.
 * @param [props.trailText] - Defaults to undefined, set to `trail.trailText` if you want this card to show trail text.
 */
export const FrontCard = (props: Props) => {
	const { trail, ...cardProps } = props;

	const contentSpacing =
		isMediaCard(trail.format) || trail.isNewsletter ? 'large' : undefined;

	const defaultProps: Omit<CardProps, 'imageLoading' | 'serverTime'> = {
		articleMedia: trail.articleMedia,
		avatarUrl: trail.avatarUrl,
		branding: trail.branding,
		byline: trail.byline,
		contentSpacing,
		dataLinkName: trail.dataLinkName,
		discussionApiUrl: trail.discussionApiUrl,
		discussionId: trail.discussionId,
		format: trail.format,
		headlineText: trail.headline,
		image: trail.image,
		isCrossword: trail.isCrossword,
		isExternalLink: trail.isExternalLink,
		isNewsletter: trail.isNewsletter,
		kickerText: trail.kickerText,
		linkTo: trail.url,
		mainMedia: trail.mainMedia,
		showByline: trail.showByline,
		showClock: false,
		showLivePlayable: trail.showLivePlayable,
		showPulsingDot: trail.format.design === ArticleDesign.LiveBlog,
		showQuotedHeadline: trail.showQuotedHeadline,
		showVideo: trail.showVideo,
		slideshowImages: trail.slideshowImages,
		snapData: trail.snapData,
		starRating: trail.starRating,
		uniqueId: trail.uniqueId,
		webPublicationDate: trail.webPublicationDate,
		headlineTestUuid: trail.headlineTestUuid,
	};

	const headerContent =
		trail.showMiniNav && trail.miniNavData ? (
			<div
				css={css`
					position: relative;
					z-index: ${getZIndex('card-nested-link')};
					min-width: 0;
					--masthead-nav-link-text: ${palette('--article-text')};
					--masthead-nav-link-text-hover: ${palette(
						'--article-text',
					)};
				`}
			>
				<CustomSubNav
					customSubNav={trail.miniNavData}
					currentNavLink=""
					renderingPage="article"
					underlineHeader={true}
					showHeaderDivider={false}
					scrollHeaderWithLinks={true}
				/>
			</div>
		) : undefined;

	return Card({
		...defaultProps,
		...cardProps,
		...(headerContent && { headerContent }),
	});
};
