import { DateCompetitionMatch } from 'src/types/sports';

interface Props {
	dateCompetition: DateCompetitionMatch;
}

export const MatchList: React.FC<Props> = ({ dateCompetition }) => {
	return (
		<>
			<div>{dateCompetition.date}</div>
			{dateCompetition.competitions.map((comp) => (
				<div key={comp.competition.id}>
					<h3>{comp.competition.fullName}</h3>
					<table>
						<thead hidden>
							<tr>
								<th>Match status / kick off time</th>
								<th>Match details</th>
							</tr>
						</thead>
						<tbody>
							{comp.matches.map((match) => (
								<tr key={match.id} id={match.id}>
									<td>{match.date.toString()}</td>
									<td>
										<strong>{match.homeTeam.name}</strong>{' '}
										vs{' '}
										<strong>{match.awayTeam.name}</strong>
										{match.type === 'MatchDay' &&
											match.liveMatch && (
												<span> (Live!)</span>
											)}
										{match.type === 'Fixture' && (
											<span> (Fixture)</span>
										)}
										{match.type === 'Result' && (
											<span> (Result)</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</>
	);
};
