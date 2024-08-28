import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
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

	@supports not (grid-template-columns: subgrid) {
		${grid.container}
	}

	border-top: 1px solid ${palette('--gallery-image-border')};
	padding-top: ${space[1]}px;
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
