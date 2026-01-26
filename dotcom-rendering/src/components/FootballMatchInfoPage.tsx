import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { type FootballMatchStats } from '../footballMatchStats';
import { type FootballTableSummary } from '../footballTables';
import { grid } from '../grid';
import { palette } from '../palette';
import { FootballMatchInfo } from './FootballMatchInfo';

export const FootballMatchInfoPage = ({
	match,
	table,
}: {
	match: FootballMatchStats;
	table?: FootballTableSummary;
}) => {
	return (
		<main id="maincontent" css={gridStyles}>
			<div
				css={css`
					${grid.column.centre};
				`}
			>
				<FootballMatchInfo match={match} table={table} />
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
