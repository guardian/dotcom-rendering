import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { palette as themePalette } from '../palette';
import type { Palette } from '../types/palette';

type Props = {
	position: number;
	html: string;
	format: ArticleFormat;
};

const titleStyles = css`
	h2 {
		${headline.medium({ fontWeight: 'light' })}
	}

	strong {
		${headline.medium({ fontWeight: 'bold' })}
		display: block;
		color: ${themePalette('--numbered-list-title')};
	}
`;

const numberStyles = (palette: Palette) => css`
	${headline.large({ fontWeight: 'bold' })}
	font-size: 56px;
	color: ${palette.text.numberedPosition};
`;

export const NumberedTitleBlockComponent = ({
	position,
	html,
	format,
}: Props) => {
	const palette = decidePalette(format);

	return (
		<div
			css={css`
				margin-top: -16px; /* Hack used to align Title number closer to adjacent divider */
			`}
		>
			<div css={numberStyles(palette)}>{position}</div>
			<div css={titleStyles} dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
};
