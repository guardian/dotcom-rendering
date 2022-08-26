import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { grid } from 'grid/grid';
import { darkModeCss } from 'styles';
import { defaultAnchorStyles, DefaultByline } from './Byline.defaults';

const bylineStyles = (format: ArticleFormat): SerializedStyles => css`
	padding-top: ${remSpace[2]};
	padding-bottom: ${remSpace[2]};
	${grid.span('centre-column-start', 3)}
	grid-row: 6/7;
	color: ${text.gallery(format)};
	${darkModeCss`
		color: ${text.galleryDark(format)};
	`};
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const GalleryByline: React.FC<Props> = ({ format, bylineHtml }) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={bylineStyles(format)}
		anchorStyles={defaultAnchorStyles(format)}
	/>
);

export default GalleryByline;
