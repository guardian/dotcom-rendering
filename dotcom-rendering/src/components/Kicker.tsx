import { css } from '@emotion/react';
import { textSansBold14 } from '@guardian/source/foundations';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

// Defines a prefix to be used with a headline (e.g. 'Live /')
type Props = {
	text: string;
	color: string;
	backgroundColor?: string;
	showPulsingDot?: boolean;
	pulsingDotColor?: string;
	hideLineBreak?: boolean;
};

const textStyles = css`
	${textSansBold14}
	margin-right: 4px;
	padding: 0 4px;
	width: fit-content;
`;

export const Kicker = ({
	text,
	color,
	backgroundColor = 'transparent',
	showPulsingDot,
	pulsingDotColor,
	hideLineBreak,
}: Props) => {
	return (
		<div
			css={[
				textStyles,
				hideLineBreak &&
					css`
						display: inline-block;
					`,
			]}
			/** Dynamic styles are best in the style prop */
			style={{
				color,
				...(showPulsingDot && { backgroundColor }),
			}}
		>
			{showPulsingDot && (
				<Island priority="enhancement" defer={{ until: 'visible' }}>
					<PulsingDot colour={pulsingDotColor} />
				</Island>
			)}
			{text}
		</div>
	);
};
