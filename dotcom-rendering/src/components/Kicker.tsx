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

const standardTextStyles = css`
	${textSans15}
`;
const liveTextStyles = css`
	${textSansBold14}
	display: flex;
	flex-direction: row;
	align-items: baseline;
	width: fit-content;
	padding: 0 ${space[1]}px;

	/*
	This is to keep the same height as the standard kicker
	which has a slightly larger font
	*/
	margin-bottom: 1px;
`;

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
}: Props) => {
	/** @todo
	 * Future optimisation is to not have color as a prop, but to infer this through format and CSS vars.
	 * This would also allow showPulsingDot to be inferred from the format (is LiveBlog)
	 */
	const isLiveKicker = !!showPulsingDot;

	return (
		<div
			css={[
				isLiveKicker ? liveTextStyles : standardTextStyles,
				hideLineBreak && hideLineBreakStyles,
			]}
			style={{
				color: isLiveKicker ? palette('--kicker-text-live') : color,
				backgroundColor: isLiveKicker
					? palette('--kicker-background-live')
					: 'transparent',
			}}
		>
			{showPulsingDot && (
				<Island priority="enhancement" defer={{ until: 'visible' }}>
					<PulsingDot colour={palette('--kicker-pulsing-dot-live')} />
				</Island>
			)}

			{text}
		</div>
	);
};
