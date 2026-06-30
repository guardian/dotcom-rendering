import { css } from '@emotion/react';
import { space, textSansBold15 } from '@guardian/source/foundations';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';

type Props = {
	trail: TrailType;
	isGalleryPage?: boolean;
};

type CardPictureProps = {
	image: string;
	alt: string;
	width?: string;
};

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
	text-decoration: none;
	gap: ${space[2]}px;
	position: relative;
	${hoverStyles}
`;

const horizontalStyles = css`
	display: flex;
	flex-direction: row-reverse;
	/* Needed due to row-reverse direction */
	justify-content: flex-end;
	align-items: flex-start;
`;
const verticalStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const headingStyles = css`
	${textSansBold15}
	color: ${palette('--card-headline')};
`;

const CardPicture = ({ image, alt, width }: CardPictureProps) => {
	return (
		<>
			<picture>
				<img
					alt={alt}
					src={image}
					css={css`
						width: ${width};
					`}
				/>
			</picture>
			<div css={mediaOverlayContainerStyles}>
				<div className="media-overlay" />
			</div>
		</>
	);
};

export const HostedContentOnwardsCard = ({
	trail,
	isGalleryPage = false,
}: Props) => {
	return (
		<a
			href={trail.url}
			css={[
				linkStyles,
				isGalleryPage ? verticalStyles : horizontalStyles,
			]}
		>
			<h3 css={headingStyles}>{trail.headline}</h3>
			{!!trail.image && (
				<CardPicture
					image={trail.image.src}
					alt={trail.image.altText || ''}
					width={isGalleryPage ? '100%' : '120px'}
				/>
			)}
		</a>
	);
};
