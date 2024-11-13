import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSansBold12,
} from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { takeFirst } from '../lib/tuple';
import { palette } from '../palette';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';

const themeButton: Partial<ThemeButton> = {
	borderTertiary: palette('--carousel-chevron-border'),
	textTertiary: palette('--carousel-chevron'),
	backgroundTertiaryHover: palette('--carousel-chevron-hover'),
};

const themeButtonDisabled: Partial<ThemeButton> = {
	borderTertiary: palette('--carousel-chevron-border-disabled'),
	textTertiary: palette('--carousel-chevron-disabled'),
	backgroundTertiaryHover: 'transparent',
};

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
	color: ${sourcePalette.neutral[100]};
	padding: 60px ${space[2]}px ${space[2]}px;
`;

const buttonStyles = css`
	display: flex;
	justify-content: flex-end;
	gap: ${space[2]}px;
	margin-top: ${space[2]}px;
`;

export const SlideshowCarousel = ({
	images,
	imageSize,
}: {
	images: readonly DCRSlideshowImage[];
	imageSize: ImageSizeType;
}) => (
	<div>
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
								<figcaption css={captionStyles}>
									{image.imageCaption}
								</figcaption>
							)}
						</figure>
					</li>
				);
			})}
		</ul>
		<div css={buttonStyles}>
			<Button
				hideLabel={true}
				iconSide="left"
				icon={<SvgChevronLeftSingle />}
				// onClick={() => scrollTo('left')}
				priority="tertiary"
				theme={themeButtonDisabled}
				size="small"
				// disabled={!previousButtonEnabled}
				// TODO
				// aria-label="Previous story"
				// data-link-name="container left chevron"
			/>

			<Button
				hideLabel={true}
				iconSide="left"
				icon={<SvgChevronRightSingle />}
				// onClick={() => scrollTo('right')}
				priority="tertiary"
				theme={themeButton}
				size="small"
				// disabled={!nextButtonEnabled}
				// TODO
				// aria-label="Next story"
				// data-link-name="container right chevron"
			/>
		</div>
	</div>
);
