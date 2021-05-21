import { css, cx } from 'emotion';

import { PulsingDot } from '@root/src/web/components/PulsingDot';

// Defines a prefix to be used with a headline (e.g. 'Live /')
type Props = {
	text: string;
	palette: Palette;
	showPulsingDot?: boolean;
	showSlash?: boolean;
	inCard?: boolean; // True when headline is showing inside a card (used to handle coloured backgrounds)
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

export const Kicker = ({
	text,
	palette,
	showPulsingDot,
	showSlash = true,
	inCard,
}: Props) => {
	const kickerColour = inCard
		? palette.text.cardKicker
		: palette.text.linkKicker;
	return (
		<span className={kickerStyles(kickerColour)}>
			{showPulsingDot && <PulsingDot colour={kickerColour} />}
			<span className={cx(showSlash && slashStyles)}>{text}</span>
		</span>
	);
};
