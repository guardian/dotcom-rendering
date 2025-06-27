import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { grid } from '../grid';
import { type ArticleFormat } from '../lib/articleFormat';
import { getImage } from '../lib/image';
import { palette } from '../palette';
import { type ImageBlockElement } from '../types/content';
import { GalleryCaption } from './GalleryCaption';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	image: ImageBlockElement;
	pageId: string;
	webTitle: string;
};

const styles = css`
	${grid.paddedContainer}
	grid-auto-flow: row dense;

	${until.tablet} {
		border-top: 1px solid ${palette('--article-border')};
		padding-top: ${space[1]}px;
	}

	${from.tablet} {
		border-left: 1px solid ${palette('--article-border')};
		border-right: 1px solid ${palette('--article-border')};
	}
`;

export const GalleryImage = ({ format, image, pageId, webTitle }: Props) => {
	const asset = getImage(image.media.allImages);

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
