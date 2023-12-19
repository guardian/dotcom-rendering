/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/modules/epics/ContributionsEpicTicker.tsx
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
import { textSans } from '@guardian/source-foundations';
import type { TickerSettings } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import { useTicker } from '../hooks/useTicker';
import type { ReactComponent } from '../lib/ReactComponent';

// This ticker component provides an animated progress bar and counter for the
// epic. It mirrors the behaviour of the "unlimited" ticker type from frontend.
// The "hardstop" type is not supported. The differences between the two relate
// to behaviour once the goal has been reached.

const rootStyles = css`
	position: relative;
	height: 65px;
	margin-bottom: 15px;
	line-height: 18px;
`;

const totalCountStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const soFarCountStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const countLabelStyles = css`
	${textSans.medium()}
`;

const progressBarHeight = 10;

const progressBarContainerStyles = css`
	width: 100%;
	height: ${progressBarHeight}px;
	background-color: #dda7a1;
	position: absolute;
	bottom: 0;
	margin-top: 40px;
`;

const progressBarStyles = css`
	overflow: hidden;
	width: 100%;
	height: ${progressBarHeight}px;
	position: absolute;
`;

const soFarContainerStyles = css`
	position: absolute;
	left: 0;
	bottom: ${progressBarHeight + 5}px;
`;

const progressBarTransform = (
	end: number,
	runningTotal: number,
	total: number,
): string => {
	const haveStartedAnimating = runningTotal > 0;

	if (!haveStartedAnimating) {
		return 'translateX(-100%)';
	}

	const percentage = (total / end) * 100 - 100;

	return `translate3d(${percentage >= 0 ? 0 : percentage}%, 0, 0)`;
};

const filledProgressStyles = (
	end: number,
	runningTotal: number,
	total: number,
): SerializedStyles => css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	transform: ${progressBarTransform(end, runningTotal, total)};
	transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
	background-color: ${palette.news[400]};
`;

const goalContainerStyles: SerializedStyles = css`
	position: absolute;
	right: 0;
	bottom: ${progressBarHeight + 5}px;
	text-align: right;
`;

const goalMarkerStyles = (transform: string): SerializedStyles => css`
	border-right: 2px solid ${palette.neutral[7]};
	content: ' ';
	display: block;
	height: 12px;
	margin-top: -2px;
	transform: ${transform};
`;

type MarkerProps = {
	goal: number;
	end: number;
};

const Marker: ReactComponent<MarkerProps> = ({ goal, end }: MarkerProps) => {
	if (end > goal) {
		const markerTranslate = (goal / end) * 100 - 100;
		const markerTransform = `translate3d(${markerTranslate}%, 0, 0)`;

		return <div css={goalMarkerStyles(markerTransform)} />;
	} else {
		return <></>;
	}
};

export type Props = {
	settings: TickerSettings;
	total: number;
	goal: number;
};

export const ContributionsEpicTicker: ReactComponent<Props> = ({
	settings,
	total,
	goal,
}: Props) => {
	const [readyToAnimate, setReadyToAnimate] = useState<boolean>(false);
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		rootMargin: '-18px',
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			setTimeout(() => setReadyToAnimate(true), 500);
		}
	}, [hasBeenSeen]);

	const runningTotal = useTicker(total, readyToAnimate);

	const goalReached = total >= goal;
	const currencySymbol =
		settings.countType === 'money' ? settings.currencySymbol : '';

	// If we've exceeded the goal then extend the bar 15% beyond the total
	const end = total > goal ? total + total * 0.15 : goal;

	return (
		<div ref={setNode} css={rootStyles}>
			<div>
				<div css={soFarContainerStyles}>
					<div css={soFarCountStyles}>
						{goalReached
							? settings.copy.goalReachedPrimary
							: `${currencySymbol}${runningTotal.toLocaleString()}`}
					</div>
					<div css={countLabelStyles}>
						{goalReached
							? settings.copy.goalReachedSecondary
							: settings.copy.countLabel}
					</div>
				</div>

				<div css={goalContainerStyles}>
					<div css={totalCountStyles}>
						{goalReached
							? `${currencySymbol}${total.toLocaleString()}`
							: `${currencySymbol}${goal.toLocaleString()}`}
					</div>
					<div css={countLabelStyles}>
						{goalReached ? settings.copy.countLabel : 'our goal'}
					</div>
				</div>
			</div>

			<div css={progressBarContainerStyles}>
				<div css={progressBarStyles}>
					<div
						css={filledProgressStyles(end, runningTotal, total)}
					></div>
				</div>
				<Marker goal={goal} end={end} />
			</div>
		</div>
	);
};
