import { css } from '@emotion/react';
import { space, textSansBold15 } from '@guardian/source/foundations';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';

type Props = {
	trail: TrailType;
	isGalleryPage?: boolean;
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
	display: flex;
	flex-direction: row-reverse;
	/* Needed due to row-reverse direction */
	justify-content: flex-end;
	align-items: flex-start;
	text-decoration: none;
	gap: ${space[2]}px;
	position: relative;

	${hoverStyles}
`;

const headingStyles = css`
	${textSansBold15}
	color: ${palette('--card-headline')};
`;

export const HostedContentOnwardsCard = ({
	trail,
	isGalleryPage = false,
}: Props) => {
	return (
		<a href={trail.url} css={linkStyles}>
			<h3 css={headingStyles}>{trail.headline}</h3>
			{!!trail.image && (
				<>
					<picture>
						<img
							alt={trail.image.altText}
							src={trail.image.src}
							style={{ width: isGalleryPage ? '200px' : '120px' }}
						/>
					</picture>
					<div css={mediaOverlayContainerStyles}>
						<div className="media-overlay" />
					</div>
				</>
			)}
		</a>
	);
};
