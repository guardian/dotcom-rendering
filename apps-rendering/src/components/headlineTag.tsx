import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette/background';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import { ArticleFormat } from '@guardian/libs';
import { headline, remSpace } from '@guardian/source-foundations';

const headlineTagStyles = (format: ArticleFormat) => css`
	background-color: ${background.headlineTag(format)};
	color: ${text.headlineTag(format)};
	${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
	display: inline-block;
	box-decoration-break: clone;
	padding: 0 ${remSpace[1]};
`;

const HeadlineTag = ({
	tagText,
	format,
}: {
	tagText: string;
	format: ArticleFormat;
}) => <span css={headlineTagStyles(format)}>{tagText}</span>;

// ----- Exports ----- //

export default HeadlineTag;
