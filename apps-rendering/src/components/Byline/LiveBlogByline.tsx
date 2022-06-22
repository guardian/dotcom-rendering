import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline, neutral } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';
import { DefaultByline } from './Byline.defaults';

export const blogColor = (
	color: string,
	link: string,
	inverted: string,
): SerializedStyles => css`
	color: ${color};
	${from.desktop} {
		color: ${link};
	}

	${darkModeCss`
		color: ${neutral[93]};
		${from.desktop} {
			color: ${inverted};
		}
	`}
`;

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

const LiveblogByline: React.FC<Props> = ({ format, bylineHtml }) => {
	const { inverted, link } = getThemeStyles(format.theme);

	return (
		<DefaultByline
			format={format}
			bylineHtml={bylineHtml}
			styles={css(
				blogStyles,
				blogColor(
					neutral[100],
					text.bylineLeftColumn(format),
					text.bylineDark(format),
				),
				darkModeCss`
					color: ${neutral[86]};
 				`,
			)}
			anchorStyles={css(
				blogAnchorStyles,
				blogColor(neutral[100], link, inverted),
			)}
		/>
	);
};

export default LiveblogByline;
