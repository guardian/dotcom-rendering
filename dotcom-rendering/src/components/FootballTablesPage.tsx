import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	space,
	until,
} from '@guardian/source/foundations';
import type { Region } from '../footballMatches';
import type { FootballTableData } from '../footballTables';
import { grid } from '../grid';
import { palette } from '../palette';
import { AdSlot } from './AdSlot.web';
import { FootballCompetitionSelect } from './FootballCompetitionSelect';
import { FootballTableList } from './FootballTableList';

type Props = {
	regions: Region[];
	pageId: string;
	goToCompetitionSpecificPage: (tag: string) => void;
	tables: FootballTableData[];
	renderAds: boolean;
	guardianBaseUrl: string;
};

export const FootballTablesPage = ({
	regions,
	pageId,
	goToCompetitionSpecificPage,
	tables,
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
			<FootballCompetitionSelect
				regions={regions}
				kind="Tables"
				pageId={pageId}
				onChange={goToCompetitionSpecificPage}
			/>
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
				tables={tables}
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
				<AdSlot position="right-football" />
			</div>
		)}
	</main>
);
