import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { ArticleDesign, type ArticleFormat, Pillar } from '../lib/format';

type Props = {
	format: ArticleFormat;
	color?: string;
};

type DottedLinesProps = { color?: string; count: number };

/**
 * **TODO:** move this up to Source Design Kitchen!
 * the previous implementation uses SVGs, but creates an invalid
 * HTML document if you have two on the same page, due to the inclusion
 * of `id` which are not unique.
 *
 * Here we favour a CSS-only approach which works just as well…
 */
const DottedLines = ({
	count,
	color = palette.neutral[86],
}: DottedLinesProps) => (
	<div
		style={{ height: `${count * 3}px`, color }}
		css={css`
			background-size: 3px 3px;
			background-position: top center;
			background-image: radial-gradient(
				currentColor,
				currentColor 1px,
				transparent 1px
			);
		`}
	></div>
);

export const DecideLines = ({ format, color }: Props) => {
	const count = format.design === ArticleDesign.Comment ? 8 : 4;

	switch (format.theme) {
		case Pillar.Sport:
			return <DottedLines count={count} color={color} />;
		default:
			return (
				<StraightLines
					cssOverrides={css`
						display: block;
					`}
					count={count}
					color={color}
				/>
			);
	}
};
