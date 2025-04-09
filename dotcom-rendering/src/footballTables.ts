import { isUndefined } from '@guardian/libs';
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

type Team = {
	name: string;
	id: string;
	url?: string;
};

type Entry = {
	position: number;
	team: Team;
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
	tables: FootballTable[];
};

export type FootballTable = {
	groupName?: string;
	entries: Entry[];
};

export type FootballTableCompetitions = FootballTableCompetition[];

const parseTable = (feGroup: FEGroup): Result<ParserError, FootballTable> => {
	const parsedEntries = parseEntries(feGroup.entries);

	if (parsedEntries.kind === 'error') {
		return parsedEntries;
	}

	return ok({
		groupName: feGroup.round.name,
		entries: parsedEntries.value.sort((a, b) => a.position - b.position),
	});
};

const parseTables = listParse(parseTable);

const parseResult = (result: FETeamResult): Result<ParserError, TeamResult> =>
	ok({
		matchId: result.matchId,
		self: {
			id: result.self.id,
			name: result.self.name,
			score: result.self.score,
		},
		foe: {
			id: result.foe.id,
			name: result.foe.name,
			score: result.foe.score,
		},
	});

const parseResults = (
	teamResults: FETeamResult[],
): Result<ParserError, TeamResult[]> => {
	const parsedResults = listParse(parseResult)(teamResults);

	if (parsedResults.kind == 'error') {
		return parsedResults;
	}
	return ok(
		parsedResults.value.filter(
			(r) => isUndefined(r.foe.score) || isUndefined(r.self.score),
		),
	);
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

const parseEntries = listParse(parseEntry);

const parseFootballTableCompetition = (
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
		dividers: table.competition.tableDividers,
		tables: parsedTables.value,
	});
};

// ToDo: if we don't return any errors can we remove the Result type?
export const parse = listParse(parseFootballTableCompetition);
