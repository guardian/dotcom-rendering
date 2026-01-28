import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { type FootballMatchStats } from '../footballMatchStats';
import { type FootballMatch } from '../footballMatchV2';
import { type FootballTableSummary } from '../footballTables';
import { grid } from '../grid';
import { type EditionId } from '../lib/edition';
import { palette } from '../palette';
import { FootballMatchHeader } from './FootballMatchHeader/FootballMatchHeader';
import { FootballMatchInfo } from './FootballMatchInfo';

export const FootballMatchInfoPage = ({
	matchStats,
	matchInfo,
	competitionName,
	edition,
	table,
}: {
	matchStats: FootballMatchStats;
	matchInfo: FootballMatch;
	competitionName: string;
	edition: EditionId;
	table?: FootballTableSummary;
}) => {
	return (
		<main id="maincontent">
			<FootballMatchHeader
				leagueName={competitionName}
				match={matchInfo}
				tabs={{
					selected: 'info',
					reportURL: undefined,
					liveURL: undefined,
					matchKind: matchInfo.kind,
				}}
				edition={edition}
			/>
			<div css={gridStyles}>
				<div
					css={css`
						${grid.column.centre};
					`}
				>
					<FootballMatchInfo matchStats={matchStats} table={table} />
				</div>
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
