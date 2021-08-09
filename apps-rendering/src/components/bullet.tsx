// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props {
	format: Format;
	text: string;
}

const styles = css`
	${body.medium({ lineHeight: 'loose' })}
	display: inline;
	overflow-wrap: break-word;
	margin: 0 0 ${remSpace[3]};
`;

const bulletStyles = (format: Format): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(format.theme);

	return css`
		color: transparent;
		display: inline-block;

		&::before {
			content: '';
			background-color: ${kicker};
			width: 1rem;
			height: 1rem;
			border-radius: 0.5rem;
			display: inline-block;
			vertical-align: middle;
			${darkModeCss`
                background-color: ${inverted};
            `}
		}
	`;
};

const Bullet: FC<Props> = ({ format, text }) => (
	<p css={styles}>
		<span css={bulletStyles(format)}>•</span>
		{text.replace(/•/g, '')}
	</p>
);

// ----- Exports ----- //

export default Bullet;
