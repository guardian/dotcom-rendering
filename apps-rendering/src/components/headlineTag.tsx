import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette/background';
import { ArticleFormat } from '@guardian/libs';
import { neutral, headline, remSpace } from '@guardian/source-foundations';
import { articleWidthStyles } from 'styles';

const headlineTagStyles = (format: ArticleFormat) => css`
	background-color: ${background.headlineTag(format)};
	color: ${neutral[100]};
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
}) => (
	<div css={articleWidthStyles}>
		<span css={headlineTagStyles(format)}>{tagText}</span>
	</div>
);

// ----- Exports ----- //

export default HeadlineTag;
