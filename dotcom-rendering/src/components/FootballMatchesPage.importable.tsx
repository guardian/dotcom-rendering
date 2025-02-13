import { css } from '@emotion/react';
import { from, headlineBold20, space } from '@guardian/source/foundations';
import type { FootballMatches, FootballMatchKind } from '../footballMatches';
import { grid } from '../grid';
import type { EditionId } from '../lib/edition';
import type { Result } from '../lib/result';
import type { Nations } from './FootballCompetitionSelect';
import { FootballCompetitionSelect } from './FootballCompetitionSelect';
import { FootballMatchList } from './FootballMatchList';

type Props = {
	nations: Nations;
	guardianBaseUrl: string;
	kind: FootballMatchKind;
	goToCompetitionSpecificPage: (tag: string) => void;
	initialDays: FootballMatches;
	edition: EditionId;
	getMoreDays?: () => Promise<Result<'failed', FootballMatches>>;
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
	goToCompetitionSpecificPage,
	initialDays,
	edition,
	getMoreDays,
}: Props) => (
	<>
		<section css={css(grid.container)}>
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
		</section>
		<FootballMatchList
			initialDays={initialDays}
			edition={edition}
			getMoreDays={getMoreDays}
			guardianBaseUrl={guardianBaseUrl}
		/>
	</>
);
