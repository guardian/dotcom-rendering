import { css } from '@emotion/react';
import { space, textSansBold15 } from '@guardian/source/foundations';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';

type Props = {
	trail: TrailType;
};

type CardPictureProps = {
	image: string;
	alt: string;
};

const imageStyles = css`
	width: 120px;
	margin-right: ${space[2]}px;
	order: 1;
`;

const linkStyles = css`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	text-decoration: none;
`;

const headingStyles = css`
	${textSansBold15}
	color: ${palette('--card-headline')};
	order: 2;
`;

const CardPicture = ({ image, alt }: CardPictureProps) => {
	return (
		<picture>
			<img alt={alt} src={image} css={imageStyles} />
		</picture>
	);
};

export const HostedContentOnwardsCard = ({ trail }: Props) => {
	return (
		<a href={trail.url} css={linkStyles}>
			<h3 css={headingStyles}>{trail.headline}</h3>
			{!!trail.image && (
				<CardPicture
					image={trail.image.src}
					alt={trail.image.altText || trail.headline}
				/>
			)}
		</a>
	);
};
