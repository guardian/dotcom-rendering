import { listParse, type ParserError, type TeamScore } from './footballMatches';
import { FECompetitionSummary } from './frontend/feFootballMatchListPage';
import { FEFootballTable } from './frontend/feFootballTablesPage';
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

const parseFootballTables = (
	table: FEFootballTable,
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
	frontendData: FEFootballTable[],
) => Result<string, FootballTables> = listParse(parseFootballTables);
