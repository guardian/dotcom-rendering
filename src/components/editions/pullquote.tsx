import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { SvgQuote } from '@guardian/src-icons/quote';
import type { Format, Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe2 } from 'lib';
import type { FC, ReactNode } from 'react';
import { basePx, darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

export const pullquoteWidth = '10.875rem';
const pullquoteTailSize = '23px';

const styles = (format: Format): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(format.theme);
	return css`
		width: ${pullquoteWidth};
		position: relative;
		box-sizing: border-box;
		padding: ${basePx(0, 1, 3, 1)};
		margin: ${basePx(0.75)} ${basePx(2)} calc(${basePx(2)} + ${pullquoteTailSize}) 0;

		color: ${kicker};
		border: 1px solid ${kicker};
		border-top: 12px solid ${kicker};
		border-bottom: none;
		${darkModeCss`color: ${inverted};`}
		${darkModeCss`border: 1px solid ${inverted};`}
		${darkModeCss`border-top: 12px solid ${inverted};`}
		${darkModeCss`border-bottom: none`}

		float: left;
		clear: left;
		${from.wide} {
			float: right;
			clear: right;
			margin-right: calc(
				-${pullquoteWidth} - ${basePx(2)} - ${basePx(3)}
			);
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
			${darkModeCss`border: 1px solid ${inverted};`}
			${darkModeCss`border-top: none;`}
		}

		&:after {
			content: '';
			position: absolute;
			top: 100%;
			left: calc(${pullquoteTailSize} + 1px);
			width: calc(100% - ${pullquoteTailSize});
			height: 1px;
			border-top: 1px solid ${kicker};
			${darkModeCss`border-top: 1px solid ${inverted};`}
		}
	`;
};

const quoteStyles = (format: Format): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(format.theme);

	return css`
		margin: 0;
		${headline.xxsmall({ fontWeight: 'regular' })}
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
	${headline.xxsmall({ fontWeight: 'bold' })}
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
