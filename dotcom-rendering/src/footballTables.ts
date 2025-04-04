import { listParse, type ParserError, type TeamScore } from './footballMatches';
import type {
	FEFootballTable,
	FEGroup,
	FELeagueTableEntry,
	FETeamResult,
} from './frontend/feFootballTablesPage';
import type { Result } from './lib/result';
import { ok } from './lib/result';

export type TeamResult = {
	matchId: string;
	self: TeamScore;
	foe: TeamScore;
};

type TeamInfo = {
	name: string;
	id: string;
	url?: string;
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

export type FootballTableCompetition = {
	url: string;
	name: string;
	hasGroups: boolean;
	dividers: number[];
	tables: FootballTableData[];
};

export type FootballTableData = {
	groupName?: string;
	entries: Entry[];
};

export type FootballTableCompetitions = FootballTableCompetition[];

const parseTables = (
	feGroups: FEFootballTable['groups'],
): Result<ParserError, FootballTableData[]> => {
	const groupsParser = listParse(parseTable);
	return groupsParser(feGroups);
};

const parseTable = (
	feGroup: FEGroup,
): Result<ParserError, FootballTableData> => {
	const entriesParser = listParse(parseEntry);
	const parsedEntries = entriesParser(feGroup.entries);

	if (parsedEntries.kind === 'error') {
		return parsedEntries;
	}

	return ok({
		groupName: feGroup.round.name,
		entries: parsedEntries.value,
	});
};

const parseResult = (result: FETeamResult): Result<ParserError, TeamResult> => {
	return ok({
		matchId: result.matchId,
		self: {
			name: result.self.name,
			score: result.self.score,
		},
		foe: {
			name: result.foe.name,
			score: result.foe.score,
		},
	});
};

const parseResults = (
	teamResults: FETeamResult[],
): Result<ParserError, TeamResult[]> => {
	const resultsParser = listParse(parseResult);
	return resultsParser(teamResults);
};

const parseEntry = (
	feEntry: FELeagueTableEntry,
): Result<ParserError, Entry> => {
	const { team, teamUrl } = feEntry;

	const parsedResults = parseResults(feEntry.results);

	if (parsedResults.kind === 'error') {
		return parsedResults;
	}

	return ok({
		position: team.rank,
		team: {
			name: team.name,
			id: team.id,
			url: teamUrl,
		},
		gamesPlayed: team.total.played,
		won: team.total.won,
		drawn: team.total.drawn,
		lost: team.total.lost,
		goalsFor: team.total.goalsFor,
		goalsAgainst: team.total.goalsAgainst,
		goalDifference: team.goalDifference,
		points: team.points,
		results: parsedResults.value,
	});
};

const parseFootballTables = (
	table: FEFootballTable,
): Result<ParserError, FootballTableCompetition> => {
	const parsedTables = parseTables(table.groups);

	if (parsedTables.kind === 'error') {
		return parsedTables;
	}

	return ok({
		url: table.competition.url,
		name: table.competition.fullName,
		hasGroups: table.hasGroups,
		dividers: table.competition.dividers ?? [],
		tables: parsedTables.value,
	});
};

// ToDo: if we don't return any errors can we remove the Result type?
export const parse: (
	frontendData: FEFootballTable[],
) => Result<ParserError, FootballTableCompetitions> =
	listParse(parseFootballTables);
