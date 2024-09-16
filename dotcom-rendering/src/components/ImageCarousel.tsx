import { css } from '@emotion/react';
import { palette, space, textSansBold12 } from '@guardian/source/foundations';
import { takeFirst } from '../lib/tuple';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';

const carouselWrapperStyles = css`
	display: flex;
	aspect-ratio: 4 / 3;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: scroll;
`;

const imageWrapperStyles = css`
	aspect-ratio: 4 / 3;
	scroll-snap-align: start;
`;

const figureStyles = css`
	position: relative;
`;

const captionStyles = css`
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

export const ImageCarousel = ({
	images,
	imageSize,
	isDynamo = false,
	display = 5,
}: {
	images: readonly DCRSlideshowImage[];
	imageSize: ImageSizeType;
	fade?: number;
	display?: number;
	isDynamo?: boolean;
}) => (
	<ul css={carouselWrapperStyles}>
		{takeFirst(images, 10).map((slideshowImage, index, { length }) => {
			const isNotFirst = index > 0;
			const loading = isNotFirst ? 'lazy' : 'eager';

			return (
				<li css={imageWrapperStyles}>
					<figure css={figureStyles} key={slideshowImage.imageSrc}>
						<CardPicture
							mainImage={slideshowImage.imageSrc}
							imageSize={imageSize}
							alt={slideshowImage.imageCaption}
							loading={loading}
						/>
						{!!slideshowImage.imageCaption && (
							<figcaption css={captionStyles}>
								{slideshowImage.imageCaption}
							</figcaption>
						)}
					</figure>
				</li>
			);
		})}
	</ul>
);
