import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, palette, until } from '@guardian/source/foundations';
// import type { DCRFrontImage } from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import { Avatar } from '../Avatar';
import { CardHeadline } from '../CardHeadline';
// import type { Loading } from '../CardPicture';
import { Icon } from '../MediaMeta';

export type HighlightsCardProps = {
	// linkTo: string;
	format: ArticleFormat;
	headlineText: string;
	// showQuotedHeadline?: boolean;
	// image?: DCRFrontImage;
	// imageLoading: Loading;
	avatarUrl?: string;
	mainMedia?: MainMedia;
	kickerText?: string;
	showPulsingDot?: boolean;
	// dataLinkName?: string;
	byline?: string;
	showMediaIcon?: boolean;
};

const gridContainer = css`
	display: grid;
	background-color: ${palette.neutral[97]};
	gap: 8px;
	grid-template-areas:
		'headline 	headline'
		'media-icon image';

	${until.desktop} {
		height: 194px;
	}
	${from.desktop} {
		width: 300px;
		grid-template-areas:
			'headline 	image'
			'media-icon image';
	}
`;

const headline = css`
	grid-area: headline;
`;

const mediaIcon = css`
	grid-area: media-icon;
	align-self: end;
	width: 24px;
	height: 24px;
	/* We’re using the text colour for the icon badge */
	background-color: ${palette.neutral[10]};
	border-radius: 50%;
	display: inline-block;

	> svg {
		width: 20px;
		height: 20px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 2px;
		display: block;
		fill: ${palette.neutral[97]};
	}
`;

const imageArea = css`
	grid-area: image;
	height: 106px;
	width: 106px;
	${from.desktop} {
		height: 112px;
		width: 112px;
	}
	align-self: end;
`;

export const HighlightsCard = ({
	// linkTo,
	format,
	headlineText,
	// showQuotedHeadline,
	// image,
	// imageLoading,
	avatarUrl,
	mainMedia,
	kickerText,
	showPulsingDot,
	// dataLinkName,
	byline,
	showMediaIcon,
}: HighlightsCardProps) => {
	return (
		<div css={gridContainer}>
			<div css={headline}>
				<CardHeadline
					headlineText={headlineText}
					format={format}
					size="medium"
					showPulsingDot={showPulsingDot}
					kickerText={kickerText}
				/>
			</div>
			{mainMedia && showMediaIcon ? (
				<div css={mediaIcon}>
					<Icon mediaType={mainMedia.type} />
				</div>
			) : null}
			<div css={imageArea}>
				{avatarUrl ? (
					<Avatar src={avatarUrl} alt={byline ?? ''} shape="cutout" />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
