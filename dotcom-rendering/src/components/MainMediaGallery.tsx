import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { grid } from '../grid';
import { type ArticleFormat } from '../lib/articleFormat';
import { getImage } from '../lib/image';
import { type ImageBlockElement } from '../types/content';
import { Picture } from './Picture';

type Props = {
	mainMedia: ImageBlockElement;
	format: ArticleFormat;
};

const styles = css`
	${grid.column.all}
	height: calc(80vh - 48px);
	grid-row: 1/8;
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

	return (
		<figure css={styles}>
			<Picture
				alt={mainMedia.data.alt ?? ''}
				format={format}
				role={mainMedia.role}
				master={asset.url}
				width={width}
				height={height}
				loading="eager"
				isMainMedia={true}
			/>
		</figure>
	);
};
