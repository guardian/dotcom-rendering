import { css } from '@emotion/react';
import { PulsingDot } from './PulsingDot';

// Defines a prefix to be used with a headline (e.g. 'Live /')
type Props = {
	text: string;
	color: string;
	showPulsingDot?: boolean;
	hideLineBreak?: boolean;
};

const kickerStyles = (colour: string) => css`
	color: ${colour};
	font-weight: 700;
	margin-right: 4px;
`;

export const Kicker = ({
	text,
	color,
	showPulsingDot,
	hideLineBreak,
}: Props) => {
	return (
		<div
			css={[
				kickerStyles(color),
				hideLineBreak &&
					css`
						display: inline-block;
					`,
			]}
		>
			{showPulsingDot && <PulsingDot colour={color} />}
			{text}
		</div>
	);
};
