import { css } from '@emotion/react';
import { body, breakpoints } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import type { DCRContainerPalette } from 'src/types/front';
import type { TrailType } from 'src/types/trails';
import { ContainerOverrides } from '../../types/palette';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
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
`;

const linkOverrideStyles = (containerOverrides?: ContainerOverrides) => css`
	${containerOverrides && `color: ${containerOverrides.text.cardHeadline}`}
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
	const sources = generateSources(image, [
		{ breakpoint: breakpoints.desktop, width: 120 },
	]);

	const [source] = sources.slice(-1);

	return (
		<picture css={[imageStyles]}>
			{/* High resolution (HDPI) sources*/}
			<source
				srcSet={source.hiResUrl}
				media={`(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)`}
			/>
			{/* Low resolution (MDPI) source*/}
			<source srcSet={source.lowResUrl} />

			<img alt={alt} src={source.lowResUrl} />
		</picture>
	);
};

/**
 * A simpler form of card that does not have any of the complexities of a normal card such as sublinks, kickers, format, etc.
 *
 * Primarily used for rendering Snaps in containers such as @see NavList
 */
export const MiniCard = ({ trail, showImage, containerPalette }: Props) => {
	const containerOverrides =
		containerPalette && decideContainerOverrides(containerPalette);

	return (
		<Link
			href={trail.url}
			priority="secondary"
			subdued={true}
			cssOverrides={[linkStyles, linkOverrideStyles(containerOverrides)]}
		>
			{showImage && trail.image && (
				<MiniCardPicture image={trail.image} alt={trail.headline} />
			)}
			<span>{trail.headline}</span>
		</Link>
	);
};
