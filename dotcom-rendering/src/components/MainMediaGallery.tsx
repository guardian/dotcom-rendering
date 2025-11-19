import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import { grid } from '../grid';
import { type ArticleFormat } from '../lib/articleFormat';
import { getImage } from '../lib/image';
import { type ImageBlockElement } from '../types/content';
import { type RenderingTarget } from '../types/renderingTarget';
import { AppsLightboxImage } from './AppsLightboxImage.importable';
import { Island } from './Island';
import { LightboxLink } from './LightboxLink';
import { Picture } from './Picture';

type Props = {
	mainMedia?: ImageBlockElement;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
};

const styles = css`
	${grid.column.all}
	position: relative;
	height: calc(80vh - 48px);
	grid-row: 1/8;
	${from.desktop} {
		height: calc(100vh - 48px);
	}
`;

export const MainMediaGallery = ({
	mainMedia,
	format,
	renderingTarget,
}: Props) => {
	// This is to support some galleries created in 2007 where mainMedia is missing
	if (isUndefined(mainMedia)) {
		return <div css={styles}></div>;
	}
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
			{renderingTarget === 'Apps' ? (
				<Island priority="critical">
					<AppsLightboxImage
						elementId={mainMedia.elementId}
						role={mainMedia.role}
						format={format}
						master={asset.url}
						alt={mainMedia.data.alt ?? ''}
						width={width}
						height={height}
						loading="eager"
					/>
				</Island>
			) : (
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
			)}
			{renderingTarget === 'Web' && !isUndefined(mainMedia.position) && (
				<LightboxLink
					role={mainMedia.role}
					format={format}
					elementId={mainMedia.elementId}
					isMainMedia={true}
					position={mainMedia.position}
				/>
			)}
		</figure>
	);
};
