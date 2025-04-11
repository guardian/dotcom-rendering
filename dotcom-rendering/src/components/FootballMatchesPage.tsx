import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	space,
	until,
} from '@guardian/source/foundations';
import type { FootballMatches, FootballMatchKind } from '../footballMatches';
import { grid } from '../grid';
import type { EditionId } from '../lib/edition';
import type { Result } from '../lib/result';
import { palette } from '../palette';
import type { Region } from '../sportDataPage';
import { AdSlot } from './AdSlot.web';
import { FootballCompetitionSelect } from './FootballCompetitionSelect';
import { FootballMatchList } from './FootballMatchList';

type Props = {
	regions: Region[];
	guardianBaseUrl: string;
	kind: FootballMatchKind;
	initialDays: FootballMatches;
	edition: EditionId;
	goToCompetitionSpecificPage: (tag: string) => void;
	getMoreDays?: () => Promise<Result<'failed', FootballMatches>>;
	renderAds: boolean;
	pageId: string;
	now: string;
};

const createTitle = (kind: FootballMatchKind, edition: EditionId) => {
	if (edition === 'US' && kind === 'FootballFixture') {
		return 'Soccer schedules';
	}

	switch (kind) {
		case 'FootballFixture':
			return 'Football fixtures';
		case 'FootballLive':
			return 'Live football scores';
		case 'FootballResult':
			return 'Football results';
	}
};

export const FootballMatchesPage = ({
	regions,
	now,
	guardianBaseUrl,
	kind,
	initialDays,
	edition,
	goToCompetitionSpecificPage,
	getMoreDays,
	renderAds,
	pageId,
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
			{createTitle(kind, edition)}
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
				kind={kind}
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
			<FootballMatchList
				now={now}
				initialDays={initialDays}
				edition={edition}
				getMoreDays={getMoreDays}
				guardianBaseUrl={guardianBaseUrl}
			/>
		</div>

		{renderAds && (
			<div
				css={css`
					${grid.column.right}
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
