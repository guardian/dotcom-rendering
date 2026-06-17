import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import type { CricketMatch } from '../cricketMatchV2';
import { grid } from '../grid';
import { type EditionId } from '../lib/edition';
import { palette } from '../palette';
import { CricketMatchHeaderWrapper } from './CricketMatchHeaderWrapper.island';
import { CricketScorecardNew } from './CricketScorecardNew';

export const CricketScorecardPageNew = ({
	match,
	edition,
	matchHeaderURL,
	infoURL,
	liveURL,
	reportURL,
}: {
	match: CricketMatch;
	edition: EditionId;
	matchHeaderURL: string;
	infoURL?: URL;
	liveURL?: URL;
	reportURL?: URL;
}) => {
	return (
		<main id="maincontent">
			<CricketMatchHeaderWrapper
				initialData={match}
				edition={edition}
				selectedTab={'info'}
				matchHeaderURL={matchHeaderURL}
				infoURL={infoURL}
				liveURL={liveURL}
				reportURL={reportURL}
			/>
			<div css={bodyGridStyles}>
				<div
					css={css`
						${grid.column.centre};
					`}
				>
					<CricketScorecardNew
						allInnings={match.innings}
						officials={match.officials}
						homeTeam={match.homeTeam}
						awayTeam={match.awayTeam}
						matchResult={match.result}
					/>
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
