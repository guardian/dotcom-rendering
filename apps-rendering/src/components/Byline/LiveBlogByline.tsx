import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { text } from 'palette';
import { darkModeCss } from 'styles';
import { DefaultByline } from './Byline.defaults';

export const blogColor = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.bylineInline(format)};
	${from.desktop} {
		color: ${text.bylineLeftColumn(format)};
	}

	${darkModeCss`
		color: ${text.bylineInlineDark(format)};
		${from.desktop} {
			${text.bylineLeftColumnDark(format)};
		}
	`}
`;

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

const LiveblogByline: React.FC<Props> = ({ format, bylineHtml }) => {
	return (
		<DefaultByline
			format={format}
			bylineHtml={bylineHtml}
			styles={css(
				blogStyles,
				blogColor(format),
				darkModeCss`
					color: ${text.bylineInlineDark(format)};
 				`,
			)}
			anchorStyles={css(blogAnchorStyles, blogColor(format))}
		/>
	);
};

export default LiveblogByline;
