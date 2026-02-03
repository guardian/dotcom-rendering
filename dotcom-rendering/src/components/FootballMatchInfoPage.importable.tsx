import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { type FootballMatchStats } from '../footballMatchStats';
import { type FootballMatch } from '../footballMatchV2';
import { type FootballTableSummary } from '../footballTables';
import { grid } from '../grid';
import { type EditionId } from '../lib/edition';
import { useApi } from '../lib/useApi';
import { palette } from '../palette';
import { FootballMatchHeader } from './FootballMatchHeader/FootballMatchHeader';
import { FootballMatchInfo } from './FootballMatchInfo';

export const FootballMatchInfoPage = ({
	matchStats,
	matchInfo,
	competitionName,
	edition,
	matchUrl,
	table,
}: {
	matchStats: FootballMatchStats;
	matchInfo: FootballMatch;
	competitionName: string;
	edition: EditionId;
	matchUrl: string;
	table?: FootballTableSummary;
}) => {
	const { data, error } = useApi<{
		reportUrl?: string;
		minByMinUrl?: string;
	}>(matchUrl, { errorRetryCount: 1 });

	if (error) {
		// Send the error to Sentry
		window.guardian.modules.sentry.reportError(error, 'match-header-tabs');
	}

	return (
		<main id="maincontent">
			<FootballMatchHeader
				leagueName={competitionName}
				match={matchInfo}
				tabs={{
					selected: 'info',
					matchKind: matchInfo.kind,
					reportURL: data?.reportUrl
						? new URL(data.reportUrl)
						: undefined,
					liveURL: data?.minByMinUrl
						? new URL(data.minByMinUrl)
						: undefined,
				}}
				edition={edition}
			/>
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
