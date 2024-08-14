import { css } from '@emotion/react';
import {
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import type { TickerSettings } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import { useTicker } from '../hooks/useTicker';
import type { ReactComponent } from '../lib/ReactComponent';
import { useIsInView } from '../../../lib/useIsInView';

const styles = {
	tickerProgressBar: css`
		position: relative;
		height: ${space[3]}px;
	`,

	tickerProgressBarBackground: () => css`
		width: 100%;
		height: ${space[3]}px;
		overflow: hidden;
		background-color: #5056f5;
		position: absolute;
		border-radius: ${space[2]}px;
	`,

	progressBarTransform: (
		goal: number,
		total: number,
		runningTotal: number,
	): string => {
		const haveStartedAnimating = runningTotal > 0;
		if (!haveStartedAnimating) {
			return 'translateX(-100%)';
		}
		const percentage = (total / goal) * 100 - 100;
		return `translate3d(${percentage >= 0 ? 0 : percentage}%, 0, 0)`;
	},

	tickerProgressBarFill: (
		goal: number,
		total: number,
		runningTotal: number,
	) => css`
		background-color: rgba(80, 86, 245, 0.35);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transform: ${styles.progressBarTransform(goal, total, runningTotal)};
		transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
		border-radius: ${space[2]}px;
	`,

	tickerHeadline: () => css`
		${textSansBold17};
		margin-bottom: ${space[2]}px;
	`,

	tickerLabelContainer: () => css`
		position: relative;
		display: flex;
		margin-top: ${space[1]}px;
	`,

	tickerLabel: () => css`
		${textSans17}
	`,

	tickerLabelTotal: () => css`
		${textSansBold17};
		color: #5056f5;
	`,

	containerStyles: () => css`
		position: relative;
	`,
};

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
	const isGoalReached = total >= goal;
	const currencySymbol = tickerSettings.currencySymbol;

	return (
		<div ref={setNode} css={styles.containerStyles}>
			<h2 css={styles.tickerHeadline()}>
				{isGoalReached
					? tickerSettings.copy.goalReachedPrimary
					: tickerSettings.copy.countLabel}
			</h2>
			<div css={styles.tickerProgressBar}>
				<div css={styles.tickerProgressBarBackground}>
					<div
						css={styles.tickerProgressBarFill(
							goal,
							total,
							runningTotal,
						)}
					/>
				</div>
			</div>
			<div css={styles.tickerLabelContainer()}>
				<p css={styles.tickerLabel}>
					<span css={styles.tickerLabelTotal}>
						{currencySymbol}
						{total.toLocaleString()}
					</span>{' '}
					of {currencySymbol}
					{goal.toLocaleString()} goal
				</p>
			</div>
		</div>
	);
};
