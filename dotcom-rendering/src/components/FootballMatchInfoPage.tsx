import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { type FootballMatchStats } from '../footballMatchStats';
import { type FootballMatch } from '../footballMatchV2';
import { type FootballTableSummary } from '../footballTables';
import { grid } from '../grid';
import { palette } from '../palette';
import { FootballMatchHeader } from './FootballMatchHeader/FootballMatchHeader';
import { FootballMatchInfo } from './FootballMatchInfo';

export const FootballMatchInfoPage = ({
	matchStats,
	matchInfo,
	table,
}: {
	matchStats: FootballMatchStats;
	matchInfo: FootballMatch;
	table?: FootballTableSummary;
}) => {
	return (
		<main id="maincontent" css={gridStyles}>
			<div
				css={css`
					${grid.column.centre};
				`}
			>
				<FootballMatchHeader
					leagueName={''}
					match={matchInfo}
					tabs={{
						selected: 'info',
						reportURL: undefined,
						liveURL: undefined,
					}}
					edition={'UK'}
				/>
				<FootballMatchInfo matchStats={matchStats} table={table} />
			</div>
		</main>
	);
};

const gridStyles = css`
	${grid.paddedContainer}
	position: relative;
	${from.tablet} {
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
