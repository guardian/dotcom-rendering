import { useEffect, useState } from 'react';
import { useAppSyncEvent } from './AppSyncEvent.importable';
import { MatchNav, type Team } from './MatchNav';

type Props = {
	homeTeam: Team;
	awayTeam: Team;
	matchId: string;
	comments?: string;
	usage: 'MatchSummary' | 'Article';
};

export const MatchUpdate = ({
	homeTeam,
	awayTeam,
	matchId,
	comments,
	usage,
}: Props) => {
	const [homeTeamInternal, setHomeTeamInternal] = useState(homeTeam);
	const [awayTeamInternal, setAwayTeamInternal] = useState(awayTeam);
	const liveScoreEvent = useAppSyncEvent();

	useEffect(() => {
		if (!liveScoreEvent) return;
		if (liveScoreEvent.matchId !== matchId) return;

		for (const team of liveScoreEvent.teams) {
			if (team.isHomeTeam && team.name === homeTeamInternal.name) {
				setHomeTeamInternal({
					...homeTeamInternal,
					score: Number(team.score),
				});
			}
			if (!team.isHomeTeam && team.name === awayTeamInternal.name) {
				setAwayTeamInternal({
					...awayTeamInternal,
					score: Number(team.score),
				});
			}
		}
	}, [liveScoreEvent, matchId, homeTeamInternal, awayTeamInternal]);

	return (
		<MatchNav
			homeTeam={homeTeamInternal}
			awayTeam={awayTeamInternal}
			comments={comments}
			usage={usage}
		/>
	);
};
