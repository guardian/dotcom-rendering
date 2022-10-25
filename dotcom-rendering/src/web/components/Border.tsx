import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';

const borderStyles = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt) {
		return css`
			${from.leftCol} {
				border-left: 1px solid rgba(60, 60, 60, 0.3);
				height: 100%;
			}
		`;
	}

	return css`
		${from.leftCol} {
			border-left: 1px solid ${decidePalette(format).border.article};
			height: 100%;
		}
	`;
};

export const Border = ({ format }: { format: ArticleFormat }) => (
	<div css={borderStyles(format)} />
);
