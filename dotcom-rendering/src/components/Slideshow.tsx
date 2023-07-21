import { css, keyframes } from '@emotion/react';
import { from, neutral, textSans, until } from '@guardian/source-foundations';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';

/**
 * It might look like you can change these and expect the animation to adapt accordingly
 * but it probably won't 😞
 */
const HANG_TIME = 5;
const FADE_TIME = 1;

/**
 * We pass the result of the Emotion `keyframes` utility (decided here) to the animation-name
 * css property
 */
function decideAnimationName({ slideshowLength }: { slideshowLength: number }) {
	const totalLoopTime = slideshowLength * (HANG_TIME + FADE_TIME);
	// Calculate the percentages for how long each animation stage lasts
	const stageOne = `0%`;
	const stageTwo = `${(100 / totalLoopTime) * FADE_TIME}%`;
	const stageThree = `${(100 / totalLoopTime) * (FADE_TIME + HANG_TIME)}%`;
	const stageFour = `${
		(100 / totalLoopTime) * (FADE_TIME + HANG_TIME + FADE_TIME)
	}%`;
	// Generate and return a keyframes name for this animation
	return keyframes`
		${stageOne} {opacity: 0;}
		${stageTwo} {opacity: 1;}
		${stageThree} {opacity: 1;}
		${stageFour} {opacity: 0;}
	`;
}

/**
 * How long the whole animation loop will last for before it starts again
 */
function decideDuration({ slideshowLength }: { slideshowLength: number }) {
	return slideshowLength * (HANG_TIME + FADE_TIME);
}

/**
 *
 * Decide how long each image should wait to start their animation sequence based
 * on how many images there are and how long we show each image for.
 */
function decideDelay({
	imageIndex,
	slideshowLength,
}: {
	imageIndex: number;
	slideshowLength: number;
}) {
	if (imageIndex === 0) return 0;
	const totalLoopTime = slideshowLength * (HANG_TIME + FADE_TIME);
	const delay = (totalLoopTime / slideshowLength) * imageIndex;
	return delay;
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
	const delay = decideDelay({
		imageIndex,
		slideshowLength,
	});

	const duration = decideDuration({
		slideshowLength,
	});

	const animationName = decideAnimationName({
		slideshowLength,
	});

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
	color: ${neutral[100]};
	padding: 60px 8px 8px;

	${from.tablet} {
		top: 0;
		bottom: initial;
		padding-top: 8px;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0) 100%
		);
	}
`;

/**
 * **Slildeshow**
 *
 * Uses the perpetual canon effect to create a slideshow of images using only css. It:
 *
 * - overlays images over each other so they are stacked
 * - positions and styles the given caption values
 * - adds an animation effect to each image such that it only has opacity 1 for a short period
 * - uses animation-delay to stagger the start for each image's animation, thus
 *   causing the slideshow effect
 *
 *                 time ->
 *   image-1 > ####|----|----|----
 *   image-2 > ----|####|----|----
 *   image-3 > ----|----|####|----
 *   image-4 > ----|----|----|####
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
}: {
	images: DCRSlideshowImage[];
	imageSize: ImageSizeType;
}) => {
	return (
		<>
			{images.map((slideshowImage, index) => {
				return (
					<figure
						key={slideshowImage.imageSrc}
						css={[
							index !== 0 && overlayImage,
							animationStyles({
								imageIndex: index,
								slideshowLength: images.length,
								imageSize,
							}),
							// When small and on mobile, hide all images except the first one
							index !== 0 &&
								imageSize === 'small' &&
								hideOnMobile,
						]}
					>
						<CardPicture
							master={slideshowImage.imageSrc}
							imageSize={imageSize}
							alt={slideshowImage.imageCaption}
						/>
						<figcaption
							css={[
								captionStyles,
								// Don't show captions on mobile for small images
								imageSize === 'small' && hideOnMobile,
							]}
						>
							{slideshowImage.imageCaption}
						</figcaption>
					</figure>
				);
			})}
		</>
	);
};
