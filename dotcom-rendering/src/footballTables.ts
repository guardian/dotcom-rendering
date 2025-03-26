import { listParse, type ParserError, type TeamScore } from './footballMatches';
import type {
	FEFootballTable,
	FEGroup,
	FELeagueTableEntry,
} from './frontend/feFootballTablesPage';
import type { Result } from './lib/result';
import { ok } from './lib/result';

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

type Group = {
	entries: Entry[];
	name?: string;
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
	groups: Group[];
	hasLinkToFullTable: boolean;
};

export type FootballTables = FootballTable[];

const parseGroups = (
	feGroups: FEFootballTable['groups'],
): Result<ParserError, Group[]> => {
	const groupsParser = listParse(parseGroup);
	return groupsParser(feGroups);
};

const parseGroup = (feGroup: FEGroup): Result<ParserError, Group> => {
	const entriesParser = listParse(parseEntry);
	const parsedEntries = entriesParser(feGroup.entries);

	if (parsedEntries.kind === 'error') {
		return parsedEntries;
	}

	return ok({
		name: feGroup.round.name,
		entries: parsedEntries.value,
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
): Result<ParserError, FootballTable> => {
	const competition = {
		url: table.competition.url,
		name: table.competition.fullName,
		dividers: table.competition.dividers ?? [], // TODO: parse competition
	};
	const parsedGroups = parseGroups(table.groups);

	if (parsedGroups.kind === 'error') {
		return parsedGroups;
	}

	return ok({
		competition,
		groups: parsedGroups.value,
		hasLinkToFullTable: false, // TODO: calculate linkToFullTable
	});
};

export const parse: (
	frontendData: FEFootballTable[],
) => Result<ParserError, FootballTables> = listParse(parseFootballTables);
