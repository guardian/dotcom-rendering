import { css } from 'emotion';
import { neutral, opinion } from '@guardian/src-foundations/palette';
import { Design } from '@guardian/types/Format';
import { pillarPalette } from '@frontend/lib/pillars';

export const headlineBackgroundColour = (
	design: Design,
	pillar: CAPIPillar,
) => {
	switch (design) {
		case Design.GuardianView:
		case Design.Comment:
			return css`
				background-color: ${opinion[800]};
			`;
		case Design.Media:
			return css`
				background-color: ${neutral[20]};
			`;
		case Design.Live:
			return css`
				background-color: ${pillarPalette[pillar].dark};
			`;
		case Design.Article:
		case Design.Review:
		case Design.PhotoEssay:
		case Design.Recipe:
		case Design.MatchReport:
		case Design.Quiz:
		case Design.AdvertisementFeature:
		case Design.Feature:
		case Design.Analysis:
		case Design.Interview:
		default:
			return css`
				background-color: ${neutral[97]};
			`;
	}
};

const colourStyles = (colour: string) => css`
	color: ${colour};
`;

export const headlineColour = (design: Design, pillar: CAPIPillar) => {
	switch (design) {
		case Design.Feature:
		case Design.Interview:
			return colourStyles(pillarPalette[pillar].dark);
		case Design.Media:
		case Design.Live:
			return colourStyles(neutral[97]);
		case Design.Analysis:
		case Design.PhotoEssay:
		case Design.Article:
		case Design.Review:
		case Design.Recipe:
		case Design.MatchReport:
		case Design.GuardianView:
		case Design.Quiz:
		case Design.AdvertisementFeature:
		case Design.Comment:
		default:
	}
};
