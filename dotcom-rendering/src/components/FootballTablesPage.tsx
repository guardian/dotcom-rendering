import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	space,
	until,
} from '@guardian/source/foundations';
import type { FootballTableCompetition } from '../footballTables';
import { grid } from '../grid';
import { palette } from '../palette';
import { AdSlot } from './AdSlot.web';
import { FootballTableList } from './FootballTableList';
import { FootballTablesCompetitionSelect } from './FootballTablesCompetitionSelect.importable';
import { Island } from './Island';
import { Region } from '../footballDataPage';

type Props = {
	regions: Region[];
	pageId: string;
	tableCompetitions: FootballTableCompetition[];
	renderAds: boolean;
	guardianBaseUrl: string;
};

export const FootballTablesPage = ({
	regions,
	pageId,
	tableCompetitions: competitions,
	renderAds,
	guardianBaseUrl,
}: Props) => (
	<main
		id="maincontent"
		data-layout="FootballDataPageLayout"
		css={css`
			${grid.paddedContainer}
			position: relative;
			${from.tablet} {
				&::before,
				&::after {
					content: '';
					position: absolute;
					border-left: 1px solid ${palette('--article-border')};
					top: 0;
					bottom: 0;
				}

				&::after {
					right: 0;
				}
			}

			padding-bottom: ${space[9]}px;
		`}
	>
		<h1
			css={css`
				${headlineBold20}
				padding: ${space[2]}px 0 ${space[3]}px;
				${grid.column.centre}
				grid-row: 1;
				${from.leftCol} {
					${grid.between('left-column-start', 'centre-column-end')}
				}
			`}
		>
			Football tables
		</h1>
		<div
			css={css`
				margin-top: ${space[3]}px;
				margin-bottom: ${space[6]}px;
				${grid.column.centre}
				grid-row: 2;
			`}
		>
			<Island priority="feature" defer={{ until: 'visible' }}>
				<FootballTablesCompetitionSelect
					regions={regions}
					pageId={pageId}
					guardianBaseUrl={guardianBaseUrl}
				/>
			</Island>
		</div>
		<div
			css={css`
				${grid.column.centre}
				grid-row: 3;
				${from.leftCol} {
					${grid.between('left-column-start', 'centre-column-end')}
				}
				position: relative;
			`}
		>
			<FootballTableList
				competitions={competitions}
				guardianBaseUrl={guardianBaseUrl}
			/>
		</div>
		{renderAds && (
			<div
				css={css`
					${grid.column.right}
					/**  ToDo: review what line to grow the ad to */
					/** This allows the ad to grow beyond the third row content (up to line 5) */
					grid-row: 1 / 5;
					${until.desktop} {
						display: none;
					}
				`}
			>
				<AdSlot position="football-right" />
			</div>
		)}
	</main>
);
