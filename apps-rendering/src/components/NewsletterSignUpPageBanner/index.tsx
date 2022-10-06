// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import type { ArticleFormat } from '@guardian/libs';
import type { FC } from 'react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import { headline } from '@guardian/source-foundations';
import { wideContentWidth } from 'styles';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
}

const style = (format: ArticleFormat): SerializedStyles => css`
	margin: 0 auto;
	max-width: ${wideContentWidth}px;
	background-color: ${background.newsletterSignUpBanner(format)};
	color: ${text.headlineDark(format)};
	${headline.small()}

`;

const NewsletterSignUpPageBanner: FC<Props> = ({ format }: Props) => (
	<div css={style(format)}>Newletters</div>
);

// ----- Exports ----- //

export default NewsletterSignUpPageBanner;
