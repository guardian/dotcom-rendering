import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import FigCaption from '@guardian/common-rendering/src/components/figCaption';
import { border } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	headline,
	neutral,
	textSans,
} from '@guardian/source-foundations';
import Img from 'components/ImgAlt';
import { grid } from 'grid/grid';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { getDefaultImgStyles, getDefaultSizes } from './BodyImage.defaults';
import type { BodyImageProps } from './BodyImage.defaults';

const figureStyles = css`
	${grid.container}
	width: 100%;
	margin: 0;

	${from.mobile} {
		width: 100%;
	}

	${from.tablet} {
		width: 100%;
	}

	${from.desktop} {
		width: 100%;
	}
`;

const imageWrapperStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.centre}
	grid-row: 1;

	${from.leftCol} {
		${grid.between('centre-column-start', 'right-column-end')}
		padding-bottom: 1.75rem;
		position: relative;

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${border.galleryImage(format)};
		}

		&::before {
			left: -10px;
		}

		&::after {
			right: -10px;
		}
	}

	img {
		width: 100%;
		height: auto;
		max-height: 100vh;
		object-fit: contain;
		object-position: top left;
		background: transparent;
	}
`;

const captionStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.centre}
	grid-row: 2;
	padding-bottom: 1.75rem;

	h2,
	span,
	a,
	& {
		color: ${neutral[100]};
	}
	> span {
		${textSans.xsmall({ lineHeight: 'regular' })}
	}
	> h2 {
		${headline.xxxsmall()}
	}

	${from.leftCol} {
		padding-bottom: 0;
		${grid.column.left}
		grid-row: 1;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${border.galleryImage(format)};
			left: -10px;
		}
	}

	${darkModeCss`
		color: ${neutral[86]};
	`}
`;

const GalleryBodyImage: FC<BodyImageProps> = ({
	image,
	format,
	supportsDarkMode,
	lightbox,
	caption,
}) => (
	<figure css={css(figureStyles)}>
		<div css={imageWrapperStyles(format)}>
			<Img
				image={image}
				sizes={getDefaultSizes(image.role)}
				className={getDefaultImgStyles(image.role, supportsDarkMode)}
				format={format}
				supportsDarkMode={supportsDarkMode}
				lightbox={lightbox}
			/>
		</div>

		<FigCaption
			css={captionStyles(format)}
			format={format}
			supportsDarkMode={supportsDarkMode}
		>
			{caption}
		</FigCaption>
	</figure>
);

export default GalleryBodyImage;
