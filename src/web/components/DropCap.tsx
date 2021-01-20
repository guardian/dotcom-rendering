import React from 'react';
import { css } from 'emotion';

import { Design } from '@guardian/types';
import { headline } from '@guardian/src-foundations/typography';
import { opinion } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';

import { pillarPalette } from '@frontend/lib/pillars';

type Props = {
	letter: string;
	pillar: CAPIPillar;
	design: Design;
};

const outerStyles = (pillar: CAPIPillar, design: Design) => {
	const baseStyles = css`
		${headline.large({
			fontWeight: 'light',
		})}
		float: left;
		text-transform: uppercase;
		box-sizing: border-box;
		margin-right: ${space[1]}px;
	`;

	/*
        The reason pillar type 'opinion' is forced to opinion[400] is that
        opinion.dark is much darker so it is forced to keep with similar colour
        tones used on the site(that's my understanding anyway!)
    */
	switch (design) {
		case Design.GuardianView:
		case Design.Comment:
			return css`
				${baseStyles};
				color: ${pillar === 'opinion'
					? opinion[400]
					: pillarPalette[pillar].dark};
			`;
		case Design.PhotoEssay:
		case Design.Analysis:
		case Design.Feature:
		case Design.Interview:
		case Design.Article:
		case Design.Media:
		case Design.Review:
		case Design.Live:
		case Design.Recipe:
		case Design.MatchReport:
		case Design.Quiz:
		default:
			return css`
				${baseStyles};
				color: ${pillarPalette[pillar].dark};
			`;
	}
};

const innerStyles = (design: Design) => {
	const baseStyles = css`
		${headline.large({ fontWeight: 'bold' })}
		font-size: 118px;
		line-height: 99px;
		vertical-align: text-top;
		pointer-events: none;
		margin-right: ${space[1]}px;
	`;

	switch (design) {
		case Design.GuardianView:
		case Design.Comment:
			return css`
				${baseStyles};
				font-weight: 200;
			`;
		case Design.Analysis:
		case Design.Feature:
		case Design.Interview:
		case Design.Article:
		case Design.Media:
		case Design.PhotoEssay:
		case Design.Review:
		case Design.Live:
		case Design.Recipe:
		case Design.MatchReport:
		case Design.Quiz:
		default:
			return css`
				${baseStyles};
				font-weight: 700;
			`;
	}
};

export const DropCap = ({ letter, pillar, design }: Props) => (
	<span className={outerStyles(pillar, design)}>
		<span className={innerStyles(design)}>{letter}</span>
	</span>
);
