import { css } from '@emotion/react';
import { from, headlineBold20, space } from '@guardian/source/foundations';
import type { FootballMatches, FootballMatchKind } from '../footballMatches';
import { grid } from '../grid';
import type { EditionId } from '../lib/edition';
import type { Result } from '../lib/result';
import { palette } from '../palette';
import { AdSlot } from './AdSlot.web';
import type { Nations } from './FootballCompetitionSelect';
import { FootballCompetitionSelect } from './FootballCompetitionSelect';
import { FootballMatchList } from './FootballMatchList';

type Props = {
	nations: Nations;
	guardianBaseUrl: string;
	kind: FootballMatchKind;
	initialDays: FootballMatches;
	edition: EditionId;
	goToCompetitionSpecificPage: (tag: string) => void;
	getMoreDays?: () => Promise<Result<'failed', FootballMatches>>;
	renderAds: boolean;
};

const createTitle = (kind: FootballMatchKind, edition: EditionId) => {
	if (edition === 'US' && kind === 'Fixture') {
		return 'Soccer schedules';
	}

	switch (kind) {
		case 'Fixture':
			return 'Football fixtures';
		case 'Live':
			return 'Live football scores';
		case 'Result':
			return 'Football results';
	}
};

export const FootballMatchesPage = ({
	nations,
	guardianBaseUrl,
	kind,
	initialDays,
	edition,
	goToCompetitionSpecificPage,
	getMoreDays,
	renderAds,
}: Props) => (
	<main id="maincontent" data-layout="FootballDataPageLayout">
		<div
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
			`}
		>
			<h1
				css={css`
					${headlineBold20}
					padding: ${space[2]}px 0 ${space[3]}px;
					${grid.column.centre}
					${from.leftCol} {
						${grid.between(
							'left-column-start',
							'centre-column-end',
						)}
					}
				`}
			>
				{createTitle(kind, edition)}
			</h1>
			{kind !== 'Live' && (
				<div
					css={css`
						margin-top: ${space[3]}px;
						margin-bottom: ${space[6]}px;
						${grid.column.centre}
					`}
				>
					<FootballCompetitionSelect
						nations={nations}
						kind={kind}
						onChange={goToCompetitionSpecificPage}
					/>
				</div>
			)}
			{renderAds && <AdSlot position="right-football" />}
		</div>
		<FootballMatchList
			initialDays={initialDays}
			edition={edition}
			getMoreDays={getMoreDays}
			guardianBaseUrl={guardianBaseUrl}
		/>
	</main>
);
