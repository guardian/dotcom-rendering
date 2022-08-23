import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette/background';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline } from '@guardian/source-foundations';
import type { FC } from 'react';
import { articleWidthStyles } from '../../styles';

const headlineTagWrapper = css`
	${articleWidthStyles}
`;

const headlineTagStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.headlineTag(format)};
	${headline.xxxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
	color: ${text.headlineTag(format)};
	display: inline-block;
	box-decoration-break: clone;
	padding: 0 0.375rem 0.125rem;
	${from.tablet} {
		${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
	}
`;

type Props = {
	tagText: string;
	format: ArticleFormat;
};

const HeadlineTag: FC<Props> = ({ tagText, format }) => (
	<div css={headlineTagWrapper}>
		<span css={headlineTagStyles(format)}>{tagText}</span>
	</div>
);

// ----- Exports ----- //

export default HeadlineTag;
