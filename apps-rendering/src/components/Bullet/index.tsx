// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	text: string;
}

const styles = (format: ArticleFormat): SerializedStyles => css`
	color: transparent;
	display: inline-block;

	&::before {
		content: '';
		background-color: ${background.bullet(format)};
		width: 1rem;
		height: 1rem;
		border-radius: 0.5rem;
		display: inline-block;
		vertical-align: middle;
		${darkModeCss`
                background-color: ${background.bulletDark(format, true)};
            `}
	}
`;

const Bullet: FC<Props> = ({ format, text }) => (
	<>
		<span css={styles(format)}>•</span>
		{text.replace(/•/g, '')}
	</>
);

// ----- Exports ----- //

export default Bullet;
