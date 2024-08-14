import { css } from '@emotion/react';
import { textSans15, textSansBold17 } from '@guardian/source/foundations';
import type { TickerSettings } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import { useTicker } from '../hooks/useTicker';
import type { ReactComponent } from '../lib/ReactComponent';

const rootStyles = css`
	position: relative;
	height: 65px;
	margin-bottom: 15px;
	line-height: 18px;
`;

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
	color: #5056f5;
`;

//styles for the ticker background
const tickerBackgroundStyles = css`
	height: 10px;
	align-self: stretch;
	align-items: center;
	display: flex;
	border-radius: 8px;
	background: rgba(80, 86, 245, 0.35);
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

	const currencySymbol = tickerSettings.currencySymbol;
	return (
		<div ref={setNode} css={rootStyles}>
			<div>
				<div css={tickerContainerStyles}>
					<div css={headlineStyles}>
						{tickerSettings.copy.countLabel}
					</div>
					<div css={tickerBackgroundStyles} />
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
