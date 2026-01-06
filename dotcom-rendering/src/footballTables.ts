import { isUndefined } from '@guardian/libs';
import { listParse } from './footballMatches';
import type {
	FEFootballTable,
	FEGroup,
	FELeagueTableEntry,
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

export type Entry = {
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

const parseEntry = (
	feEntry: FELeagueTableEntry,
): Result<ParserError, Entry> => {
	const { team, teamUrl } = feEntry;

	return parseResults(feEntry.results).map((results) => ({
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
		results,
	}));
};

const parseEntries = listParse(parseEntry);

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
