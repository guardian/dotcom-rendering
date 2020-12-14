import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { SvgQuote } from '@guardian/src-icons/quote';
import type { Format, Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe2 } from 'lib';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';
import { basePx } from 'styles';
import { getThemeStyles } from 'themeStyles';
import { from } from '@guardian/src-foundations/mq';

export const pullquoteWidth = '10.875rem';

const styles = (format: Format): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(format.theme);
	return css`
		color: ${kicker};
		${darkModeCss`color: ${inverted};`}
		border-top: 12px solid ${kicker};
		${darkModeCss`border-top: ${inverted};`}
		${headline.xxsmall({ fontWeight: 'medium' })}
        float: left;
		clear: left;
		margin: ${basePx(0, 2, 1, 0)};

		width: ${pullquoteWidth};
		${from.wide} {
			margin-left: calc(-${pullquoteWidth} - ${basePx(2)} - ${basePx(3)});
		}
	`;
};

const quoteStyles = (format: Format): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(format.theme);

	return css`
		margin: 0;

		svg {
			margin-bottom: -0.6rem;
			height: 2.3rem;
			margin-left: -0.3rem;
			line-height: 1.2;
			fill: ${kicker};
			${darkModeCss`fill: ${inverted};`}
		}
	`;
};

const citeStyles = css`
	font-style: normal;
`;

type Props = {
	quote: string;
	format: Format;
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
	const children = pipe2(
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
