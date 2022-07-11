import { css } from '@emotion/react';
import { PulsingDot } from './PulsingDot.importable';

// Defines a prefix to be used with a headline (e.g. 'Live /')
type Props = {
	text: string;
	palette: Palette;
	showPulsingDot?: boolean;
	showSlash?: boolean;
	inCard?: boolean; // True when headline is showing inside a card (used to handle coloured backgrounds)
	isDynamo?: boolean;
};

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

const decideColour = ({
	palette,
	inCard,
	isDynamo,
}: {
	palette: Palette;
	inCard?: boolean;
	isDynamo?: boolean;
}) => {
	if (isDynamo) return palette.text.dynamoKicker;
	if (inCard) return palette.text.cardKicker;
	return palette.text.linkKicker;
};

export const Kicker = ({
	text,
	palette,
	showPulsingDot,
	showSlash = true,
	inCard,
	isDynamo,
}: Props) => {
	const kickerColour = decideColour({ palette, inCard, isDynamo });
	return (
		<span css={kickerStyles(kickerColour)}>
			{showPulsingDot && <PulsingDot colour={kickerColour} />}
			<span css={showSlash && slashStyles}>{text}</span>
		</span>
	);
};
