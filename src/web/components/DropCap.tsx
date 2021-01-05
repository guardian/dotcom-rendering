import React from 'react';
import { css } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { opinion } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { pillarPalette } from '@frontend/lib/pillars';

type Props = {
	letter: string;
	pillar: CAPIPillar;
	designType: DesignType;
};

const outerStyles = (pillar: CAPIPillar, designType: DesignType) => {
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
	switch (designType) {
		case 'GuardianView':
		case 'Comment':
			return css`
				${baseStyles};
				color: ${pillar === 'opinion'
					? opinion[400]
					: pillarPalette[pillar].dark};
			`;
		case 'PhotoEssay':
		case 'Analysis':
		case 'Feature':
		case 'Interview':
		case 'Article':
		case 'Media':
		case 'Review':
		case 'Live':
		case 'Recipe':
		case 'MatchReport':
		case 'GuardianLabs':
		case 'Quiz':
		case 'AdvertisementFeature':
		default:
			return css`
				${baseStyles};
				color: ${pillarPalette[pillar].dark};
			`;
	}
};

const innerStyles = (designType: DesignType) => {
	const baseStyles = css`
		${headline.large({ fontWeight: 'bold' })}
		font-size: 118px;
		line-height: 99px;
		vertical-align: text-top;
		pointer-events: none;
		margin-right: ${space[1]}px;
	`;

	switch (designType) {
		case 'GuardianView':
		case 'Comment':
			return css`
				${baseStyles};
				font-weight: 200;
			`;
		case 'Analysis':
		case 'Feature':
		case 'Interview':
		case 'Article':
		case 'Media':
		case 'PhotoEssay':
		case 'Review':
		case 'Live':
		case 'Recipe':
		case 'MatchReport':
		case 'GuardianLabs':
		case 'Quiz':
		case 'AdvertisementFeature':
		default:
			return css`
				${baseStyles};
				font-weight: 700;
			`;
	}
};

export const DropCap = ({ letter, pillar, designType }: Props) => (
	<span className={outerStyles(pillar, designType)}>
		<span className={innerStyles(designType)}>{letter}</span>
	</span>
);
