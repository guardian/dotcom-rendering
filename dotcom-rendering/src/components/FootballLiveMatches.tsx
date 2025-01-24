import type { FootballMatches } from '../footballMatches';

type Props = {
	matches: FootballMatches;
};

export const FootballLiveMatches = ({ matches }: Props) => (
	<>
		{matches.map((day) => (
			<>
				<h2>{day.date.toString()}</h2>
				{day.competitions.map((competition) => (
					<>
						<h3>{competition.name}</h3>
						<ul>
							{competition.matches.map((match) => (
								<li>
									<time
										dateTime={match.dateTime.toISOString()}
									>
										{match.dateTime.getUTCHours()}:
										{match.dateTime.getUTCMinutes()}
									</time>
									{match.homeTeam.name} {match.homeTeam.score}
									-{match.awayTeam.score}{' '}
									{match.awayTeam.name}
								</li>
							))}
						</ul>
					</>
				))}
			</>
		))}
	</>
);
