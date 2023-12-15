import { css } from '@emotion/react';
import { body, breakpoints } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { palette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import type { TrailType } from '../types/trails';
import { ContainerOverrides } from './ContainerOverrides';
import { generateSources } from './Picture';

const imageStyles = css`
	width: 120px;
	padding-right: 10px;
`;

const linkStyles = css`
	${body.medium()}
	font-weight: bold;
	display: flex;
	align-items: flex-start;
	text-decoration: none;
	color: ${palette('--card-headline-trail-text')};
`;

type Props = {
	trail: TrailType;
	showImage: boolean;
	containerPalette?: DCRContainerPalette;
};

type MiniCardPictureProps = {
	image: string;
	alt: string;
};

const MiniCardPicture = ({ image, alt }: MiniCardPictureProps) => {
	// Having sizes smaller than 120px is getting to the point of diminishing returns when resizing.
	// Since this image will always be in a 120px wide container theres also not much reason to have sizes larger than 120px
	// The different DPI sources generated are still useful to us however.
	const [source] = generateSources(image, [
		{ breakpoint: breakpoints.desktop, width: 120 },
	]);

	if (!source) throw new Error('Missing source');

	return (
		<picture>
			{/* High resolution (HDPI) sources*/}
			<source
				srcSet={source.hiResUrl}
				media={`(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)`}
			/>
			{/* Low resolution (MDPI) source*/}
			<source srcSet={source.lowResUrl} />

			<img alt={alt} src={source.lowResUrl} css={imageStyles} />
		</picture>
	);
};

/**
 * A simpler form of card that does not have any of the complexities of a normal card such as sublinks, kickers, format, etc.
 *
 * Primarily used for rendering Snaps in containers such as {@linkcode NavList}
 */
export const MiniCard = ({ trail, showImage, containerPalette }: Props) => {
	return (
		<ContainerOverrides
			containerPalette={containerPalette}
			isDynamo={false}
		>
			<Link
				href={trail.url}
				priority="secondary"
				cssOverrides={[linkStyles]}
			>
				{showImage && !!trail.image && (
					<MiniCardPicture image={trail.image} alt={trail.headline} />
				)}
				<span>{trail.headline}</span>
			</Link>
		</ContainerOverrides>
	);
};
