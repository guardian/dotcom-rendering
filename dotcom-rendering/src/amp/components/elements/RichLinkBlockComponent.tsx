import { css } from '@emotion/react';
import {
	headline,
	neutral,
	text,
	textSans,
} from '@guardian/source-foundations';
import React from 'react';
import { pillarPalette_DO_NOT_USE } from '../../../lib/pillars';
import { RichLinkBlockElement } from '../../../types/content';

const richLinkContainer = css`
	float: left;
	width: 140px;
	padding: 4px;
	padding-bottom: 18px;
	margin: 4px 10px 12px 0;
	background-color: ${neutral[93]};
	border-top: 1px solid ${neutral[86]};
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

export const RichLinkBlockComponent: React.FC<{
	element: RichLinkBlockElement;
	pillar: ArticleTheme;
}> = ({ element, pillar }) => (
	<aside css={richLinkContainer}>
		<a css={[richLink, pillarColour(pillar)]} href={element.url}>
			{element.text}
		</a>
	</aside>
);
