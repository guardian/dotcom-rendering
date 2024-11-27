import { css } from '@emotion/react';
import { Fragment } from 'react';
import { getSourceImageUrl } from '../lib/getSourceImageUrl_temp_fix';
import { palette } from '../palette';
import { useConfig } from './ConfigContext';
import { generateSources, getFallbackSource } from './Picture';

const picture = css`
	height: 100%;
	width: 100%;
	overflow: hidden;
	min-width: 60px;
`;

const round = css`
	border-radius: 100%;
	background-color: ${palette('--avatar-background')};
`;

const img = css`
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

/**
 * Used on `picture` and `img` to prevent having a line-height,
 * as these elements are which are `inline` by default.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#styling_with_css
 */
const block = css`
	display: block;
`;

/**
 * Defines the possible shapes for the Avatar component.
 * - 'cutout': The avatar has a flat bottom and no background fill.
 * - 'round': The avatar is a round cutout with a filled background.
 */
type AvatarShape = 'cutout' | 'round';

/**
 * Props for the Avatar component.
 *
 * @property {string} src - The source URL of the avatar image.
 * @property {string} alt - The alternative text for the avatar image.
 * @property {AvatarShape} [shape='round'] - Determines the avatar design shape.  The default is 'round'.
 */
type Props = {
	src: string;
	alt: string;
	shape?: AvatarShape;
};

export const Avatar = ({ src, alt, shape = 'round' }: Props) => {
	const sources = generateSources(getSourceImageUrl(src), [
		{ breakpoint: 320, width: 75 },
		{ breakpoint: 740, width: 140 },
	]);

	/**
	 * The assumption here is readers on devices that do not support srcset
	 * are likely to be on poor network connections so we're going
	 * to fallback to the smallest image at low resolution.
	 *
	 * Sources are ordered in `descendingByBreakpoint` order,
	 * so the last one is the smallest.
	 */
	const fallbackSource = getFallbackSource(sources);

	const { renderingTarget } = useConfig();
	const isApps = renderingTarget === 'Apps';
	return (
		<picture
			// data-size={imageSize}
			css={[
				block,
				picture,
				shape === 'round' && round,
				isApps &&
					css`
						background-color: ${palette(
							'--avatar-background-colour',
						)};
					`,
			]}
		>
			{sources.map((source) => {
				return (
					<Fragment key={source.breakpoint}>
						{/* High resolution (HDPI) sources*/}
						<source
							srcSet={source.hiResUrl}
							media={`(min-width: ${source.breakpoint}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${source.breakpoint}px) and (min-resolution: 120dpi)`}
						/>
						{/* Low resolution (MDPI) source*/}
						<source
							srcSet={source.lowResUrl}
							media={`(min-width: ${source.breakpoint}px)`}
						/>
					</Fragment>
				);
			})}

			<img alt={alt} src={fallbackSource.lowResUrl} css={[block, img]} />
		</picture>
	);
};
