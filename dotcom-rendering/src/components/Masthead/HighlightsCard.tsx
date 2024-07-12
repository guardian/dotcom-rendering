import { css } from '@emotion/react';
import type { DCRFrontImage } from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import { Avatar } from '../Avatar';
import { AvatarContainer } from '../Card/components/AvatarContainer';
import { CardHeadline } from '../CardHeadline';
import type { Loading } from '../CardPicture';

export type HighlightsCardProps = {
	linkTo: string;
	format: ArticleFormat;
	headlineText: string;
	showQuotedHeadline?: boolean;
	image?: DCRFrontImage;
	imageLoading: Loading;
	avatarUrl?: string;
	mainMedia?: MainMedia;
	kickerText?: string;
	showPulsingDot?: boolean;
	dataLinkName?: string;
	byline?: string;
	showMediaIcon?: boolean;
};

const gridContainer = css`
	display: grid;

	grid-template-areas:
		'headline 	headline'
		'media-icon image';
`;

const headline = css`
	grid-area: 'headline';
`;

const mediaIcon = css`
	grid-area: 'media-icon';
`;
const image = css`
	grid-area: 'image';
`;

export const HighlightsCard = ({
	linkTo,
	format,
	headlineText,
	showQuotedHeadline,
	image,
	imageLoading,
	avatarUrl,
	mainMedia,
	kickerText,
	showPulsingDot,
	dataLinkName,
	byline,
	showMediaIcon,
}: HighlightsCardProps) => {
	return (
		<div css={gridContainer}>
			<div css={headline}>
				<CardHeadline
					headlineText={headlineText}
					format={format}
					size={'medium'}
					showPulsingDot={showPulsingDot}
					kickerText={kickerText}
				/>
			</div>
			<div css={mediaIcon}>{showMediaIcon ? <></> : <div></div>}</div>
			<div css={image}>
				{avatarUrl ? (
					<AvatarContainer
						imageSize={'medium'}
						imagePositionOnDesktop={'none'}
					>
						<Avatar
							src={avatarUrl}
							alt={byline ?? ''}
							shape="cutout"
						/>
					</AvatarContainer>
				) : (
					<p>test</p>
				)}{' '}
			</div>
		</div>
	);
};
