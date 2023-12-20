import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline } from '@guardian/source-foundations';
import { SvgQuote } from '@guardian/source-react-components';
import type { Option } from '../../../../vendor/@guardian/types/index';
import { map, withDefault } from '../../../../vendor/@guardian/types/index';
import { pipe } from 'lib';
import { text } from 'palette';
import type { FC, ReactNode } from 'react';

export const pullquoteWidth = '10.875rem';
const pullquoteTailSize = '1.5rem';

const styles = (format: ArticleFormat): SerializedStyles => {
	const kicker = text.editionsKicker(format);
	return css`
		width: ${pullquoteWidth};
		position: relative;
		box-sizing: border-box;
		padding: 0 0.5rem 1.5rem 0.5rem;
		margin: 0.375rem 1rem calc(1rem + ${pullquoteTailSize}) 0;

		color: ${kicker};
		border: 1px solid ${kicker};
		border-top: 0.75rem solid ${kicker};
		border-bottom: none;

		float: left;
		clear: left;

		${from.desktop} {
			float: right;
			clear: right;
			margin-right: calc(-${pullquoteWidth} - 2.5rem);
		}

		&:before {
			content: '';
			position: absolute;
			top: 100%;
			left: -1px;
			width: ${pullquoteTailSize};
			height: ${pullquoteTailSize};
			border: 1px solid ${kicker};
			border-top: none;
			border-radius: 0 0 100% 0;
		}

		&:after {
			content: '';
			position: absolute;
			top: 100%;
			left: calc(${pullquoteTailSize} + 1px);
			width: calc(100% - ${pullquoteTailSize});
			height: 1px;
			border-top: 1px solid ${kicker};
		}
	`;
};

const quoteStyles = (format: ArticleFormat): SerializedStyles => {
	const kicker = text.editionsKicker(format);

	return css`
		margin: 0;
		${headline.xxsmall({ fontWeight: 'regular' })}
		svg {
			margin-bottom: -0.6rem;
			height: 2rem;
			margin-left: -0.3rem;
			fill: ${kicker};
		}
	`;
};

const citeStyles = css`
	font-style: normal;
	${headline.xxsmall({ fontWeight: 'bold' })}
`;

type Props = {
	quote: string;
	format: ArticleFormat;
	attribution: Option<string>;
};

const blockQuoteStyles = css`
	margin: 0;
`;

const Pullquote: FC<Props> = ({ quote, attribution, format }) => {
	const quoteElement = (
		<p css={quoteStyles(format)}>
			<SvgQuote />
			{quote}
		</p>
	);
	const children = pipe(
		attribution,
		map((attribution) => [
			quoteElement,
			<cite key={attribution} css={citeStyles}>
				{attribution}
			</cite>,
		]),
		withDefault<ReactNode>([quoteElement]),
	);

	return (
		<aside css={styles(format)}>
			<blockquote css={blockQuoteStyles}>{children}</blockquote>
		</aside>
	);
};

export default Pullquote;
