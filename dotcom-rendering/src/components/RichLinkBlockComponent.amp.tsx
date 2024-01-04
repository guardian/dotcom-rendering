import { css } from '@emotion/react';
import {
	headline,
	palette,
	text,
	textSans,
} from '@guardian/source-foundations';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import type { RichLinkBlockElement } from '../types/content';

const richLinkContainer = css`
	float: left;
	width: 140px;
	padding: 4px;
	padding-bottom: 18px;
	margin: 4px 10px 12px 0;
	background-color: ${palette.neutral[93]};
	border-top: 1px solid ${palette.neutral[86]};
	margin-right: 20px;
`;

const pillarColour = (pillar: ArticleTheme) => css`
	color: ${pillarPalette_DO_NOT_USE[pillar].dark};
`;

const richLink = css`
	font-weight: 500;
	border: 0;
	text-decoration: none;
	${headline.xxxsmall()};
	word-wrap: break-word;
	:hover {
		text-decoration: underline;
	}
	::before {
		${textSans.xxsmall()};
		content: 'More on this topic';
		display: block;
		color: ${text.supporting};
		font-weight: 400;
	}
`;

type Props = {
	element: RichLinkBlockElement;
	pillar: ArticleTheme;
};

export const RichLinkBlockComponent = ({ element, pillar }: Props) => (
	<aside css={richLinkContainer}>
		<a css={[richLink, pillarColour(pillar)]} href={element.url}>
			{element.text}
		</a>
	</aside>
);
