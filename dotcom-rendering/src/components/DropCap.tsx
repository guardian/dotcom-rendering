import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { headline, space } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import type { Palette } from '../types/palette';

type Props = {
	letter: string;
	format: ArticleFormat;
};

const outerStyles = (palette: Palette) => css`
	${headline.large({
		fontWeight: 'light',
	})}
	float: left;
	text-transform: uppercase;
	box-sizing: border-box;
	margin-right: ${space[1]}px;
	color: ${palette.text.dropCap};
`;

const innerStyles = (format: ArticleFormat) => {
	const baseStyles = css`
		${headline.large({ fontWeight: 'bold' })}
		font-size: 111px;
		line-height: 92px;
		vertical-align: text-top;
		pointer-events: none;
		margin-right: ${space[1]}px;
	`;

	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return css`
				${baseStyles};
				font-weight: 200;
			`;
		default:
			return css`
				${baseStyles};
				font-weight: 700;
			`;
	}
};

export const DropCap = ({ letter, format }: Props) => {
	const palette = decidePalette(format);
	return (
		<span css={outerStyles(palette)}>
			<span css={innerStyles(format)}>{letter}</span>
		</span>
	);
};
