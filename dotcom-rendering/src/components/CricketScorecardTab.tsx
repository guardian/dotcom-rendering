import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { useEffect, useRef } from 'react';
import type { CricketMatch } from '../cricketMatchV2';
import { grid } from '../grid';
import { palette } from '../palette';
import { CricketScorecardNew } from './CricketScorecardNew';

export type CricketScorecardTabProps = Pick<
	CricketMatch,
	'innings' | 'officials' | 'homeTeam' | 'awayTeam' | 'result'
>;

export const CricketScorecardTab = ({
	innings,
	officials,
	homeTeam,
	awayTeam,
	result,
}: CricketScorecardTabProps) => {
	const regionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// Focus the tab content when it renders for accessibility, so that screen readers will read out the scorecard label when it displays.
		regionRef.current?.focus({
			preventScroll: true,
		});
	}, []);

	return (
		<div
			ref={regionRef}
			css={bodyGridStyles}
			aria-label="Cricket scorecard"
			role="region"
			tabIndex={-1}
		>
			<div
				css={css`
					${grid.column.centre};
				`}
			>
				<CricketScorecardNew
					allInnings={innings}
					officials={officials}
					homeTeam={homeTeam}
					awayTeam={awayTeam}
					matchResult={result}
				/>
			</div>
		</div>
	);
};

const bodyGridStyles = css`
	${grid.paddedContainer}
	position: relative;
	padding-top: ${space[4]}px;
	padding-bottom: ${space[8]}px;
	${from.tablet} {
		padding-top: ${space[2]}px;
		padding-bottom: ${space[14]}px;
		&::before,
		&::after {
			content: '';
			position: absolute;
			border-left: 1px solid ${palette('--article-border')};
			z-index: 1;
			top: 0;
			bottom: 0;
		}

		&::after {
			right: 0;
		}
	}
`;
