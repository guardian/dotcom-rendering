import { css } from '@emotion/react';

import { Design } from '@guardian/types';
import { headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { decidePalette } from '@root/src/web/lib/decidePalette';

type Props = {
	letter: string;
	format: Format;
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

const innerStyles = (format: Format) => {
	const baseStyles = css`
		${headline.large({ fontWeight: 'bold' })}
		font-size: 118px;
		line-height: 99px;
		vertical-align: text-top;
		pointer-events: none;
		margin-right: ${space[1]}px;
	`;

	switch (format.design) {
		case Design.Editorial:
		case Design.Letter:
		case Design.Comment:
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
