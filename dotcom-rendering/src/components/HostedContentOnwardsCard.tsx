import { css } from '@emotion/react';
import { space, textSansBold15 } from '@guardian/source/foundations';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';

type Props = {
	trail: TrailType;
};

type CardPictureProps = {
	image: string;
	alt: string;
};

const imageStyles = css`
	width: 120px;
`;

const imageWrapperStyles = css`
	position: relative;
	order: 1;
`;

const mediaOverlayContainerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: ${getZIndex('mediaOverlay')};
	cursor: pointer;
`;

const hoverStyles = css`
	&:hover .media-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: ${palette('--card-background-hover')};
	}

	&:hover {
		text-decoration: underline;
		color: ${palette('--card-headline')};
	}
`;

const linkStyles = css`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	text-decoration: none;
	gap: ${space[2]}px;
	position: relative;

	${hoverStyles}
`;

const headingStyles = css`
	${textSansBold15}
	color: ${palette('--card-headline')};
	order: 2;
`;

const CardPicture = ({ image, alt }: CardPictureProps) => {
	return (
		<div css={imageWrapperStyles}>
			<picture>
				<img alt={alt} src={image} css={imageStyles} />
			</picture>
			<div css={mediaOverlayContainerStyles}>
				<div className="media-overlay" />
			</div>
		</div>
	);
};

export const HostedContentOnwardsCard = ({ trail }: Props) => {
	return (
		<a href={trail.url} css={linkStyles}>
			<h3 css={headingStyles}>{trail.headline}</h3>
			{!!trail.image && (
				<CardPicture
					image={trail.image.src}
					alt={trail.image.altText || trail.headline}
				/>
			)}
		</a>
	);
};
