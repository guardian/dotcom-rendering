// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { border, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import type { Format, Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe2 } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props extends Format {
	count: Option<number>;
	commentable: boolean;
}

const styles = (colour: string): SerializedStyles => css`
	${textSans.medium({ fontWeight: 'bold' })}
	border: none;
	background: none;
	border-left: 1px solid ${border.secondary};
	padding-top: ${remSpace[3]};
	color: ${colour};
	${darkModeCss`
        border-left: 1px solid ${neutral[20]};
    `}
`;

const bubbleStyles = (colour: string): SerializedStyles => css`
	width: 1rem;
	display: block;
	margin-left: auto;
	fill: ${colour};
`;

const getStyles = ({ theme }: Format): SerializedStyles => {
	const colours = getThemeStyles(theme);

	return styles(colours.kicker);
};

const getBubbleStyles = ({ theme }: Format): SerializedStyles => {
	const colours = getThemeStyles(theme);

	return bubbleStyles(colours.kicker);
};

const CommentCount: FC<Props> = ({ count, commentable, ...format }: Props) => {
	if (!commentable) {
		return null;
	}

	return pipe2(
		count,
		map((count: number) => (
			<button css={getStyles(format)}>
				<svg
					css={getBubbleStyles(format)}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 9 8"
				>
					<rect x="0" y="0" width="9" height="6" rx="1.2" />
					<polygon points="2,6 2,8 2.5,8 4,6" />
				</svg>
				{count.toLocaleString()}
			</button>
		)),
		withDefault(<></>),
	);
};

// ----- Exports ----- //

export default CommentCount;
