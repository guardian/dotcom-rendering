import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette/background';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import type { ArticleFormat } from '@guardian/libs';
import { headline, remSpace } from '@guardian/source-foundations';
import type { FC } from 'react';

const headlineTagStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.headlineTag(format)};
	color: ${text.headlineTag(format)};
	${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
	display: inline-block;
	box-decoration-break: clone;
	padding: 0 ${remSpace[1]};
`;

type Props = {
	tagText: string;
	format: ArticleFormat;
};

const HeadlineTag: FC<Props> = ({ tagText, format }) => (
	<span css={headlineTagStyles(format)}>{tagText}</span>
);

// ----- Exports ----- //

export default HeadlineTag;
