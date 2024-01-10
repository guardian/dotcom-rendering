import { css } from '@emotion/react';
import type { ArticleTheme } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import { headline, palette, textSans } from '@guardian/source-foundations';
import { neutralBorder, pillarPalette_DO_NOT_USE } from '../lib/pillars';

const ListStyle = (iconColour: string) => css`
	li {
		margin-bottom: 6px;
		padding-left: 20px;
		p {
			display: inline;
		}
	}

	li:before {
		display: inline-block;
		content: '';
		border-radius: 6px;
		height: 12px;
		width: 12px;
		margin-right: 8px;
		background-color: ${iconColour};
		margin-left: -20px;
	}
`;

const LinkStyle = (pillar: ArticleTheme) => css`
	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
		text-decoration: none;
		border-bottom: 1px solid ${neutralBorder(pillar)};
		:hover {
			border-bottom: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
		}
	}
`;

const standfirstCss = (pillar: ArticleTheme) => css`
	${headline.xxxsmall()};
	font-weight: 100;
	color: ${palette.neutral[7]};
	margin-bottom: 12px;

	p {
		margin-bottom: 8px;
		font-weight: 200;
	}
	strong {
		font-weight: 700;
	}

	${ListStyle(neutralBorder(pillar))};
	${LinkStyle(pillar)};
`;

// Labs paid content only
const labsStyle = css`
	p,
	li {
		font-weight: 700;
		${textSans.large()}
	}
`;

type Props = {
	text: string;
	pillar: ArticleTheme;
};

export const Standfirst = ({ text, pillar }: Props) => {
	return (
		<div
			data-print-layout="hide"
			css={
				pillar === ArticleSpecial.Labs
					? [standfirstCss(pillar), labsStyle]
					: standfirstCss(pillar)
			}
			dangerouslySetInnerHTML={{
				__html: text,
			}}
		/>
	);
};
