import { css } from '@emotion/react';
import { palette } from '../palette';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

// Defines a prefix to be used with a headline (e.g. 'Live /')
type Props = {
	text: string;
	showPulsingDot?: boolean;
	hideLineBreak?: boolean;
};

const kickerStyles = css`
	color: ${palette('--kicker')};
	font-weight: 700;
	margin-right: 4px;
`;

export const Kicker = ({ text, showPulsingDot, hideLineBreak }: Props) => {
	return (
		<div
			css={kickerStyles}
			style={{ display: hideLineBreak ? 'inline-block' : undefined }}
		>
			{showPulsingDot && (
				<Island priority="enhancement" defer={{ until: 'visible' }}>
					<PulsingDot />
				</Island>
			)}
			{text}
		</div>
	);
};
