import { css } from 'emotion';
import { neutral, opinion } from '@guardian/src-foundations/palette';
import { Design } from '@guardian/types';
import { pillarPalette } from '@frontend/lib/pillars';

export const headlineBackgroundColour = (design: Design, pillar: Theme) => {
	switch (design) {
		case Design.Editorial:
		case Design.Comment:
			return css`
				background-color: ${opinion[800]};
			`;
		case Design.Media:
			return css`
				background-color: ${neutral[20]};
			`;
		case Design.LiveBlog:
			return css`
				background-color: ${pillarPalette[pillar].dark};
			`;
		default:
			return css`
				background-color: ${neutral[97]};
			`;
	}
};

const colourStyles = (colour: string) => css`
	color: ${colour};
`;

export const headlineColour = (design: Design, pillar: Theme) => {
	switch (design) {
		case Design.Feature:
		case Design.Interview:
			return colourStyles(pillarPalette[pillar].dark);
		case Design.Media:
		case Design.LiveBlog:
			return colourStyles(neutral[97]);
		default:
			return undefined;
	}
};
