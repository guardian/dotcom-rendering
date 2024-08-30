import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import { grid } from '../grid';
import { getLargest, getMaster, isSupported } from '../lib/image';
import { palette } from '../palette';
import type { ImageBlockElement } from '../types/content';
import { type Image } from '../types/content';
import { GalleryCaption } from './GalleryCaption';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	image: ImageBlockElement;
	pageId: string;
	webTitle: string;
};

const getImage = (images: Image[]): Image | undefined => {
	const image = getMaster(images) ?? getLargest(images);

	if (image?.url === undefined || !isSupported(image.url)) {
		return undefined;
	}

	return image;
};

const styles = css`
	${grid.column.all}
	display: grid;
	grid-template-columns: subgrid;
	grid-auto-flow: row dense;
	background-color: ${palette('--article-inner-background')};

	@supports not (grid-template-columns: subgrid) {
		${grid.container}
	}

	${until.tablet} {
		border-top: 1px solid ${palette('--article-border')};
		padding-top: ${space[1]}px;
	}

	${from.tablet} {
		&::before {
			${grid.between('viewport-start', 'centre-column-start')}
			grid-row: span 2;
			content: '';
			background-color: ${palette('--article-background')};
			border-right: 1px solid ${palette('--article-border')};
		}

		&::after {
			${grid.between('centre-column-end', 'viewport-end')}
			grid-row: span 2;
			content: '';
			background-color: ${palette('--article-background')};
			border-left: 1px solid ${palette('--article-border')};
		}
	}

	${from.desktop} {
		&::after {
			${grid.between('right-column-end', 'viewport-end')}
			grid-row: span 1;
		}

		&::before {
			grid-row: span 1;
		}
	}

	${from.leftCol} {
		&::before {
			${grid.between('viewport-start', 'left-column-start')}
		}
	}
`;

export const GalleryImage = ({ format, image, pageId, webTitle }: Props) => {
	const asset = getImage(image.media.allImages);

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
				alt={image.data.alt ?? ''}
				format={format}
				role={image.role}
				master={asset.url}
				width={width}
				height={height}
				loading="lazy"
			/>
			<GalleryCaption
				captionHtml={image.data.caption}
				credit={image.data.credit}
				displayCredit={image.displayCredit}
				format={format}
				pageId={pageId}
				webTitle={webTitle}
			/>
		</figure>
	);
};
