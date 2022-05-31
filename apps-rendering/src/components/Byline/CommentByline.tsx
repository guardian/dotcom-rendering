import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { darkModeCss } from 'styles';
import { DefaultByline } from './Byline.defaults';

const commentStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.bylineLeftColumn(format)};
	width: 75%;
	${headline.medium({ fontWeight: 'light', fontStyle: 'italic' })}
`;

const commentAnchorStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.bylineLeftColumn(format)};
	text-decoration: none;

	${darkModeCss`
        color: ${text.bylineDark(format)};
    `}
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const CommentByline: React.FC<Props> = ({ format, bylineHtml }) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={commentStyles(format)}
		anchorStyles={commentAnchorStyles(format)}
	/>
);

export default CommentByline;
