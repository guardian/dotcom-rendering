// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { fill } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { SvgQuote } from '@guardian/source-react-components';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	children?: ReactNode;
	format: ArticleFormat;
}

const styles = (format: ArticleFormat): SerializedStyles => css`
	font-style: italic;
	position: relative;
	margin: ${remSpace[4]} 0 ${remSpace[9]} 0;
	padding: 0 ${remSpace[6]};

	svg {
		height: 62.4px;
		margin-left: -9.2625px;
		margin-bottom: -12px;
		margin-top: 4.4px;
		fill: ${fill.blockquoteIcon(format)};

		${darkModeCss`
			fill: ${fill.blockquoteIconDark(format)};
		`}
	}
`;

const Blockquote: FC<Props> = ({ children, format }: Props) => (
	<blockquote css={styles(format)}>
		<SvgQuote />
		{children}
	</blockquote>
);

// ----- Exports ----- //

export default Blockquote;
