import { css } from '@emotion/react';
import { textSansBold14, textSansBold15 } from '@guardian/source/foundations';
import { palette } from '../palette';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

type Props = {
	text: string;
	color: string;
	showPulsingDot?: boolean;
	hideLineBreak?: boolean;
};

const textStyles = css`
	${textSansBold15}
	margin-right: 4px;
`;

const liveTextStyles = css`
	${textSansBold14}
	margin-right: 4px;
	width: fit-content;
	padding: 0 4px;
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
			showPulsingDot ? liveTextStyles : textStyles,
			hideLineBreak &&
				css`
					display: inline-block;
				`,
		]}
		style={{
			color: showPulsingDot
				? palette('--kicker-text-with-pulsing-dot')
				: color,
			backgroundColor: showPulsingDot
				? palette('--kicker-background-with-pulsing-dot')
				: 'transparent',
		}}
	>
		{showPulsingDot && (
			<Island priority="enhancement" defer={{ until: 'visible' }}>
				<PulsingDot colour={palette('--kicker-pulsing-dot')} />
			</Island>
		)}
		{text}
	</div>
);
