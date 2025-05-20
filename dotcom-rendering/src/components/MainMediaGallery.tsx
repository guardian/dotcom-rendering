import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import { grid } from '../grid';
import { type ArticleFormat } from '../lib/articleFormat';
import { getImage } from '../lib/image';
import { type ImageBlockElement } from '../types/content';
import { generateSources, Sources } from './Picture';

type Props = {
	mainMedia: ImageBlockElement;
	format: ArticleFormat;
};

const styles = css`
	${grid.column.all}
	height: calc(80vh - 48px);
	grid-row: 1/5;
	${from.desktop} {
		height: calc(100vh - 48px);
	}
`;

export const MainMediaGallery = ({ mainMedia, format }: Props) => {
	const asset = getImage(mainMedia.media.allImages);

	if (asset === undefined) {
		return null;
	}

	const width = parseInt(asset.fields.width, 10);
	const height = parseInt(asset.fields.height, 10);

	if (isNaN(width) || isNaN(height)) {
		return null;
	}

	const sources = generateSources(asset.url, [
		{ breakpoint: breakpoints.mobile, width: 480 },
		{ breakpoint: breakpoints.mobileLandscape, width: 660 },
		{ breakpoint: breakpoints.phablet, width: 740 },
		{ breakpoint: breakpoints.tablet, width: 980 },
		{ breakpoint: breakpoints.desktop, width: 1140 },
		{ breakpoint: breakpoints.leftCol, width: 1300 },
		{ breakpoint: breakpoints.wide, width: 1900 },
	] as const);

	const fallbackSource = sources[0];

	return (
		<figure css={styles}>
			<picture>
				<Sources sources={sources} />
				<img
					alt={mainMedia.data.alt}
					src={fallbackSource?.lowResUrl}
					width={fallbackSource?.width}
					height={(fallbackSource?.width ?? 1) * 1.0}
				/>
			</picture>
		</figure>
	);
};
