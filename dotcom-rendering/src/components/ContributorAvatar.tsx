import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import { getSourceImageUrl } from '../lib/getSourceImageUrl_temp_fix';
import { generateSources, getFallbackSource, Sources } from './Picture';

/** All images are authored at 720 × 600 pixels² */
const ratio = 6 / 5;

const widths = [
	{ breakpoint: breakpoints.mobile, width: 180 },
	{ breakpoint: breakpoints.mobileLandscape, width: 216 },
] as const satisfies ReadonlyArray<{ breakpoint: number; width: number }>;

const imageStyles = css`
	width: ${widths[0].width}px;
	height: ${widths[0].width / ratio}px;

	${from.mobileLandscape} {
		width: ${widths[1].width}px;
		height: ${widths[1].width / ratio}px;
	}
`;

/**
 * Used on `picture` and `img` to prevent having a line-height,
 * as these elements are `inline` by default.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#styling_with_css
 */
const block = css`
	display: block;
`;

type Props = {
	imageSrc: string;
	imageAlt: string;
};

export const ContributorAvatar = ({ imageSrc, imageAlt }: Props) => {
	const sources = generateSources(getSourceImageUrl(imageSrc), widths);

	return (
		<picture css={block}>
			<Sources sources={sources} />
			<img
				alt={imageAlt}
				src={getFallbackSource(sources).lowResUrl}
				css={[block, imageStyles]}
			/>
		</picture>
	);
};
