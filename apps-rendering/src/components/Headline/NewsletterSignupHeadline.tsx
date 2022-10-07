// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline, remSpace } from '@guardian/source-foundations';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${headline.small()};
	background-color: ${background.headline(format)};
	color: ${text.headline(format)};
	padding: ${remSpace[1]} 0 ${remSpace[6]} 0;

	${from.desktop} {
		${headline.medium()}
	}

	${darkModeCss`
		background-color: ${background.headlineDark(format)};
		color: ${text.headlineDark(format)};
	`}
`;

interface Props {
	headline: string;
	format: ArticleFormat;
}

const NewsletterSignupHeadline: React.FC<Props> = ({ headline, format }) => (
	<h1 css={styles(format)}>{headline}</h1>
);

// ----- Exports ----- //

export default NewsletterSignupHeadline;
