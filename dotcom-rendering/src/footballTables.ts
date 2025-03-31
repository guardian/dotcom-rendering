import { isUndefined } from '@guardian/libs';
import { listParse, type ParserError, type TeamScore } from './footballMatches';
import type {
	FEFootballTable,
	FEGroup,
	FELeagueTableEntry,
	FERecentResultsPerTeam,
} from './frontend/feFootballTablesPage';
import type { Result } from './lib/result';
import { error, ok } from './lib/result';

export type TeamResult = {
	matchId: string;
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
	recentResultsPerTeam: FERecentResultsPerTeam[],
): Result<ParserError, FootballTableData[]> => {
	const groupsParser = listParse(parseTable(recentResultsPerTeam));
	return groupsParser(feGroups);
};

const parseTable =
	(recentResultsPerTeam: FERecentResultsPerTeam[]) =>
	(feGroup: FEGroup): Result<ParserError, FootballTableData> => {
		const entriesParser = listParse(parseEntry(recentResultsPerTeam));
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

const parseResults = (
	teamId: string,
	recentResultsPerTeam: FERecentResultsPerTeam[],
): Result<ParserError, TeamResult[]> => {
	const teamsResults = recentResultsPerTeam.find(
		(team) => team.teamId === teamId,
	);

	if (isUndefined(teamsResults)) {
		return error({
			kind: 'UnexpectedLiveMatch', // todo make new kind
			message: `No results for team ID ${teamId}`,
		});
	}

	return ok(
		teamsResults.results.map((result) => {
			return {
				matchId: result.matchId,
				self: {
					name: result.self.name,
					score: result.self.score,
				},
				foe: {
					name: result.foe.name,
					score: result.foe.score,
				},
			};
		}),
	);
};

const parseEntry =
	(recentResultsPerTeam: FERecentResultsPerTeam[]) =>
	(feEntry: FELeagueTableEntry): Result<ParserError, Entry> => {
		const { team } = feEntry;

		const parsedResults = parseResults(team.id, recentResultsPerTeam);

		if (parsedResults.kind === 'error') {
			return parsedResults;
		}

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
			results: parsedResults.value,
		});
	};

const parseFootballTables = (
	table: FEFootballTable,
): Result<ParserError, FootballTableCompetition> => {
	const parsedTables = parseTables(table.groups, table.recentResultsPerTeam);

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
