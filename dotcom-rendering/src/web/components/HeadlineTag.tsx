import { css } from '@emotion/react';
import { brandText } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';

const headlineTagWrapper = css`
	margin-left: 6px;
	margin-top: 6px;
`;

const headlineTagStyles = (palette: Palette) => css`
	background-color: ${palette.background.headlineTag};
	color: ${brandText.primary};
	${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
	box-shadow: 0.25rem 0 0 ${palette.background
		.headlineTag}, -0.375rem 0 0 ${palette.background.headlineTag};
	display: inline-block;
	box-decoration-break: clone;
`;

export const HeadlineTag = ({
	tagText,
	palette,
}: {
	tagText: string;
	palette: Palette;
}) => (
	<div css={headlineTagWrapper}>
		<div css={headlineTagStyles(palette)}>{tagText}</div>
	</div>
);
