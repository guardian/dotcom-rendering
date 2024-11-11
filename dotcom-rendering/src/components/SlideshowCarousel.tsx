import { css } from '@emotion/react';
import { palette, space, textSansBold12 } from '@guardian/source/foundations';
import { takeFirst } from '../lib/tuple';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';

const carouselStyles = css`
	display: flex;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overscroll-behavior: contain auto;
	/**
	 * Hide scrollbars
	 * See: https://stackoverflow.com/a/38994837
	 */
	::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	scrollbar-width: none; /* Firefox */
`;

const carouselItemStyles = css`
	position: relative;
	flex: 1 0 100%;
	scroll-snap-align: start;
`;

const caption = css`
	${textSansBold12}
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.8) 100%
	);
	color: ${palette.neutral[100]};
	padding: 60px ${space[2]}px ${space[2]}px;
`;

export const SlideshowCarousel = ({
	images,
	imageSize,
}: {
	images: readonly DCRSlideshowImage[];
	imageSize: ImageSizeType;
}) => (
	<ul css={carouselStyles}>
		{takeFirst(images, 10).map((image, index) => {
			const loading = index > 0 ? 'lazy' : 'eager';
			return (
				<li css={carouselItemStyles} key={image.imageSrc}>
					<figure>
						<CardPicture
							mainImage={image.imageSrc}
							imageSize={imageSize}
							aspectRatio="5:4"
							alt={image.imageCaption}
							loading={loading}
						/>
						{!!image.imageCaption && (
							<figcaption css={caption}>
								{image.imageCaption}
							</figcaption>
						)}
					</figure>
				</li>
			);
		})}
	</ul>
);
