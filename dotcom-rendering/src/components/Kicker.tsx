import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSansBold14,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

type Props = {
	text: string;
	color: string;
	showPulsingDot?: boolean;
	hideLineBreak?: boolean;
};

const textStyles = (color: string, showPulsingDot?: boolean) => {
	return showPulsingDot
		? css`
				${textSansBold14}
				color: ${palette('--kicker-text-live')};
				background-color: ${palette('--kicker-background-live')};
				width: fit-content;
				padding: 0 ${space[1]}px;
				display: flex;
				flex-direction: row;
				align-items: baseline;
		  `
		: css`
				${textSans15}
				color: ${color};
				background-color: transparent;
		  `;
};

const hideLineBreakStyles = css`
	display: inline-block;
	margin-right: ${space[1]}px;
`;

/**
 * The kicker is a prefix to be used with a headline (e.g. 'Live')
 */
export const Kicker = ({
	text,
	color,
	showPulsingDot,
	hideLineBreak,
}: Props) => (
	<div
		css={[
			textStyles(color, showPulsingDot),
			hideLineBreak && hideLineBreakStyles,
		]}
	>
		{showPulsingDot && (
			<Island priority="enhancement" defer={{ until: 'visible' }}>
				<PulsingDot colour={palette('--kicker-pulsing-dot-live')} />
			</Island>
		)}

		{text}
	</div>
);
