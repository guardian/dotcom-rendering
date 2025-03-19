import { listParse, type ParserError, type TeamScore } from './footballMatches';
import { error, ok, Result } from './lib/result';

type Competition = {
	url: string;
	name: string;
	dividers: number[];
};

type TeamResult = {
	self: TeamScore;
	foe: TeamScore;
};

type TeamInfo = {
	name: string;
	id: string;
	url: string;
};

type Entry = {
	position: number;
	team: TeamInfo;
	gamesPlayed: number;
	won: number;
	drawn: number;
	lost: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: number;
	points: number;
	results: TeamResult[];
};

type FootballTable = {
	competition: Competition;
	entries: Entry[];
	linkToFullTable: boolean;
};

export type FootballTables = FootballTable[];

const parseCompetition = (
	competitionSummary: FECompetitionSummary,
): Result<ParserError, Competition> => {
	return ok({
		url: competitionSummary.url,
		name: competitionSummary.fullName,
		dividers: competitionSummary.dividers,
	});
};

const parseEntry = (
	tableEntry: FELeagueTableEntry,
): Result<ParserError, Entry> => {
	return ok({
		position: tableEntry.team.rank,
		team: { name: tableEntry.team.name, id: tableEntry.team.id, url: '' }, // TODO: @Configuration.staticSport.path/football/crests/60/@{entry.team.id}.png
		gamesPlayed: tableEntry.team.total.played,
		won: tableEntry.team.total.won,
		drawn: tableEntry.team.total.drawn,
		lost: tableEntry.team.total.lost,
		goalsFor: tableEntry.team.total.goalsFor,
		goalsAgainst: tableEntry.team.total.goalsAgainst,
		goalDifference: tableEntry.team.goalDifference,
		points: tableEntry.team.points,
		results: [], // TODO: calculate team results
	});
};

const parseFootballTables = (
	table: EFFootballTable,
): Result<string, FootballTable> => {
	const competitions = parseCompetition(table.competition);
	if (competitions.kind === 'error') {
		return error('Failed to parse competition');
	}

	return ok({
		competition: competitions.value,
		entries: [], // TODO: parse entries
		linkToFullTable: false, // TODO: calculate linkToFullTable
	});
};

export const parse: (
	frontendData: EFFootballTable[],
) => Result<string, FootballTables> = listParse(parseFootballTables);
