import { isUndefined } from '@guardian/libs';
import type {
	FECompetitionMatch,
	FEFixture,
	FEFootballMatch,
	FEFootballPageConfig,
	FEMatchByDateAndCompetition,
	FEMatchDay,
	FEMatchDayTeam,
	FEResult,
} from './feFootballDataPage';
import type { EditionId } from './lib/edition';
import { error, ok, type Result } from './lib/result';
import type { NavType } from './model/extract-nav';
import type { FooterType } from './types/footer';

type TeamScore = {
	name: string;
	score: number;
};

type MatchData = {
	paId: string;
	dateTime: Date;
};

export type MatchResult = MatchData & {
	kind: 'Result';
	homeTeam: TeamScore;
	awayTeam: TeamScore;
	comment?: string;
};

export type MatchFixture = MatchData & {
	kind: 'Fixture';
	homeTeam: string;
	awayTeam: string;
};

export type LiveMatch = MatchData & {
	kind: 'Live';
	homeTeam: TeamScore;
	awayTeam: TeamScore;
	status: string;
	comment?: string;
};

export type FootballMatch = MatchResult | MatchFixture | LiveMatch;
export type FootballMatchKind = FootballMatch['kind'];

type Competition = {
	id: string;
	tag: string;
	name: string;
	nation: string;
	matches: FootballMatch[];
};

type FootballDay = {
	date: Date;
	competitions: Competition[];
};

export type FootballMatches = FootballDay[];

type FootballDayInvalidDate = {
	kind: 'FootballDayInvalidDate';
	message: string;
};

type FootballMatchMissingScore = {
	kind: 'FootballMatchMissingScore';
	message: string;
};

type FootballMatchInvalidDate = {
	kind: 'FootballMatchInvalidDate';
	message: string;
};

type UnexpectedLiveMatch = {
	kind: 'UnexpectedLiveMatch';
	message: string;
};

type ExpectedMatchDayFixture = {
	kind: 'ExpectedMatchDayFixture';
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

export type ParserError =
	| FootballDayInvalidDate
	| FootballMatchMissingScore
	| FootballMatchInvalidDate
	| UnexpectedLiveMatch
	| InvalidMatchDay
	| ExpectedMatchDayFixture
	| ExpectedMatchDayResult
	| ExpectedMatchDayLive;

type Parser<E, A, B> = (a: A) => Result<E, B>;

const oneOf =
	<E, A, B>(parsers: [Parser<E, A, B>, ...Array<Parser<E, A, B>>]) =>
	(input: A): Result<E[], B> => {
		const f = (
			remainingParsers: Array<Parser<E, A, B>>,
			errs: E[],
		): Result<E[], B> => {
			const [head, ...tail] = remainingParsers;

			if (head === undefined) {
				return error(errs);
			}

			const result = head(input);

			if (result.kind === 'error') {
				return f(tail, [...errs, result.error]);
			}

			return result;
		};

		return f(parsers, []);
	};

const listParse =
	<E, A, B>(parser: (a: A) => Result<E, B>) =>
	(input: A[]): Result<E, B[]> => {
		const f = (toParse: A[], parsed: B[]): Result<E, B[]> => {
			const [next, ...remaining] = toParse;

			if (next === undefined) {
				return ok(parsed);
			}

			const result = parser(next);

			if (result.kind === 'error') {
				return result;
			}

			return f(remaining, parsed.concat(result.value));
		};

		return f(input, []);
	};

const parseDate = (a: string): Result<string, Date> => {
	const d = new Date(a);

	if (d.toString() === 'Invalid Date') {
		return error(`${String(a)} isn't a valid Date`);
	}

	return ok(d);
};

const parseScore = (
	team: FEMatchDayTeam,
	matchKind: 'Result' | 'Live',
): Result<ParserError, number> => {
	if (team.score === undefined) {
		const prefix = matchKind === 'Result' ? 'Results' : 'Live matches';

		return error({
			kind: 'FootballMatchMissingScore',
			message: `${prefix} must have scores, but the score for ${team.name} is missing`,
		});
	}

	return ok(team.score);
};

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

	const date = parseMatchDate(feFixture.date);

	if (date.kind === 'error') {
		return error({ kind: 'FootballMatchInvalidDate', message: date.error });
	}

	return ok({
		kind: 'Fixture',
		homeTeam: feFixture.homeTeam.name,
		awayTeam: feFixture.awayTeam.name,
		dateTime: date.value,
		paId: feFixture.id,
	});
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

	const date = parseMatchDate(feResult.date);

	if (date.kind === 'error') {
		return error({ kind: 'FootballMatchInvalidDate', message: date.error });
	}

	const homeScore = parseScore(feResult.homeTeam, 'Result');

	if (homeScore.kind === 'error') {
		return homeScore;
	}

	const awayScore = parseScore(feResult.awayTeam, 'Result');

	if (awayScore.kind === 'error') {
		return awayScore;
	}

	return ok({
		kind: 'Result',
		homeTeam: {
			name: feResult.homeTeam.name,
			score: homeScore.value,
		},
		awayTeam: {
			name: feResult.awayTeam.name,
			score: awayScore.value,
		},
		dateTime: date.value,
		paId: feResult.id,
		comment: feResult.comments,
	});
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

	const date = parseMatchDate(feMatchDay.date);

	if (date.kind === 'error') {
		return error({ kind: 'FootballMatchInvalidDate', message: date.error });
	}

	const homeScore = parseScore(feMatchDay.homeTeam, 'Live');

	if (homeScore.kind === 'error') {
		return homeScore;
	}

	const awayScore = parseScore(feMatchDay.awayTeam, 'Live');

	if (awayScore.kind === 'error') {
		return awayScore;
	}

	return ok({
		kind: 'Live',
		homeTeam: {
			name: feMatchDay.homeTeam.name,
			score: homeScore.value,
		},
		awayTeam: {
			name: feMatchDay.awayTeam.name,
			score: awayScore.value,
		},
		dateTime: date.value,
		paId: feMatchDay.id,
		comment: feMatchDay.comments,
		status: feMatchDay.matchStatus,
	});
};

const parseMatchDay = (
	feMatchDay: FEMatchDay,
): Result<ParserError, FootballMatch> => {
	const result = oneOf<ParserError, FEMatchDay, FootballMatch>([
		parseLiveMatch,
		parseMatchResult,
		parseFixture,
	])(feMatchDay);

	if (result.kind === 'error') {
		return error({ kind: 'InvalidMatchDay', errors: result.error });
	}

	return result;
};

const parseMatch = (
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

const parseMatches = listParse(parseMatch);

const parseCompetition = ({
	competitionSummary,
	matches,
}: FECompetitionMatch): Result<ParserError, Competition> => {
	const parsedMatches = parseMatches(matches);

	if (parsedMatches.kind === 'error') {
		return parsedMatches;
	}

	return ok({
		id: competitionSummary.id,
		// Frontend stores a path, which is the tag with a leading '/'.
		tag: competitionSummary.url.slice(1),
		name: competitionSummary.fullName,
		nation: competitionSummary.nation,
		matches: parsedMatches.value,
	});
};

const parseCompetitions = listParse(parseCompetition);

const parseFootballDay = (
	day: FEMatchByDateAndCompetition,
): Result<ParserError, FootballDay> => {
	const date = parseDate(day.date);

	if (date.kind === 'error') {
		return error({ kind: 'FootballDayInvalidDate', message: date.error });
	}

	const competitions = parseCompetitions(day.competitionMatches);

	if (competitions.kind === 'error') {
		return competitions;
	}

	return ok({
		date: date.value,
		competitions: competitions.value,
	});
};

export const parse: (
	frontendData: FEMatchByDateAndCompetition[],
) => Result<ParserError, FootballMatches> = listParse(parseFootballDay);

export type DCRFootballDataPage = {
	matchesList: FootballMatches;
	kind: FootballMatchKind;
	nextPage?: string;
	previousPage?: string;
	nav: NavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FEFootballPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};
