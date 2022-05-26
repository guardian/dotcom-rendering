import { css } from '@emotion/react';
import { brandAlt, headline, neutral } from '@guardian/source-foundations';

const textStyle = (textColour: string) => css`
	${headline.small({ fontWeight: 'bold' })};
	font-size: 19.5px;
	letter-spacing: -0.5px;
	fill: ${textColour};
`;

interface Props {
	textColour?: string;
	borderColour?: string;
}

export const NewsletterBadge = ({
	textColour = brandAlt[400],
	borderColour = neutral[100],
}: Props) => (
	<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 40 113 24">
		<text x="3" y="58" css={textStyle(textColour)}>
			Newsletters
		</text>
		<path
			d="M111.69 61.08v1h-1"
			stroke={borderColour}
			strokeMiterlimit="10"
		/>
		<path
			d="M108.7 62.08H2.49"
			stroke={borderColour}
			strokeMiterlimit="10"
			strokeDasharray="1.99 1.99"
		/>
		<path
			d="M1.5 62.08h-1v-1"
			stroke={borderColour}
			strokeMiterlimit="10"
		/>
		<path
			d="M.5 58.93V42.86"
			stroke={borderColour}
			strokeMiterlimit="10"
			strokeDasharray="2.14 2.14"
		/>
		<path d="M.5 41.79v-1h1" stroke={borderColour} strokeMiterlimit="10" />
		<path
			d="M3.49 40.79H109.7"
			stroke={borderColour}
			strokeMiterlimit="10"
			strokeDasharray="1.99 1.99"
		/>
		<path
			d="M110.69 40.79h1v1"
			stroke={borderColour}
			strokeMiterlimit="10"
		/>
		<path
			d="M111.69 43.93v16.08"
			stroke={borderColour}
			strokeMiterlimit="10"
			strokeDasharray="2.14 2.14"
		/>
	</svg>
);
