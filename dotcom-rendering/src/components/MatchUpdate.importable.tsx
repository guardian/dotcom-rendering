import { useEffect, useRef, useState } from 'react';
import { createFootballConfetti } from '../lib/confetti';
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
	const homeScoreRef = useRef<HTMLDivElement>(null);
	const awayScoreRef = useRef<HTMLDivElement>(null);
	const liveScoreEvent = useAppSyncEvent();

	useEffect(() => {
		if (!liveScoreEvent) return;
		if (liveScoreEvent.matchId !== matchId) return;

		for (const eventTeam of liveScoreEvent.teams) {
			setHomeTeamInternal((prevTeam) => {
				const hasScoreChanged =
					eventTeam.isHomeTeam &&
					eventTeam.name === prevTeam.name &&
					Number(eventTeam.score) > (prevTeam.score ?? 0);
				if (hasScoreChanged && homeScoreRef.current) {
					createFootballConfetti(homeScoreRef.current, {
						particleCount: 80,
						duration: 3000,
					});
				}
				return eventTeam.isHomeTeam && eventTeam.name === prevTeam.name
					? {
							...prevTeam,
							score: Number(eventTeam.score),
					  }
					: prevTeam;
			});
			setAwayTeamInternal((prevTeam) => {
				const hasScoreChanged =
					!eventTeam.isHomeTeam &&
					eventTeam.name === prevTeam.name &&
					Number(eventTeam.score) > (prevTeam.score ?? 0);
				if (hasScoreChanged && awayScoreRef.current) {
					createFootballConfetti(awayScoreRef.current, {
						particleCount: 80,
						duration: 3000,
					});
				}
				return !eventTeam.isHomeTeam && eventTeam.name === prevTeam.name
					? {
							...prevTeam,
							score: Number(eventTeam.score),
					  }
					: prevTeam;
			});
		}
	}, [liveScoreEvent, matchId]);

	return (
		<MatchNav
			homeTeam={homeTeamInternal}
			awayTeam={awayTeamInternal}
			comments={comments}
			usage={usage}
			homeScoreRef={homeScoreRef}
			awayScoreRef={awayScoreRef}
		/>
	);
};
