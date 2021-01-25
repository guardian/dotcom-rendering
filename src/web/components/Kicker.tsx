import React from 'react';
import { css, cx } from 'emotion';

import { Design, Pillar } from '@guardian/types';

import { PulsingDot } from '@root/src/web/components/PulsingDot';
import { decidePillarLight } from '@root/src/web/lib/decidePillarLight';
import { pillarPalette } from '@frontend/lib/pillars';

const kickerStyles = (colour: string) => css`
	color: ${colour};
	font-weight: 700;
	margin-right: 4px;
`;

const slashStyles = css`
	&::after {
		content: '/';
		display: inline-block;
		margin-left: 4px;
	}
`;

const decideColour = (design: Design, pillar: Theme, inCard?: boolean) => {
	switch (design) {
		case Design.Live:
			// TODO: We need this colour in source foundation
			return inCard
				? decidePillarLight(pillar)
				: pillarPalette[pillar].main;
		case Design.Media:
			// On Media cards, when pillar is news we use the bright colour as this looks better on a dark background vs. main
			return inCard && pillar === Pillar.News
				? pillarPalette[pillar].bright
				: pillarPalette[pillar].main;
		case Design.Feature:
		case Design.PhotoEssay:
		case Design.Interview:
		case Design.Analysis:
		case Design.Article:
		case Design.Review:
		case Design.Recipe:
		case Design.MatchReport:
		case Design.GuardianView:
		case Design.Quiz:
		case Design.Comment:
		default:
			return pillarPalette[pillar].main;
	}
};

export const Kicker = ({
	text,
	design,
	pillar,
	showPulsingDot,
	showSlash = true,
	inCard,
}: KickerType) => {
	const kickerColour = decideColour(design, pillar, inCard);
	return (
		<span className={kickerStyles(kickerColour)}>
			{showPulsingDot && <PulsingDot colour={kickerColour} />}
			<span className={cx(showSlash && slashStyles)}>{text}</span>
		</span>
	);
};
