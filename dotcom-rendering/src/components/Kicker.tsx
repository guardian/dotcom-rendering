import { css } from '@emotion/react';
import { textSansBold14 } from '@guardian/source/foundations';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

type Props = {
	text: string;
	color: string;
	backgroundColor?: string;
	isSublink?: boolean;
	showPulsingDot?: boolean;
	pulsingDotColor?: string;
	hideLineBreak?: boolean;
};

const textStyles = css`
	${textSansBold14}
	margin-right: 4px;
	width: fit-content;
`;

/**
 * The kicker is a prefix to be used with a headline (e.g. 'Live')
 */
export const Kicker = ({
	text,
	color,
	backgroundColor = 'transparent',
	showPulsingDot,
	isSublink,
	pulsingDotColor = color,
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
				...(!isSublink &&
					showPulsingDot && { backgroundColor, padding: '0 4px' }),
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
