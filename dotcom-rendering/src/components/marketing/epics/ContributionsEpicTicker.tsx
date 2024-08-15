import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { textSans15, textSansBold17 } from '@guardian/source/foundations';
import type { TickerSettings } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import { useTicker } from '../hooks/useTicker';
import type { ReactComponent } from '../lib/ReactComponent';

//styles for the container that holds the ticker
const tickerContainerStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 4px 8px 4px 8px;
`;

//styles for headline text (which is optional)
const headlineStyles = css`
	${textSansBold17}
`;

//styles for the numerical count (total raised so far) and the goal text
const goalLabelStyles = css`
	${textSans15};
`;

const countLabelStyles = css`
	${textSansBold17};
	/* stylelint-disable-next-line color-no-hex */
	color: #5056f5;
`;

//styles for the ticker background
const tickerBackgroundStyles = css`
	height: 10px;
	align-self: stretch;
	align-items: center;
	display: flex;
	border-radius: 8px;
	/* stylelint-disable-next-line color-no-hex */
	background: rgba(80, 86, 245, 0.35);
	overflow-x: hidden;
	width: 100%;
	position: relative;
`;

//styles for the moving progress bar
const progressBarStyles = css`
	overflow: hidden;
	width: 100%;
	height: 10px;
	position: absolute;
	border-radius: 8px;
`;

const progressBarTransform = (
	goal: number,
	total: number,
	runningTotal: number,
): string => {
	const haveStartedAnimating = runningTotal >= 0;

	if (!haveStartedAnimating) {
		return 'translateX(-100%)';
	}

	const percentage = (total / goal) * 100 - 100;
	return `translate3d(${percentage > 0 ? 0 : percentage}%, 0, 0)`;
};

const filledProgressStyles = (
	goal: number,
	runningTotal: number,
	total: number,
): SerializedStyles => css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	transform: ${progressBarTransform(goal, total, runningTotal)};
	transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
	background-color: #5056f5;
	height: 10px;
`;

export type Props = {
	tickerSettings: TickerSettings;
	total: number;
	goal: number;
};

export const ContributionsEpicTicker: ReactComponent<Props> = ({
	tickerSettings,
	total,
	goal,
}: Props) => {
	//state to track if the component is ready to animate
	const [readyToAnimate, setReadyToAnimate] = useState(false);
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		rootMargin: '-18px',
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			setTimeout(() => setReadyToAnimate(true), 1000);
		}
	}, [hasBeenSeen]);

	const runningTotal = useTicker(total, readyToAnimate);

	const currencySymbol = tickerSettings.currencySymbol;
	return (
		<div ref={setNode}>
			<div>
				<div css={tickerContainerStyles}>
					<div css={headlineStyles}>
						{tickerSettings.copy.countLabel}
					</div>
					<div css={tickerBackgroundStyles}>
						<div css={progressBarStyles}>
							<div
								css={filledProgressStyles(
									goal,
									runningTotal,
									total,
								)}
							/>
						</div>
					</div>
					<div css={goalLabelStyles}>
						<span css={countLabelStyles}>
							{currencySymbol}
							{runningTotal.toLocaleString()}
						</span>{' '}
						of {currencySymbol}
						{goal.toLocaleString()} goal
					</div>
				</div>
			</div>
		</div>
	);
};
