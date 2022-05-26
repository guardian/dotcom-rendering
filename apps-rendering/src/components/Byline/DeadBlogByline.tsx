import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { headline, neutral } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { DefaultByline } from './Byline.defaults';
import { blogColor } from './LiveBlogByline';

const blogStyles = css`
	${headline.xxxsmall({ lineHeight: 'regular', fontStyle: 'italic' })}
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
		styles={css(
			blogStyles,
			blogColor(
				text.bylineInline(format),
				text.bylineLeftColumn(format),
				neutral[86],
			),
		)}
		anchorStyles={css(
			blogAnchorStyles,
			blogColor(
				text.bylineInline(format),
				text.bylineLeftColumn(format),
				text.bylineDark(format),
			),
		)}
	/>
);

export default DeadblogByline;
