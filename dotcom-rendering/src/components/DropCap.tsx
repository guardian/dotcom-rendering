import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { fonts, space } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	letter: string;
	format: ArticleFormat;
};

const dropCap = css`
	/* stylelint-disable-next-line property-disallowed-list -- we’re setting custom line height and font weight */
	font-family: ${fonts.headline};
	float: left;
	font-size: 111px;
	line-height: 92px;
	text-transform: uppercase;
	box-sizing: border-box;
	margin-right: ${space[1]}px;
	vertical-align: text-top;
`;

const fontWeight = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return 200;
		default:
			return 700;
	}
};

export const DropCap = ({ letter, format }: Props) => {
	const palette = decidePalette(format);
	return (
		<span
			css={dropCap}
			style={{
				color: palette.text.dropCap,
				fontWeight: fontWeight(format),
			}}
		>
			{letter}
		</span>
	);
};
