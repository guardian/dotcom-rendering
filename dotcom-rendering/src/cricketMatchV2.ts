import { isUndefined } from '@guardian/libs';
import type { Output } from 'valibot';
import { is, picklist } from 'valibot';
import type {
	FECricketMatch,
	FECricketMatchResult,
	FECricketMatchResultWinnerStatus,
	FECricketTeam,
} from './frontend/feCricketMatchPage';
import { parseDate, parseIntResult } from './lib/parse';
import type { Result } from './lib/result';
import { error, ok } from './lib/result';

export type Bowler = {
	name: string;
	overs: number;
	maidens: number;
	runs: number;
	wickets: number;
	balls: number;
};

export type Batter = {
	name: string;
	ballsFaced: number;
	runs: number;
	fours: number;
	sixes: number;
	howOut: string;
	out: boolean;
	onStrike: boolean;
	nonStrike: boolean;
};

export type Extras = {
	byes: number;
	legByes: number;
	noBalls: number;
	penalties: number;
	wides: number;
};

export type InningsTotals = {
	runs: number;
	overs: string;
	wickets: number;
	extras: number;
};

export type FallOfWicket = {
	order: number;
	name: string;
	runs: number;
};

export type CricketTeam = {
	name: string;
	paID: string;
	lineup: string[];
};

export type Innings = {
	description: string;
	battingTeam: string;
	bowlers: Bowler[];
	batters: Batter[];
	extras: Extras;
	declared: boolean;
	forfeited: boolean;
	inningsTotals: InningsTotals;
	fallOfWickets: FallOfWicket[];
};

const winnerTypesSchema = picklist([
	'runs',
	'wickets',
	'innings',
	'forfeit',
	'run-rate',
] as const);
type WinnerType = Output<typeof winnerTypesSchema>;

const parseWinnerType = (type: string): Result<ParserError, WinnerType> => {
	if (is(winnerTypesSchema, type)) {
		return ok(type);
	}

	return error({
		kind: 'CricketMatchInvalidResult',
		message: `Invalid winner type: ${type}`,
	});
};

type WinnerResult = {
	type: 'home-win' | 'away-win';
	description?: string;
	winner: {
		type: WinnerType;
		team: string;
		margin?: number;
	};
};

type OtherResult = {
	type:
		| 'no-result'
		| 'draw'
		| 'abandoned'
		| 'tied'
		| 'level-scores-draw'
		| 'none';
	description?: string;
};

export type CricketResult = WinnerResult | OtherResult;

export type CricketMatchKind = 'Fixture' | 'Live' | 'Result';

export type CricketMatch = {
	kind: CricketMatchKind;
	series: string;
	competition: string;
	venue: string;
	day?: number;
	matchDate: Date;
	homeTeam: CricketTeam;
	awayTeam: CricketTeam;
	innings: Innings[];
	result?: CricketResult;
	officials: string[];
};

const paCricketStatusToMatchKind: Record<string, CricketMatchKind> = {
	// Fixtures
	'pre-match': 'Fixture',
	'start-delayed': 'Fixture',
	cancelled: 'Fixture',
	// Live
	'in-play': 'Live',
	tea: 'Live',
	lunch: 'Live',
	'between-innings': 'Live',
	stumps: 'Live',
	'rain-delay': 'Live',
	'bad-light': 'Live',
	'crowd-trouble': 'Live',
	'pitch-condition': 'Live',
	'floodlight-failure': 'Live',
	'play-suspended-unknown': 'Live',
	snow: 'Live',
	'medical-emergency': 'Live',
	// Results
	result: 'Result',
	abandoned: 'Result',
};

type CricketMatchInvalidDate = {
	kind: 'CricketMatchInvalidDate';
	message: string;
};

type UnknownMatchStatus = {
	kind: 'UnknownMatchStatus';
	message: string;
};

type CricketMatchInvalidResult = {
	kind: 'CricketMatchInvalidResult';
	message: string;
};

type CricketWinnerInvalidMarginNumber = {
	kind: 'CricketWinnerInvalidMarginNumber';
	message: string;
};

type CricketMatchInvalidTeams = {
	kind: 'CricketMatchInvalidTeams';
	message: string;
};

type ParserError =
	| CricketMatchInvalidDate
	| UnknownMatchStatus
	| CricketMatchInvalidResult
	| CricketWinnerInvalidMarginNumber
	| CricketMatchInvalidTeams;

type ParsedTeams = {
	homeTeam: CricketTeam;
	awayTeam: CricketTeam;
};

const parseTeams = (
	teams: FECricketTeam[],
): Result<ParserError, ParsedTeams> => {
	const [firstTeam, secondTeam] = teams;

	if (!firstTeam || !secondTeam) {
		return error({
			kind: 'CricketMatchInvalidTeams',
			message: `Expected two teams, received ${teams.length}`,
		});
	}

	const [homeSource, awaySource] = firstTeam.home
		? [firstTeam, secondTeam]
		: [secondTeam, firstTeam];

	return ok({
		homeTeam: {
			name: homeSource.name,
			paID: homeSource.id,
			lineup: homeSource.lineup,
		},
		awayTeam: {
			name: awaySource.name,
			paID: awaySource.id,
			lineup: awaySource.lineup,
		},
	});
};

const parseWinnerResult = (
	winner: FECricketMatchResultWinnerStatus,
	resultType: WinnerResult['type'],
	description?: string,
): Result<ParserError, WinnerResult> => {
	return parseWinnerType(winner.winType).flatMap((winnerType) => {
		if (winner.margin) {
			return parseIntResult(winner.margin)
				.mapError<ParserError>((message) => ({
					kind: 'CricketWinnerInvalidMarginNumber',
					message,
				}))
				.map<WinnerResult>((margin) => ({
					type: resultType,
					description,
					winner: {
						type: winnerType,
						team: winner.team,
						margin,
					},
				}));
		}

		return ok<ParserError, WinnerResult>({
			type: resultType,
			description,
			winner: {
				type: winnerType,
				team: winner.team,
			},
		});
	});
};

const parseCricketResult = (
	fullResult?: FECricketMatchResult,
): Result<ParserError, CricketResult | undefined> => {
	if (isUndefined(fullResult)) {
		return ok<ParserError, CricketResult | undefined>(undefined);
	}

	switch (fullResult.resultType) {
		case 'home-win':
		case 'away-win':
			if (!fullResult.winner) {
				return error({
					kind: 'CricketMatchInvalidResult',
					message: `Missing winner information for result type ${fullResult.resultType}`,
				});
			}

			return parseWinnerResult(
				fullResult.winner,
				fullResult.resultType,
				fullResult.description,
			);

		case 'no-result':
		case 'draw':
		case 'abandoned':
		case 'tied':
		case 'level-scores-draw':
		case 'none':
			return ok<ParserError, OtherResult>({
				type: fullResult.resultType,
				description: fullResult.description,
			});

		default:
			return error({
				kind: 'CricketMatchInvalidResult',
				message: `Invalid result type: ${fullResult.resultType}`,
			});
	}
};

export const parseCricketMatchV2 = (
	feMatch: FECricketMatch,
): Result<ParserError, CricketMatch> => {
	const matchKind = paCricketStatusToMatchKind[feMatch.result];

	if (!matchKind) {
		return error({
			kind: 'UnknownMatchStatus',
			message: `Unknown match status: ${feMatch.result}`,
		});
	}

	// The PA cricket date doesn't have time zone but it is a UTC date
	const parsedDate = parseDate(`${feMatch.gameDate}Z`).mapError<ParserError>(
		(message) => ({
			kind: 'CricketMatchInvalidDate',
			message,
		}),
	);

	if (!parsedDate.ok) {
		return error(parsedDate.error);
	}

	return parseTeams(feMatch.teams).flatMap(({ homeTeam, awayTeam }) =>
		parseCricketResult(feMatch.fullResult).map(
			(parsedResult): CricketMatch => ({
				kind: matchKind,
				series: feMatch.competitionName, // TODO: this will be stage after frontend changes are complete
				competition: feMatch.competitionName,
				venue: feMatch.venueName,
				matchDate: parsedDate.value,
				day: feMatch.currentDay,
				homeTeam,
				awayTeam,
				innings: feMatch.innings.map((innings) => ({
					description: innings.description,
					battingTeam: innings.battingTeam,
					bowlers: innings.bowlers.map((bowler) => ({
						name: bowler.name,
						overs: bowler.overs,
						maidens: bowler.maidens,
						runs: bowler.runs,
						wickets: bowler.wickets,
						balls: bowler.balls,
					})),
					batters: innings.batters.map((batter) => ({
						name: batter.name,
						ballsFaced: batter.ballsFaced,
						runs: batter.runs,
						fours: batter.fours,
						sixes: batter.sixes,
						howOut: batter.howOut,
						out: batter.out,
						onStrike: batter.onStrike,
						nonStrike: batter.nonStrike,
					})),
					extras: {
						byes: innings.byes,
						legByes: innings.legByes,
						noBalls: innings.noBalls,
						penalties: innings.penalties,
						wides: innings.wides,
					},
					declared: innings.declared,
					forfeited: innings.forfeited,
					fallOfWickets: innings.fallOfWicket.map((fallOfWicket) => ({
						order: fallOfWicket.order,
						name: fallOfWicket.name,
						runs: fallOfWicket.runs,
					})),
					inningsTotals: {
						extras: innings.extras,
						runs: innings.runsScored,
						overs: innings.overs,
						wickets: innings.wickets,
					},
				})),
				result: parsedResult,
				officials: feMatch.officials,
			}),
		),
	);
};
