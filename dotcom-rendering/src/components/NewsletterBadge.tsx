import { css } from '@emotion/react';
import { headline, palette } from '@guardian/source-foundations';

// Note - the font-size is non-standard since the pixels are
// relative to the SVG viewbox and need to be this size
// to fix the design (the text will scale with the SVG)
const textStyle = css`
	${headline.small({ fontWeight: 'bold' })};
	font-size: 122%;
	letter-spacing: -0.5px;
	fill: ${palette.brandAlt[400]};
`;

export const NewsletterBadge = () => (
	<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 40.5 113 22">
		<text x="3" y="58" css={textStyle}>
			Newsletters
		</text>
		<g stroke={palette.neutral[100]} strokeMiterlimit="10">
			<path d="M111.69 61.08v1h-1" />
			<path d="M108.7 62.08H2.49" strokeDasharray="1.99 1.99" />
			<path d="M1.5 62.08h-1v-1" />
			<path d="M.5 58.93V42.86" strokeDasharray="2.14 2.14" />
			<path d="M.5 41.79v-1h1" />
			<path d="M3.49 40.79H109.7" strokeDasharray="1.99 1.99" />
			<path d="M110.69 40.79h1v1" />
			<path d="M111.69 43.93v16.08" strokeDasharray="2.14 2.14" />
		</g>
	</svg>
);
