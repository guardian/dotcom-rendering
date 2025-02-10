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
	title: string;
	guardianBaseUrl: string;
	kind: FootballMatchKind;
	goToCompetitionSpecificPage: (tag: string) => void;
	initialDays: FootballMatches;
	edition: EditionId;
	getMoreDays?: () => Promise<Result<'failed', FootballMatches>>;
};

export const FootballMatchesPage = ({
	nations,
	title,
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
					padding-top: 6px;
					padding-bottom: ${space[3]}px;
					${grid.between('centre-column-start', 'centre-column-end')}
					${from.leftCol} {
						${grid.between(
							'left-column-start',
							'centre-column-end',
						)}
					}
				`}
			>
				{title}
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
