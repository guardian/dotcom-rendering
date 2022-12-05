import { css } from '@emotion/react';
import { body } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import type { DCRContainerPalette } from 'src/types/front';
import type { TrailType } from 'src/types/trails';
import { generateImageURL } from '../../lib/generateImageURL';
import { ContainerOverrides } from '../../types/palette';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';

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

/**
 * A simpler form of card that does not have any of the complexities of a normal card such as sublinks, kickers, format, etc.
 *
 * Primarily used for rendering Snaps in containers such as @see NavList
 */
export const MiniCard = ({ trail, showImage, containerPalette }: Props) => {
	const containerOverrides =
		containerPalette && decideContainerOverrides(containerPalette);

	const image =
		trail.image &&
		generateImageURL({
			master: trail.image,
			imageWidth: 300,
			resolution: 'low',
		});

	return (
		<Link
			href={trail.url}
			priority="secondary"
			subdued={true}
			cssOverrides={[linkStyles, linkOverrideStyles(containerOverrides)]}
		>
			{showImage && (
				<img css={imageStyles} src={image} alt={trail.headline} />
			)}
			<span>{trail.headline}</span>
		</Link>
	);
};
