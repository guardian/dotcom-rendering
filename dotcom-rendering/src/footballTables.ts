import { isUndefined } from '@guardian/libs';
import { listParse } from './footballMatches';
import type {
	FEFootballTable,
	FEGroup,
	FEGroupSummary,
	FELeagueTableEntry,
	FELeagueTableEntrySummary,
	FETeamResult,
} from './frontend/feFootballTablesPage';
import { error, ok, type Result } from './lib/result';
import { cleanTeamName } from './sportDataPage';

type TeamScore = {
	name: string;
	score: number;
};

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

export type EntrySummary = {
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
};

type Entry = EntrySummary & {
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

export type FootballTableSummary = {
	groupName?: string;
	entries: EntrySummary[];
};

export type FootballTableCompetitions = FootballTableCompetition[];

type MissingScore = {
	kind: 'MissingScore';
	message: string;
};

type ParserError = MissingScore;

export const parseTable = (
	feGroup: FEGroup,
): Result<ParserError, FootballTable> =>
	parseEntries(feGroup.entries).map((entries) => ({
		groupName: feGroup.round.name,
		entries: entries.sort((a, b) => a.position - b.position),
	}));

export const parseTableSummary = (
	feGroup: FEGroupSummary,
): Result<ParserError, FootballTableSummary> =>
	parseEntriesSummaries(feGroup.entries).map((entries) => ({
		groupName: feGroup.round.name,
		entries: entries.sort((a, b) => a.position - b.position),
	}));

const parseTables = listParse(parseTable);

const parseResult = (result: FETeamResult): Result<ParserError, TeamResult> => {
	if (isUndefined(result.foe.score)) {
		return error({
			kind: 'MissingScore',
			message: `Expected team '${result.foe.name}' result to have score in match ${result.matchId}`,
		});
	}

	if (isUndefined(result.self.score)) {
		return error({
			kind: 'MissingScore',
			message: `Expected team '${result.self.name}' result to have score in match ${result.matchId}`,
		});
	}

	return ok({
		matchId: result.matchId,
		self: {
			id: result.self.id,
			name: cleanTeamName(result.self.name),
			score: result.self.score,
		},
		foe: {
			id: result.foe.id,
			name: cleanTeamName(result.foe.name),
			score: result.foe.score,
		},
	});
};

const parseResults = listParse(parseResult);

const mapBaseEntryFields = (
	feEntry: FELeagueTableEntrySummary,
): EntrySummary => {
	const { team, teamUrl } = feEntry;

	return {
		position: team.rank,
		team: {
			name: cleanTeamName(team.name),
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
	};
};

const parseEntry = (
	feEntry: FELeagueTableEntry,
): Result<ParserError, Entry> => {
	return parseResults(feEntry.results).map((results) => ({
		...mapBaseEntryFields(feEntry),
		results,
	}));
};

const parseEntries = listParse(parseEntry);

const parseEntrySummary = (
	feEntry: FELeagueTableEntrySummary,
): Result<ParserError, EntrySummary> => {
	return ok(mapBaseEntryFields(feEntry));
};

const parseEntriesSummaries = listParse(parseEntrySummary);

const parseFootballTableCompetition = (
	table: FEFootballTable,
): Result<ParserError, FootballTableCompetition> =>
	parseTables(table.groups).map((tables) => ({
		url: table.competition.url,
		name: table.competition.fullName,
		hasGroups: table.hasGroups,
		dividers: table.competition.tableDividers,
		tables,
	}));

export const parse = listParse(parseFootballTableCompetition);
