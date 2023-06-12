import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';

export const Border = ({ format }: { format: ArticleFormat }) => (
	<div
		css={css`
			${from.leftCol} {
				border-left: 1px solid ${decidePalette(format).border.article};
				height: 100%;
			}
		`}
	/>
);
