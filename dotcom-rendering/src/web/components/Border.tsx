import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import { from, neutral } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { transparentColour } from '../lib/transparentColour';

const decideBorderColour = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return transparentColour(neutral[60], 0.3);

	return decidePalette(format).border.article;
};

export const Border = ({ format }: { format: ArticleFormat }) => (
	<div
		css={css`
			${from.leftCol} {
				border-left: 1px solid ${decideBorderColour(format)};
				height: 100%;
			}
		`}
	/>
);
