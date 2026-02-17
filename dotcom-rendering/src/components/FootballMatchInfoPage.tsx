import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { type FootballMatchStats } from '../footballMatchStats';
import { type FootballMatch } from '../footballMatchV2';
import { type FootballTableSummary } from '../footballTables';
import { grid } from '../grid';
import { type EditionId } from '../lib/edition';
import { palette } from '../palette';
import { FootballMatchHeader } from './FootballMatchHeader.importable';
import { FootballMatchInfo } from './FootballMatchInfo';
import { Island } from './Island';

export const FootballMatchInfoPage = ({
	matchStats,
	matchInfo,
	competitionName,
	edition,
	matchHeaderUrl,
	table,
}: {
	matchStats: FootballMatchStats;
	matchInfo: FootballMatch;
	competitionName: string;
	edition: EditionId;
	matchHeaderUrl: URL;
	table?: FootballTableSummary;
}) => {
	return (
		<main id="maincontent">
			<Island priority="feature" defer={{ until: 'visible' }}>
				<FootballMatchHeader
					leagueName={competitionName}
					match={matchInfo}
					tabs={{
						selected: 'info',
						matchKind: matchInfo.kind,
						// We don't have these urls in the data yet. This will be fixed in upcoming PRs.
						reportURL: undefined,
						liveURL: undefined,
					}}
					edition={edition}
					matchHeaderURL={matchHeaderUrl}
				/>
			</Island>
			<div css={bodyGridStyles}>
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
