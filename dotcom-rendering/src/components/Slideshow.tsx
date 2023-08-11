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

/** in seconds */
const DISPLAY_DURATION = 5;
const FADING_DURATION = DISPLAY_DURATION / 5;

/**
 * We pass the result of the Emotion `keyframes` utility (decided here) to the animation-name
 * css property
 */
function decideAnimationName(slideshowLength: number) {
	if (slideshowLength === 1) {
		return keyframes`from {opacity: 1} to {opacity:1}`;
	}

	const totalLoopTime = decideDuration(slideshowLength) / 100;
	// Calculate the percentages for how long each animation stage lasts
	const stages = [
		0,
		FADING_DURATION,
		FADING_DURATION + DISPLAY_DURATION + FADING_DURATION,
		FADING_DURATION + DISPLAY_DURATION + FADING_DURATION + FADING_DURATION,
	] as const;
	// Generate and return a keyframes name for this animation
	return keyframes`
		${`${stages[0] / totalLoopTime}%`} {opacity: 0;}
		${`${stages[1] / totalLoopTime}%`} {opacity: 1;}
		${`${stages[2] / totalLoopTime}%`} {opacity: 1;}
		${`${stages[3] / totalLoopTime}%`} {opacity: 0;}
	`;
}

/**
 * How long the whole animation loop will last for before it starts again
 */
function decideDuration(slideshowLength: number) {
	return slideshowLength * (DISPLAY_DURATION + FADING_DURATION);
}

/**
 * Decide how long each image should wait to start their animation sequence based
 * on how many images there are and how long we show each image for.
 */
function decideDelay(imageIndex: number) {
	return (DISPLAY_DURATION + FADING_DURATION) * imageIndex - FADING_DURATION;
}

const hideOnMobile = css`
	${until.tablet} {
		display: none;
	}
`;

/**
 * Applied to all images except the first one. The first image holds the space open for
 * all the others to be positioned on top of
 */
const overlayImage = css`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
`;

const animationStyles = ({
	imageIndex,
	slideshowLength,
	imageSize,
}: {
	imageIndex: number;
	slideshowLength: number;
	imageSize: ImageSizeType;
}) => {
	const delay = decideDelay(imageIndex);

	const duration = decideDuration(slideshowLength);

	const animationName = decideAnimationName(slideshowLength);

	const animationCss = css`
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
			opacity: ${imageIndex === 0 ? 1 : 0};
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
 *                 time ->
 *   image-1 > ####|----|----|----
 *   image-2 > ----|####|----|----
 *   image-3 > ----|----|####|----
 *   image-4 > ----|----|----|####
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
						isNotFirst && overlayImage,
						animationStyles({
							imageIndex: index,
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
