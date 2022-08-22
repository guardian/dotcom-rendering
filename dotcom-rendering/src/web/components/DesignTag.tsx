import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { headline, space } from '@guardian/source-foundations';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';

const tagStyles = (palette: Palette) => css`
	background-color: ${palette.background.designTag};
	color: ${palette.text.designTag};
	display: inline-block;
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-bottom: ${space[1]}px;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[1]}px;
	${headline.xxsmall({ fontWeight: 'bold' })}
`;

export const DesignTag = ({ format }: { format: ArticleFormat }) => {
	const palette = decidePalette(format);

	switch (format.design) {
		case ArticleDesign.Analysis:
			return <div css={tagStyles(palette)}>Analysis</div>;
		case ArticleDesign.Explainer:
			return <div css={tagStyles(palette)}>Explainer</div>;
		default:
			return null;
	}
};
