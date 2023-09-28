import type { Keyframes } from '@emotion/react';
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

/**
 * To set the `animation-name` property in Emotion’s `css` method.
 *
 * @see https://emotion.sh/docs/keyframes
 *
 * @param {object} options
 * @param {number} options.fade duration of the fade, in seconds
 * @param {number} options.display duration of the display, in seconds
 * @returns {Keyframes}
 */
const decideAnimationName = ({
	length,
	index,
	fade,
	display,
}: {
	length: number;
	index: number;
	fade: number;
	display: number;
}): Keyframes => {
	const last = index === length - 1;
	const duration = length * (fade + display);

	const stages = [
		{ time: 0, opacity: 0 },
		{ time: fade, opacity: 1 },
		{ time: fade + display + fade * (last ? 0 : 1), opacity: 1 },
		{ time: fade + display + fade * (last ? 1 : 1.01), opacity: 0 },
	] as const satisfies ReadonlyArray<{
		time: number;
		opacity: 0 | 1;
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

const animationStyles = (animation: Keyframes) => css`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;

	animation-name: ${animation};
	animation-direction: normal;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	opacity: 0;

	/* https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion */
	@media (prefers-reduced-motion: reduce) {
		display: none;
	}
`;

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
			to top,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.8) 100%
		);
	}
`;

/**
 * Slideshow
 * =========
 *
 * Infinitely display a series of slides using CSS animations only,
 * using a technique similar to a musical “round” or “perpetual canon”.
 *
 * - overlays images over each other so they are stacked
 * - positions and styles the given caption values
 * - adds an animation effect to images such that they are only opaque for a short period
 * - uses a staggered delay to the animation which creates the slideshow effect
 *
 *  ```
 *   image 1 : ████████████████████████████ (not animated, always visible)
 *
 *   image 2 : ▁▁▁▁▁▃▅███████▁▁▁▁▁▁▁▁▁▁▁▁▁▁ (fades in, off after 3 is fully opaque)
 *
 *   image 3 : ▁▁▁▁▁▁▁▁▁▁▁▁▃▅███████▁▁▁▁▁▁▁ (fades in, off after 4 is fully opaque)
 *
 *   image 4 : ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▃▅█████▅▃ (fades in and out)
 *       time →     →     →     →     →
 *  ```
 *
 * What's a perpetual canon?
 * -------------------------
 * It's basically when a bunch of people sing Row, Row, Row Your Boat but the next person doesn't
 * start until you reach the end of Gently down the stream.
 *
 * @see https://en.wikipedia.org/wiki/Round_(music)
 */
export const Slideshow = ({
	images,
	imageSize,
	isDynamo = false,
	fade = 1,
	display = 5,
}: {
	images: readonly DCRSlideshowImage[];
	imageSize: ImageSizeType;
	fade?: number;
	display?: number;
	isDynamo?: boolean;
}) => (
	<>
		{takeFirst(images, 5).map((slideshowImage, index, { length }) => {
			const isNotFirst = index > 0;
			const loading = isNotFirst ? 'lazy' : 'eager';

			const delay = (fade + display) * index - fade;
			const animation = decideAnimationName({
				length,
				index,
				fade,
				display,
			});

			const styles = isNotFirst
				? [
						animationStyles(animation),
						// When small and on mobile, hide all images except the first one
						imageSize === 'small' && hideOnMobile,
				  ]
				: undefined;
			return (
				<figure
					style={{
						animationDelay: `${delay}s`,
						animationDuration: `${length * (fade + display)}s`,
					}}
					key={slideshowImage.imageSrc}
					css={styles}
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
								isDynamo && additionalDynamoCaptionStyles,
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
