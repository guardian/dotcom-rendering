import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import { grid } from '../grid';
import { type ArticleFormat } from '../lib/articleFormat';
import { getImage } from '../lib/image';
import { palette } from '../palette';
import { type ImageBlockElement } from '../types/content';
import { type RenderingTarget } from '../types/renderingTarget';
import { AppsLightboxImage } from './AppsLightboxImage.importable';
import { GalleryCaption } from './GalleryCaption';
import { Island } from './Island';
import { LightboxLink } from './LightboxLink';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	image: ImageBlockElement;
	pageId: string;
	webTitle: string;
	renderingTarget: RenderingTarget;
};

const styles = css`
	${grid.paddedContainer}
	grid-auto-flow: row dense;
	background-color: ${palette('--article-inner-background')};

	${until.tablet} {
		border-top: 1px solid ${palette('--article-border')};
		padding-top: ${space[1]}px;
	}

	${from.tablet} {
		border-left: 1px solid ${palette('--article-border')};
		border-right: 1px solid ${palette('--article-border')};
	}
`;

const galleryBodyImageStyles = css`
	display: inline;
	position: relative;
	${grid.column.all}

	${from.tablet} {
		${grid.column.centre}
	}

	${from.desktop} {
		padding-bottom: ${space[10]}px;
	}

	${from.leftCol} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

export const GalleryImage = ({
	format,
	image,
	pageId,
	webTitle,
	renderingTarget,
}: Props) => {
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
			<div
				css={galleryBodyImageStyles}
				/**
				 * This ensures that the image height never goes above 96vh.
				 */
				style={{
					maxWidth: `calc(${width / height} * 96vh)`,
				}}
			>
				{renderingTarget === 'Apps' ? (
					<Island priority="critical">
						<AppsLightboxImage
							elementId={image.elementId}
							role={image.role}
							format={format}
							master={asset.url}
							alt={image.data.alt ?? ''}
							width={width}
							height={height}
							loading={'lazy'}
						/>
					</Island>
				) : (
					<Picture
						alt={image.data.alt ?? ''}
						format={format}
						role={image.role}
						master={asset.url}
						width={width}
						height={height}
						loading="lazy"
					/>
				)}
				{renderingTarget === 'Web' && !isUndefined(image.position) && (
					<LightboxLink
						role={image.role}
						format={format}
						elementId={image.elementId}
						isMainMedia={false}
						position={image.position}
					/>
				)}
			</div>

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
