import { css } from '@emotion/react';
import type { TeamType } from '../types/sport';
import { MatchNav } from './MatchNav';
import { MatchStats } from './MatchStats';

type Props = {
	homeTeam: TeamType;
	awayTeam: TeamType;
	comments?: string;
	competition: string;
};

export const FootballMatch = ({
	homeTeam,
	awayTeam,
	comments,
	competition,
}: Props) => (
	<div
		// ToDo: change the background colour without resorting to this
		css={css`
			--match-stats-background: initial;
		`}
	>
		<MatchNav homeTeam={homeTeam} awayTeam={awayTeam} comments={comments} />
		<MatchStats home={homeTeam} away={awayTeam} competition={competition} />
	</div>
);
