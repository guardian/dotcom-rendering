import { css, keyframes } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { takeFirst } from '../lib/tuple';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';

/** in second */
const SLIDE_DISPLAY_DURATION = 5;
/** in seconds */
const SLIDE_FADE_DURATION = 1;
/** in seconds */
const SLIDE_TOTAL_DURATION = SLIDE_DISPLAY_DURATION + SLIDE_FADE_DURATION;

/**
 * We pass the result of the Emotion `keyframes` utility (decided here) to the animation-name
 * css property
 */
const decideAnimationName = (duration: number, isLastSlide: boolean) => {
	const EXTRA_LENGTH = isLastSlide ? 0 : SLIDE_FADE_DURATION * 1.1;
	const stages = [
		{ time: 0, opacity: 0 },
		{ time: SLIDE_FADE_DURATION, opacity: 1 },
		{ time: SLIDE_TOTAL_DURATION + EXTRA_LENGTH, opacity: 1 },
		{
			time: SLIDE_TOTAL_DURATION + SLIDE_FADE_DURATION + EXTRA_LENGTH,
			opacity: 0,
		},
	] as const satisfies ReadonlyArray<{
		time: number;
		opacity: number;
	}>;
	return keyframes(
		stages.map(
			({ time, opacity }) =>
				`${(time / duration) * 100}% { opacity: ${opacity}; }`,
		),
	);
};

const hideOnMobile = css`
	${until.tablet} {
		display: none;
	}
`;

/** Only applied to images beyond the first one */
const animationStyles = ({
	slideIndex,
	slideshowLength,
	imageSize,
}: {
	slideIndex: number;
	slideshowLength: number;
	imageSize: ImageSizeType;
}) => {
	const delay = SLIDE_TOTAL_DURATION * slideIndex - SLIDE_FADE_DURATION;

	const duration = SLIDE_TOTAL_DURATION * slideshowLength;

	const animationName = decideAnimationName(
		duration,
		slideIndex == slideshowLength - 1,
	);

	const animationCss = css`
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;

		animation-delay: ${delay}s;
		animation-direction: normal;
		animation-duration: ${duration}s;
		animation-iteration-count: infinite;
		animation-name: ${animationName};
		animation-timing-function: linear;
		opacity: 0;

		/* https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion */
		@media (prefers-reduced-motion: reduce) {
			animation: none;
			opacity: ${slideIndex === 0 ? 1 : 0};
		}
	`;

	if (imageSize === 'small') {
		return css`
			${from.tablet} {
				${animationCss}
			}
		`;
	}
	return css`
		${animationCss}
	`;
};

const captionStyles = css`
	${textSans.xxsmall({ fontWeight: 'bold' })}
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

const additionalDynamoCaptionStyles = css`
	${from.tablet} {
		top: 0;
		bottom: initial;
		padding-top: ${space[2]}px;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0) 100%
		);
	}
`;

/**
 * Slideshow
 * =========
 *
 * Uses the perpetual canon effect to create a slideshow of images using only css. It:
 *
 * - overlays images over each other so they are stacked
 * - positions and styles the given caption values
 * - adds an animation effect to each image such that it only has opacity 1 for a short period
 * - uses animation-delay to stagger the start for each image's animation, thus
 *   causing the slideshow effect
 *
 *  ```
 *   image 1 : ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ (always visible)
 *   image 2 : ▁▁▁▁▁╱▔▔▔▔▔▔╲▁▁▁▁▁▁▁▁▁▁▁ (fades after next is fully opaque)
 *   image 3 : ▁▁▁▁▁▁▁▁▁▁▁╱▔▔▔▔▔▔╲▁▁▁▁▁ (fades after next is fully opaque)
 *   image 4 : ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁╱▔▔▔▔▔╲ (fades directly after display)
 *       time →     →     →     →     →
 *  ```
 *
 * What's a perpetual canon?
 * -------------------------
 * It's basically when a bunch of people sing Row, Row, Row Your Boat but the next person doesn't
 * start until you reach the end of Gently down the stream.
 *
 */
export const Slideshow = ({
	images,
	imageSize,
	isDynamo,
}: {
	images: readonly DCRSlideshowImage[];
	imageSize: ImageSizeType;
	isDynamo?: boolean;
}) => (
	<>
		{takeFirst(images, 5).map((slideshowImage, index) => {
			const isNotFirst = index > 0;
			const loading = isNotFirst ? 'lazy' : 'eager';
			return (
				<figure
					key={slideshowImage.imageSrc}
					css={[
						isNotFirst &&
							animationStyles({
								slideIndex: index,
								slideshowLength: images.length,
								imageSize,
							}),
						// When small and on mobile, hide all images except the first one
						isNotFirst && imageSize === 'small' && hideOnMobile,
					]}
				>
					<CardPicture
						master={slideshowImage.imageSrc}
						imageSize={imageSize}
						alt={slideshowImage.imageCaption}
						loading={loading}
					/>
					{!!slideshowImage.imageCaption && (
						<figcaption
							css={[
								captionStyles,
								isDynamo
									? additionalDynamoCaptionStyles
									: undefined,
								// Don't show captions on mobile for small images
								imageSize === 'small' && hideOnMobile,
							]}
						>
							{slideshowImage.imageCaption}
						</figcaption>
					)}
				</figure>
			);
		})}
	</>
);
