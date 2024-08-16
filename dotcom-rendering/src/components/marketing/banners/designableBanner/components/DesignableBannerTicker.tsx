import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	textSans15,
	textSansBold17,
	space,
} from '@guardian/source/foundations';
import { TickerCountType } from '@guardian/support-dotcom-components';
import type { TickerSettings } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import { useIsInView } from '../../../../../lib/useIsInView';
import { useTicker } from '../../../hooks/useTicker';
import type { ReactComponent } from '../../../lib/ReactComponent';
import type { TickerStylingSettings } from '../settings';
import { templateSpacing } from '../styles/templateStyles';

const progressBarHeight = 12;
const tickerFillOffset = 15;
const overFilledTickerOffset = 10;

const styles = {
	containerStyles: css`
		position: relative;
		${templateSpacing.bannerTicker}
	`,
	tickerLabelsContainer: css`
		display: flex;
		justify-content: space-between;
		align-items: end;
		margin-bottom: ${space[1]}px;
		padding-top: 7px;
	`,
	goalLabelStyles: css`
		${textSans15};
	`,

	countLabelStyles: (colour: string) => css`
		${textSansBold17};
		color: ${colour};
		line-height: 1.3;
	`,
	progressBarContainerStyles: css`
		position: relative;
	`,
	progressBarStyles: (backgroundColour: string) => css`
		position: relative;
		overflow: hidden;
		width: 100%;
		height: ${progressBarHeight}px;
		background: ${backgroundColour};
		border-radius: 8px;
	`,
	progressBarTransform: (
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
	},
	filledProgressStyles: (
		end: number,
		runningTotal: number,
		total: number,
		colour: string,
		isGoalReached: boolean,
	): SerializedStyles => css`
		height: ${progressBarHeight}px;
		width: calc(
			100% - ${isGoalReached ? overFilledTickerOffset : tickerFillOffset}%
		);
		transform: ${styles.progressBarTransform(end, runningTotal, total)};
		transition: transform 3s cubic-bezier(0.25, 0.55, 0.2, 0.85);
		background-color: ${colour};
	`,
	soFarContainerStyles: css`
		padding-right: ${space[5]}px;
	`,
	goalContainerStyles: css`
		text-align: end;
		margin-right: ${tickerFillOffset}%;
		transform: translateX(50%);
	`,
};

type DesignableBannerTickerProps = {
	tickerSettings: TickerSettings;
	stylingSettings: TickerStylingSettings;
};

const DesignableBannerTicker: ReactComponent<DesignableBannerTickerProps> = ({
	tickerSettings,
	stylingSettings,
}: DesignableBannerTickerProps) => {
	const [readyToAnimate, setReadyToAnimate] = useState(false);

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			setTimeout(() => setReadyToAnimate(true), 500);
		}
	}, [hasBeenSeen]);

	const total = tickerSettings.tickerData?.total ?? 1;
	const goal = tickerSettings.tickerData?.goal ?? 1;
	const isGoalReached = total >= goal;
	const runningTotal = useTicker(total, readyToAnimate);

	const currencySymbol =
		tickerSettings.countType === TickerCountType.money
			? tickerSettings.currencySymbol
			: '';

	return (
		<div ref={setNode} css={styles.containerStyles}>
			<div css={styles.progressBarContainerStyles}>
				<div
					css={styles.progressBarStyles(
						stylingSettings.progressBarBackgroundColour,
					)}
				>
					<div
						css={styles.filledProgressStyles(
							goal,
							runningTotal,
							total,
							stylingSettings.filledProgressColour,
							isGoalReached,
						)}
					/>
				</div>
			</div>
			<div css={styles.tickerLabelsContainer}>
				<div css={styles.soFarContainerStyles}>
					<div css={styles.goalLabelStyles}>
						<span
							css={styles.countLabelStyles(
								stylingSettings.textColour,
							)}
						>
							{currencySymbol}
							{runningTotal.toLocaleString()}
						</span>{' '}
						of {currencySymbol}
						{tickerSettings.tickerData?.goal.toLocaleString()} goal
					</div>
				</div>
			</div>
		</div>
	);
};

export { DesignableBannerTicker };
