import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { headline, space } from '@guardian/source-foundations';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';

const tagStyles = (palette: Palette) => css`
	background-color: ${palette.background.designTag};
	color: ${palette.text.designTag};
	display: inline-block;
	/* padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-bottom: ${space[1]}px; */
	${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}

	box-shadow: 0.25rem 0 0 ${palette.background
		.headlineTag}, -0.375rem 0 0 ${palette.background.headlineTag};
	box-decoration-break: clone;
`;

const Margins = ({
	children,
	format,
}: {
	children: React.ReactNode;
	format: ArticleFormat;
}) => {
	switch (format.design) {
		case ArticleDesign.Interview:
			return (
				<div
					css={css`
						margin-left: 6px;
						margin-top: ${space[1]}px;
					`}
				>
					{children}
				</div>
			);
		default:
			return (
				<div
					css={css`
						margin-left: 6px;
						margin-top: ${space[2]}px;
						margin-bottom: ${space[1]}px;
					`}
				>
					{children}
				</div>
			);
	}
};

const Tag = ({
	children,
	format,
}: {
	children: React.ReactNode;
	format: ArticleFormat;
}) => {
	const palette = decidePalette(format);
	return <div css={tagStyles(palette)}>{children}</div>;
};

export const DesignTag = ({ format }: { format: ArticleFormat }) => {
	switch (format.design) {
		case ArticleDesign.Analysis:
			return (
				<Margins format={format}>
					<Tag format={format}>Analysis</Tag>
				</Margins>
			);
		case ArticleDesign.Interview:
			return (
				<Margins format={format}>
					<Tag format={format}>Interview</Tag>
				</Margins>
			);
		default:
			return null;
	}
};
