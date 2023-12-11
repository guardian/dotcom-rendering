import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { DefaultByline } from './Byline.defaults';
import { blogColor } from './LiveBlogByline';

const blogStyles = css`
	${headline.xxxsmall({ lineHeight: 'tight', fontStyle: 'italic' })}
`;

const blogAnchorStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	font-style: normal;
	text-decoration: none;
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const DeadblogByline: React.FC<Props> = ({ format, bylineHtml }) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={css(blogStyles, blogColor(format))}
		anchorStyles={css(blogAnchorStyles, blogColor(format))}
	/>
);

export default DeadblogByline;
