import { css } from '@emotion/react';
import { headline, space } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';

export const DesignTag = ({
	children,
	format,
}: {
	children: React.ReactNode;
	format: ArticleFormat;
}) => {
	const palette = decidePalette(format);
	return (
		<>
			<div
				css={css`
					background-color: ${palette.background.designTag};
					color: ${palette.text.designTag};
					display: inline-block;
					padding-left: ${space[2]}px;
					padding-right: ${space[2]}px;
					padding-bottom: ${space[1]}px;
					margin-top: ${space[2]}px;
					margin-bottom: ${space[1]}px;
					${headline.xxsmall({ fontWeight: 'bold' })}
				`}
			>
				{children}
			</div>
			<br />
		</>
	);
};
