import { listParse, type ParserError, type TeamScore } from './footballMatches';
import type {
	FEFootballTable,
	FEGroup,
	FELeagueTableEntry,
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
	id: string; // TODO: why do we need to have id in 2 places? TeamInfo & TeamResult
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
	hasLinkToFullTable: boolean;
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
		hasLinkToFullTable: false, // TODO: calculate linkToFullTable
	});
};

const parseEntry = (
	feEntry: FELeagueTableEntry,
): Result<ParserError, Entry> => {
	const { team } = feEntry;

	return ok({
		position: team.rank,
		team: {
			name: team.name,
			id: team.id,
			url: 'url', //TODO - get this from FE
		},
		gamesPlayed: team.total.played,
		won: team.total.won,
		drawn: team.total.drawn,
		lost: team.total.lost,
		goalsFor: team.total.goalsFor,
		goalsAgainst: team.total.goalsAgainst,
		goalDifference: team.goalDifference,
		points: team.points,
		results: [], //TODO - add results to FE
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

export const parse: (
	frontendData: FEFootballTable[],
) => Result<ParserError, FootballTableCompetitions> =
	listParse(parseFootballTables);
