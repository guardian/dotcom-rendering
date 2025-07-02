import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	headlineBold20,
	space,
	until,
} from '@guardian/source/foundations';
import type { FootballNavAtom as FootballNavAtomModel } from '../footballNavAtom';
import type { FootballTableCompetition } from '../footballTables';
import { grid } from '../grid';
import { palette } from '../palette';
import type { Region } from '../sportDataPage';
import { AdSlot } from './AdSlot.web';
import { FootballNavAtom } from './FootballNavAtom';
import { FootballTableList } from './FootballTableList';
import { FootballTablesCompetitionSelect } from './FootballTablesCompetitionSelect.importable';
import { Island } from './Island';

type Props = {
	regions: Region[];
	pageId: string;
	tableCompetitions: FootballTableCompetition[];
	renderAds: boolean;
	guardianBaseUrl: string;
	navAtom?: FootballNavAtomModel;
};

export const FootballTablesPage = ({
	regions,
	pageId,
	tableCompetitions: competitions,
	renderAds,
	guardianBaseUrl,
	navAtom,
}: Props) => {
	const navAtomIsDefined = !isUndefined(navAtom);
	return (
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
			<FootballNavAtom navAtom={navAtom} />
			<h1
				css={css`
					${headlineBold20}
					padding: ${space[2]}px 0 ${space[3]}px;
					${grid.column.centre}
					grid-row: ${navAtomIsDefined ? 2 : 1};
					${from.leftCol} {
						${grid.between(
							'left-column-start',
							'centre-column-end',
						)}
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
					grid-row: ${navAtomIsDefined ? 3 : 2};
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
					grid-row: ${navAtomIsDefined ? 4 : 3};
					${from.leftCol} {
						${grid.between(
							'left-column-start',
							'centre-column-end',
						)}
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
						/** This allows the ad to grow beyond the third row content (up to line 5) */
					grid-row: ${navAtomIsDefined ? '2 / 5' : '1 / 4'};
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
};
