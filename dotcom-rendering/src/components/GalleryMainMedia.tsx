import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import { grid } from '../grid';
import { getImage } from '../lib/image';
import type { FEElement, ImageBlockElement } from '../types/content';
import { Picture } from './Picture';

const getMainMediaImage = (
	elements: FEElement[],
): ImageBlockElement | undefined =>
	elements.filter(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement',
	)[0];

const styles = css`
	${grid.column.all}
	height: calc(80vh - 48px);
	grid-row: 1/5;

	${from.desktop} {
		height: calc(100vh - 48px);
	}
`;

type Props = {
	elements: FEElement[];
	format: ArticleFormat;
};

export const GalleryMainMedia = ({ elements, format }: Props) => {
	const mainMedia = getMainMediaImage(elements);

	if (mainMedia === undefined) {
		return null;
	}

	const asset = getImage(mainMedia.media.allImages);

	if (asset === undefined) {
		return null;
	}

	const width = parseInt(asset?.fields.width, 10);
	const height = parseInt(asset?.fields.height, 10);

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
