import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import type { ComponentProps } from 'react';
import type { CricketMatch, Innings } from '../cricketMatchV2';
import { grid } from '../grid';
import { type EditionId } from '../lib/edition';
import { palette } from '../palette';
import { CricketMatchHeader } from './CricketMatchHeader/CricketMatchHeader';
import { CricketScorecardNew } from './CricketScorecardNew';
import type { Tabs } from './FootballMatchHeader/Tabs';

export const CricketScorecardPageNew = ({
	match,
	allInnings,
	edition,
	lineups,
	officials,
	tabs,
}: {
	match: CricketMatch;
	allInnings: Innings[];
	edition: EditionId;
	lineups: {
		homeTeam: string[];
		awayTeam: string[];
	};
	officials: string[];
	tabs: ComponentProps<typeof Tabs>;
}) => {
	return (
		<main id="maincontent">
			<CricketMatchHeader match={match} edition={edition} tabs={tabs} />
			<div css={bodyGridStyles}>
				<div
					css={css`
						${grid.column.centre};
					`}
				>
					<CricketScorecardNew
						allInnings={allInnings}
						lineups={lineups}
						officials={officials}
						homeTeam={match.homeTeam}
						awayTeam={match.awayTeam}
						matchResult={match.result}
					/>
				</div>
			</div>
		</main>
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
