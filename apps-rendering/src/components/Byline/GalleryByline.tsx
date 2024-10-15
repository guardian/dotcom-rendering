import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '../../articleFormat';
import { headlineMediumItalic17, remSpace } from '@guardian/source/foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { grid } from 'grid/grid';
import { border, text } from 'palette';
import { darkModeCss } from 'styles';
import { DefaultByline } from './Byline.defaults';

const bylineStyles = (format: ArticleFormat): SerializedStyles => css`
	padding-bottom: ${remSpace[2]};
	${grid.column.centre}
	grid-row: 8/9;
	color: ${text.gallery(format)};
	${headlineMediumItalic17}

	${darkModeCss`
		color: ${text.galleryDark(format)};
	`};
`;

const anchorStyles = (format: ArticleFormat): SerializedStyles => css`
	${headlineMediumItalic17};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	font-weight: 700;
	color: ${text.gallery(format)};
	text-decoration: none;
	border-bottom: 1px solid ${border.bylineLink(format)};

	${darkModeCss`
        color: ${text.galleryDark(format)};
		border-bottom-color: ${border.bylineLinkDark(format)};
    `}
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const GalleryByline = ({ format, bylineHtml }: Props) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={bylineStyles(format)}
		anchorStyles={anchorStyles(format)}
	/>
);

export default GalleryByline;
