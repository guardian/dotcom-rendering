import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { body, remSpace } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { grid } from 'grid/grid';
import { defaultAnchorStyles, DefaultByline } from './Byline.defaults';

const bylineStyles = css`
	padding-top: ${remSpace[2]};
	padding-bottom: ${remSpace[2]};
	${grid.span('centre-column-start', 3)}
	grid-row: 6/7;
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const GalleryByline: React.FC<Props> = ({ format, bylineHtml }) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={bylineStyles}
		anchorStyles={defaultAnchorStyles(format)}
	/>
);

export default GalleryByline;
