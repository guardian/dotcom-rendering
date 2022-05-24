import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';
import { DefaultByline } from './Byline.defaults';

const commentStyles = (kicker: string): SerializedStyles => css`
	color: ${kicker};
	width: 75%;
	${headline.medium({ fontWeight: 'light', fontStyle: 'italic' })}
`;

const commentAnchorStyles = (
	kicker: string,
	inverted: string,
): SerializedStyles => css`
	color: ${kicker};
	text-decoration: none;

	${darkModeCss`
        color: ${inverted};
    `}
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const CommentByline: React.FC<Props> = ({ format, bylineHtml }) => {
	const { kicker, inverted } = getThemeStyles(format.theme);

	return (
		<DefaultByline
			format={format}
			bylineHtml={bylineHtml}
			styles={commentStyles(text.bylineLeftColumn(format))}
			anchorStyles={commentAnchorStyles(kicker, inverted)}
		/>
	);
};

export default CommentByline;
