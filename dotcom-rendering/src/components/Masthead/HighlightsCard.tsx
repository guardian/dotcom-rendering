import { css } from '@emotion/react';
import type { DCRFrontImage } from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
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

export const HighlightsCard = ({
	headlineText,
	format,
	showPulsingDot,
	kickerText,
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
		</div>
	);
};
