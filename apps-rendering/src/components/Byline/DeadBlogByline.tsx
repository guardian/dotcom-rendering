import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	headlineBold17,
	headlineMediumItalic17,
} from '@guardian/source/foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { DefaultByline } from './Byline.defaults';
import { blogColor } from './LiveBlogByline';

const blogStyles = css`
	${headlineMediumItalic17}
`;

const blogAnchorStyles = css`
	${headlineBold17};
	font-style: normal;
	text-decoration: none;
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const DeadblogByline = ({ format, bylineHtml }: Props) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={css(blogStyles, blogColor(format))}
		anchorStyles={css(blogAnchorStyles, blogColor(format))}
	/>
);

export default DeadblogByline;
