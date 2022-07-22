import { css } from '@emotion/react';
import FigCaption from '@guardian/common-rendering/src/components/figCaption';
import { from, neutral } from '@guardian/source-foundations';
import Img from 'components/ImgAlt';
import { grid } from 'grid/grid';
import type { FC } from 'react';
import {
	getDefaultImgStyles,
	getDefaultSizes,
	getDefaultStyles,
} from './BodyImage.defaults';
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

const imageWrapperStyles = css`
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
			border-left: 1px solid ${neutral[20]};
		}

		&::before {
			left: 0;
			transform: translateX(-10px);
		}

		&::after {
			right: 0;
			transform: translateX(10px);
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

const captionStyles = css`
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
		font-size: 0.8125rem;
		line-height: 1.125rem;
	}
	> h2 {
		font-size: 1.0625rem;
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
			border-left: 1px solid ${neutral[20]};
		}

		&::before {
			left: 0;
			transform: translateX(-10px);
		}
	}
`;

const GalleryBodyImage: FC<BodyImageProps> = ({
	image,
	format,
	supportsDarkMode,
	lightbox,
	caption,
	leftColumnBreakpoint,
}) => (
	<figure
		css={css(
			getDefaultStyles(image.role, leftColumnBreakpoint),
			figureStyles,
		)}
	>
		<div css={imageWrapperStyles}>
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
			css={captionStyles}
			format={format}
			supportsDarkMode={supportsDarkMode}
		>
			{caption}
		</FigCaption>
	</figure>
);

export default GalleryBodyImage;
