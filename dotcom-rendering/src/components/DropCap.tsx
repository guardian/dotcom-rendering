import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat, Pillar } from '@guardian/libs';
import { fonts, space } from '@guardian/source/foundations';
import { palette } from '../palette';

type Props = {
	letter: string;
	format: ArticleFormat;
};

const dropCap = css`
	/* stylelint-disable-next-line property-disallowed-list -- we’re setting custom line height and font weight */
	font-family: ${fonts.headline};
	float: left;
	font-size: 7rem;
	line-height: 5.75rem;
	text-transform: uppercase;
	box-sizing: border-box;
	margin-right: ${space[1]}px;
	vertical-align: text-top;
`;

const fontWeight = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Editorial:
		case ArticleDesign.Comment:
			return 300;
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return 500;
		case ArticleDesign.Feature:
			if (format.theme === Pillar.News) {
				return 500;
			} else {
				return 700;
			}
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return 700;
		default:
			return 500;
	}
};

export const DropCap = ({ letter, format }: Props) => {
	return (
		<span
			css={dropCap}
			style={{
				color: palette('--drop-cap'),
				fontWeight: fontWeight(format),
			}}
		>
			{letter}
		</span>
	);
};
