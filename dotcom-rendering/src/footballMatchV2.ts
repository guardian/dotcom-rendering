import { isUndefined } from '@guardian/libs';
import { replaceLiveMatchStatus } from './footballMatches';
import type { FootballTeam } from './footballTeam';
import type {
	FEFixture,
	FEFootballMatch,
	FEMatchDay,
	FEResult,
} from './frontend/feFootballMatchListPage';
import { oneOf, parseDate } from './lib/parse';
import { error, type Result } from './lib/result';
import { cleanTeamName } from './sportDataPage';

/**
 * There are three states a football match can be in.
 *
 * - Before it starts it's known as a "fixture".
 * - While it's in-play we refer to it as "live".
 * - Once it's over it's known as a "result".
 */
export type FootballMatch = MatchFixture | LiveMatch | MatchResult;

/**
 * Before a match has started we have some information, such as when it's going
 * to start and which teams are playing. But we don't have a score or status.
 */
export type MatchFixture = MatchData & {
	kind: 'Fixture';
	homeTeam: FootballTeam;
	awayTeam: FootballTeam;
};

/**
 * Once a match has started we have additional information beyond what's
 * available for a {@linkcode MatchFixture}, such as the score.
 */
export type LiveMatch = MatchData & {
	kind: 'Live';
	homeTeam: FootballMatchTeamWithScore;
	awayTeam: FootballMatchTeamWithScore;
	status: string;
	comment: string | undefined;
};

/**
 * When a match is over, we have much the same information as when it's a
 * {@linkcode LiveMatch}, such as the score. The status is always "full-time"
 * (FT), so we don't need a property for that.
 */
export type MatchResult = MatchData & {
	kind: 'Result';
	homeTeam: FootballMatchTeamWithScore;
	awayTeam: FootballMatchTeamWithScore;
	comment: string | undefined;
};

/**
 * For all football matches we should know what the PA ID is and when it's
 * scheduled to kick off.
 */
type MatchData = {
	paId: string;
	kickOff: Date;
	venue?: string;
};

/**
 * Once a match has started, we can bundle together information about a team,
 * such as its name, with its score and which players have scored.
 */
type FootballMatchTeamWithScore = FootballTeam & {
	score: number;
	scorers: string[];
};

type FootballDayInvalidDate = {
	kind: 'FootballDayInvalidDate';
	message: string;
};

type ExpectedMatchDayFixture = {
	kind: 'ExpectedMatchDayFixture';
	message: string;
};

type FootballMatchInvalidDate = {
	kind: 'FootballMatchInvalidDate';
	message: string;
};

type ExpectedMatchDayResult = {
	kind: 'ExpectedMatchDayResult';
	message: string;
};

type ExpectedMatchDayLive = {
	kind: 'ExpectedMatchDayLive';
	message: string;
};

type InvalidMatchDay = {
	kind: 'InvalidMatchDay';
	errors: Array<ParserError>;
};

type UnexpectedLiveMatch = {
	kind: 'UnexpectedLiveMatch';
	message: string;
};

type ParserError =
	| FootballDayInvalidDate
	| ExpectedMatchDayFixture
	| FootballMatchInvalidDate
	| ExpectedMatchDayResult
	| ExpectedMatchDayLive
	| InvalidMatchDay
	| UnexpectedLiveMatch;

const parseMatchDate = (date: string): Result<string, Date> => {
	// Frontend appends a timezone in square brackets
	const isoDate = date.split('[')[0];

	if (isUndefined(isoDate)) {
		return error(
			`Expected a match date with a timezone appended in square brackets at the end, but instead got ${date}`,
		);
	}

	return parseDate(isoDate);
};

const parseFixture = (
	feFixture: FEFixture | FEMatchDay,
): Result<ParserError, MatchFixture> => {
	if (
		feFixture.type === 'MatchDay' &&
		(feFixture.result || feFixture.liveMatch)
	) {
		return error({
			kind: 'ExpectedMatchDayFixture',
			message: `A fixture match day must not have 'liveMatch' or 'result' set to 'true', but this was not the case for ${feFixture.id}`,
		});
	}

	return parseMatchDate(feFixture.date)
		.mapError<ParserError>((message) => ({
			kind: 'FootballMatchInvalidDate',
			message,
		}))
		.map<MatchFixture>((dateTimeISOString) => ({
			kind: 'Fixture',
			paId: feFixture.id,
			kickOff: dateTimeISOString,
			venue: feFixture.venue?.name,
			homeTeam: {
				name: cleanTeamName(feFixture.homeTeam.name),
				paID: feFixture.homeTeam.id,
			},
			awayTeam: {
				name: cleanTeamName(feFixture.awayTeam.name),
				paID: feFixture.awayTeam.id,
			},
		}));
};

const parseMatchResult = (
	feResult: FEResult | FEMatchDay,
): Result<ParserError, MatchResult> => {
	if (feResult.type === 'MatchDay' && !feResult.result) {
		return error({
			kind: 'ExpectedMatchDayResult',
			message: `A result match day must have 'result' set to 'true', but this was not the case for ${feResult.id}`,
		});
	}

	return parseMatchDate(feResult.date)
		.mapError<ParserError>((message) => ({
			kind: 'FootballMatchInvalidDate',
			message,
		}))
		.map<MatchResult>((dateTimeISOString) => ({
			kind: 'Result',
			paId: feResult.id,
			kickOff: dateTimeISOString,
			venue: feResult.venue?.name,
			homeTeam: {
				name: cleanTeamName(feResult.homeTeam.name),
				paID: feResult.homeTeam.id,
				score: feResult.homeTeam.score ?? 0, // TODO
				scorers: feResult.homeTeam.scorers?.split(',') ?? [], // TODO
			},
			awayTeam: {
				name: cleanTeamName(feResult.awayTeam.name),
				paID: feResult.awayTeam.id,
				score: feResult.awayTeam.score ?? 0, // TODO
				scorers: feResult.awayTeam.scorers?.split(',') ?? [], // TOTO
			},
			comment: feResult.comments,
		}));
};

const parseLiveMatch = (
	feMatchDay: FEMatchDay,
): Result<ParserError, LiveMatch> => {
	if (!feMatchDay.liveMatch) {
		return error({
			kind: 'ExpectedMatchDayLive',
			message: `A live match day must have 'liveMatch' set to 'true', but this was not the case for ${feMatchDay.id}`,
		});
	}

	return parseMatchDate(feMatchDay.date)
		.mapError<ParserError>((message) => ({
			kind: 'FootballMatchInvalidDate',
			message,
		}))
		.map((dateTimeISOString) => ({
			kind: 'Live',
			paId: feMatchDay.id,
			kickOff: dateTimeISOString,
			venue: feMatchDay.venue?.name,
			homeTeam: {
				name: cleanTeamName(feMatchDay.homeTeam.name),
				paID: feMatchDay.homeTeam.id,
				score: feMatchDay.homeTeam.score ?? 0, // TODO
				scorers: feMatchDay.homeTeam.scorers?.split(',') ?? [], // TOTO
			},
			awayTeam: {
				name: cleanTeamName(feMatchDay.awayTeam.name),
				paID: feMatchDay.awayTeam.id,
				score: feMatchDay.awayTeam.score ?? 0, // TODO
				scorers: feMatchDay.awayTeam.scorers?.split(',') ?? [], // TOTO
			},
			dateTimeISOString,
			comment: cleanTeamName(feMatchDay.comments ?? ''),
			status: replaceLiveMatchStatus(feMatchDay.matchStatus),
		}));
};

const parseMatchDay = (
	feMatchDay: FEMatchDay,
): Result<ParserError, FootballMatch> =>
	oneOf<ParserError, FEMatchDay, FootballMatch>([
		parseLiveMatch,
		parseMatchResult,
		parseFixture,
	])(feMatchDay).mapError((errors) => ({
		kind: 'InvalidMatchDay',
		errors,
	}));

export const parseFootballMatchV2 = (
	feMatch: FEFootballMatch,
): Result<ParserError, FootballMatch> => {
	switch (feMatch.type) {
		case 'Fixture':
			return parseFixture(feMatch);
		case 'Result':
			return parseMatchResult(feMatch);
		case 'MatchDay':
			return parseMatchDay(feMatch);
		case 'LiveMatch':
			return error({
				kind: 'UnexpectedLiveMatch',
				message:
					"Did not expect to get a match with type 'LiveMatch', allowed options are 'MatchDay', 'Fixture' or 'Result'",
			});
	}
};
