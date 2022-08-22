import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { headline, space } from '@guardian/source-foundations';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';

const tagStyles = (palette: Palette) => css`
	background-color: ${palette.background.designTag};
	color: ${palette.text.designTag};
	display: inline-block;
	padding-bottom: 2px;
	${headline.xxsmall({ fontWeight: 'bold' })}
	line-height: 28px;
	box-shadow: 4px 0 0 ${palette.background.headlineTag},
		-6px 0 0 ${palette.background.headlineTag};
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
						margin-top: 5px;
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
