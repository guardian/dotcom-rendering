import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { fonts, space } from '@guardian/source-foundations';
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
		// "Authoritative" designs
		case ArticleDesign.Obituary:
		case ArticleDesign.Editorial:
		case ArticleDesign.Comment:
			return 300;
		// "Neutral" designs
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return 500;
		// "Soft" designs
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return 700;
		case ArticleDesign.Letter:
			return 200;
		default:
			return 700;
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
