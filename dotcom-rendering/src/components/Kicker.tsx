import { css } from '@emotion/react';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

// Defines a prefix to be used with a headline (e.g. 'Live /')
type Props = {
	text: string;
	color: string;
	showPulsingDot?: boolean;
	hideLineBreak?: boolean;
	isDynamo?: boolean;
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
	isDynamo,
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
			style={{
				['--card-kicker-text']: isDynamo ? color : color,
			}}
		>
			{showPulsingDot && (
				<Island priority="enhancement" defer={{ until: 'visible' }}>
					<PulsingDot colour={color} />
				</Island>
			)}
			{text}
		</div>
	);
};
