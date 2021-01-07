import { css } from 'emotion';
import { neutral, opinion } from '@guardian/src-foundations/palette';
import { pillarPalette } from '@frontend/lib/pillars';

export const headlineBackgroundColour = (
	design: Design,
	pillar: CAPIPillar,
) => {
	switch (design) {
		case 'GuardianView':
		case 'Comment':
			return css`
				background-color: ${opinion[800]};
			`;
		case 'Media':
			return css`
				background-color: ${neutral[20]};
			`;
		case 'Live':
			return css`
				background-color: ${pillarPalette[pillar].dark};
			`;
		case 'Article':
		case 'Review':
		case 'PhotoEssay':
		case 'Recipe':
		case 'MatchReport':
		case 'Quiz':
		case 'AdvertisementFeature':
		case 'Feature':
		case 'Analysis':
		case 'Interview':
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
		case 'Feature':
		case 'Interview':
			return colourStyles(pillarPalette[pillar].dark);
		case 'Media':
		case 'Live':
			return colourStyles(neutral[97]);
		case 'Analysis':
		case 'PhotoEssay':
		case 'Article':
		case 'Review':
		case 'Recipe':
		case 'MatchReport':
		case 'GuardianView':
		case 'Quiz':
		case 'AdvertisementFeature':
		case 'Comment':
		default:
	}
};
