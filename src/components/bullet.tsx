// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Format } from '@guardian/types';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props {
	format: Format;
	text: string;
}

const styles = (format: Format): SerializedStyles => {
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
	<>
		<span css={styles(format)}>•</span>
		{text.replace(/•/g, '')}
	</>
);

// ----- Exports ----- //

export default Bullet;
