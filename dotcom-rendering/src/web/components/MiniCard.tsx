import { css } from '@emotion/react';
import { body, space } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import type { DCRContainerPalette } from 'src/types/front';
import type { TrailType } from 'src/types/trails';
import { generateImageURL } from '../../lib/generateImageURL';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';

const imageStyles = css`
	width: 7.5rem;
	padding-right: 0.625rem;
`;

type Props = {
	trail: TrailType;
	showImage: boolean;
	containerPalette?: DCRContainerPalette;
};

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
			cssOverrides={css`
				${body.medium()}
				font-weight: bold;
				line-height: ${space[6]}px;
				${containerOverrides &&
				`color: ${containerOverrides.text.cardHeadline}`}

				display: flex;
				align-items: flex-start;
			`}
		>
			{showImage && (
				<img css={imageStyles} src={image} alt={trail.headline} />
			)}
			<span>{trail.headline}</span>
		</Link>
	);
};
