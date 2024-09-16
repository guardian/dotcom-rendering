import { css } from '@emotion/react';
import { palette, space, textSansBold12 } from '@guardian/source/foundations';
import { takeFirst } from '../lib/tuple';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';

const carouselContainer = css`
	display: flex;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const carouselItem = css`
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

export const ImageCarousel = ({
	images,
	imageSize,
}: {
	images: readonly DCRSlideshowImage[];
	imageSize: ImageSizeType;
}) => (
	<div>
		<ul css={carouselContainer}>
			{takeFirst(images, 10).map((slideshowImage, index) => {
				const loading = index > 0 ? 'lazy' : 'eager';

				return (
					<li css={carouselItem} key={slideshowImage.imageSrc}>
						<figure>
							<CardPicture
								mainImage={slideshowImage.imageSrc}
								imageSize={imageSize}
								alt={slideshowImage.imageCaption}
								loading={loading}
							/>
							{!!slideshowImage.imageCaption && (
								<figcaption css={caption}>
									{slideshowImage.imageCaption}
								</figcaption>
							)}
						</figure>
					</li>
				);
			})}
		</ul>
		<span>[1][2][3][4][5] [LEFT] [RIGHT]</span>
	</div>
);
