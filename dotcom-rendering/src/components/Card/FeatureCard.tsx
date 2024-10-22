import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import { palette } from '../../palette';
import type { DCRFrontImage } from '../../types/front';
import { CardHeadline } from '../CardHeadline';
import type { Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';
import { FormatBoundary } from '../FormatBoundary';

export type FeatureCardProps = {
	linkTo: string;
	format: ArticleFormat;
	headlineText: string;
	showQuotedHeadline: boolean;
	image?: DCRFrontImage;
	imageLoading?: Loading;
	avatarUrl?: string;
	kickerText?: string;
	dataLinkName: string;
	byline?: string;
	isExternalLink: boolean;
};

const hoverStyles = css`
	:hover .image-overlay {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
		border-radius: 100%;
		background-color: ${palette('--highlights-card-headline')};
		opacity: 0.1;
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */
	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

const headline = css`
	position: absolute;
	bottom: 10%;
	left: 0;
	width: 100%;
	z-index: 10000;
	margin-left: 5px;
`;

const imageArea = css`
	height: 396px;
	width: 300px;
	position: relative;
	display: flex;
	justify-content: center;
`;

const imageWrapper = css`
	position: relative;
	height: 396px;
	width: 300px;
	overflow: hidden;
`;

const blurredOverlay = css`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 33%;
	backdrop-filter: blur(1rem); /* Apply blur effect */
	z-index: 9999;
`;

const imageStyle = css`
	height: 100%;
	width: 100%;
	object-fit: cover;
	object-position: center;
`;

export const FeatureCard = ({
	linkTo,
	format,
	headlineText,
	showQuotedHeadline,
	image,
	imageLoading = 'lazy',
	avatarUrl,
	kickerText,
	dataLinkName,
	byline,
	isExternalLink,
}: FeatureCardProps) => {
	return (
		// <div className="image-overlay"> </div> {/* This image overlay is styled when the CardLink is hovered */} 			{/* <CardPicture
		// 	imageSize="jumbo"
		// 	mainImage={image.src}
		// 	alt={image.altText}
		// 	loading={imageLoading}
		// 	aspectRatio='5:4'
		// /> */}

		<FormatBoundary format={format}>
			{/* <div css={[hoverStyles]}> */}
			<div>
				<div css={imageArea}>
					{image && (
						<>
							<div id="imagewrapper" css={imageWrapper}>
								<img
									src={image.src}
									alt={image.altText}
									css={imageStyle}
								/>
								<div css={blurredOverlay}></div>
							</div>
						</>
					)}
				</div>
				<div css={headline}>
					<CardHeadline
						headlineText={headlineText}
						format={format}
						size="medium"
						sizeOnMobile="small"
						showPulsingDot={
							format.design === ArticleDesign.LiveBlog
						}
						kickerText={kickerText}
						isExternalLink={isExternalLink}
						showQuotes={showQuotedHeadline}
					/>
				</div>
			</div>
		</FormatBoundary>
	);
};
