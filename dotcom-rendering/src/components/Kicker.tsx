import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSansBold14,
	textSansBold15,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

type Props = {
	text: string;
	color: string;
	showPulsingDot?: boolean;
	/** Controls the weight of the standard, non-live kicker. Defaults to regular */
	fontWeight?: 'regular' | 'bold';
};

const commonStyles = css`
	display: inline;
`;

const standardTextStyles = css`
	${textSans15}
`;

const boldTextStyles = css`
	${textSansBold15}
`;

const liveTextStyles = css`
	${textSansBold14}
	padding: 0 ${space[1]}px;
	box-shadow: 0 0.05em 0 0 ${palette('--kicker-background-live')};
	box-decoration-break: clone;
	/** This is a hack to ensure designs look right for multi line kickers */
	line-height: 1.2rem;
`;

/**
 * The kicker is a prefix to be used with a headline (e.g. 'Live')
 */
export const Kicker = ({
	text,
	color,
	showPulsingDot,
	fontWeight = 'regular',
}: Props) => {
	/** @todo
	 * Future optimisation is to not have color as a prop, but to infer this through format and CSS vars.
	 * This would also allow showPulsingDot to be inferred from the format (is LiveBlog)
	 */
	const isLiveKicker = !!showPulsingDot;

	const textStyles = () => {
		if (isLiveKicker) {
			return liveTextStyles;
		} else {
			return fontWeight === 'bold' ? boldTextStyles : standardTextStyles;
		}
	};

	return (
		<div
			css={[commonStyles, textStyles()]}
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
