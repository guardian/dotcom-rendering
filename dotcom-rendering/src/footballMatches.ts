import { isUndefined } from '@guardian/libs';
import type {
	FECompetitionMatch,
	FEFixture,
	FEFootballMatch,
	FEFootballPageConfig,
	FEMatchByDateAndCompetition,
	FEMatchDay,
	FEResult,
} from './feFootballDataPage';
import type { EditionId } from './lib/edition';
import { error, ok, type Result } from './lib/result';
import type { NavType } from './model/extract-nav';
import type { FooterType } from './types/footer';

type TeamScore = {
	name: string;
	score?: number;
};

type MatchData = {
	paId: string;
	dateTimeISOString: string;
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
	dateISOString: string;
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

const parseDate = (a: string): Result<string, string> => {
	const d = new Date(a);

	if (d.toString() === 'Invalid Date') {
		return error(`${String(a)} isn't a valid Date`);
	}

	return ok(d.toISOString());
};

const parseMatchDate = (date: string): Result<string, string> => {
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
		homeTeam: cleanTeamName(feFixture.homeTeam.name),
		awayTeam: cleanTeamName(feFixture.awayTeam.name),
		dateTimeISOString: date.value,
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

	return ok({
		kind: 'Result',
		homeTeam: {
			name: cleanTeamName(feResult.homeTeam.name),
			score: feResult.homeTeam.score,
		},
		awayTeam: {
			name: cleanTeamName(feResult.awayTeam.name),
			score: feResult.awayTeam.score,
		},
		dateTimeISOString: date.value,
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

	return ok({
		kind: 'Live',
		homeTeam: {
			name: cleanTeamName(feMatchDay.homeTeam.name),
			score: feMatchDay.homeTeam.score,
		},
		awayTeam: {
			name: cleanTeamName(feMatchDay.awayTeam.name),
			score: feMatchDay.awayTeam.score,
		},
		dateTimeISOString: date.value,
		paId: feMatchDay.id,
		comment: feMatchDay.comments,
		status: replaceLiveMatchStatus(feMatchDay.matchStatus),
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
		dateISOString: date.value,
		competitions: competitions.value,
	});
};

export const getParserErrorMessage = (parserError: ParserError): string => {
	switch (parserError.kind) {
		case 'InvalidMatchDay':
			return parserError.errors
				.map((e) => getParserErrorMessage(e))
				.join(', ');
		default:
			return `${parserError.kind}: ${parserError.message}`;
	}
};

export const parse: (
	frontendData: FEMatchByDateAndCompetition[],
) => Result<ParserError, FootballMatches> = listParse(parseFootballDay);

export type Region = {
	name: string;
	competitions: Array<{ url: string; name: string }>;
};

export type DCRFootballDataPage = {
	matchesList: FootballMatches;
	kind: FootballMatchKind;
	nextPage?: string;
	previousPage?: string;
	regions: Region[];
	nav: NavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FEFootballPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};

const cleanTeamName = (teamName: string): string => {
	return teamName
		.replace('Ladies', '')
		.replace('Holland', 'The Netherlands')
		.replace('Bialystock', 'Białystok')
		.replace('Union Saint Gilloise', 'Union Saint-Gilloise');
};

// This comes from Frontend
const paStatusToMatchStatus: Record<string, string> = {
	KO: '1st', // The Match has started Kicked Off.
	HT: 'HT', // The Referee has blown the whistle for Half Time.
	SHS: '2nd', // The Second Half of the Match has Started.
	FT: 'FT', // The Referee has blown the whistle for Full Time.
	PTFT: 'FT', // Penalty Shootout Full Time.
	Result: 'FT', // The Result is official.
	ETFT: 'FT', // Extra Time, Full Time has been blown.
	MC: 'FT', // Match has been Completed.
	FTET: 'ET', // Full Time, Extra Time it to be played.
	ETS: 'ET', // Extra Time has Started.
	ETHT: 'ET', // Extra Time Half Time has been called.
	ETSHS: 'ET', // Extra Time, Second Half has Started.
	FTPT: 'PT', // Full Time, Penalties are To be played.
	PT: 'PT', // Penalty Shootout has started.
	ETFTPT: 'PT', // Extra Time, Full Time, Penalties are To be played.
	Suspended: 'S', // Match has been Suspended.

	// We don't really expect to see these the way we handle data in frontend
	Resumed: 'R', // Match has been Resumed.
	Abandoned: 'A', // Match has been Abandoned.
	Fixture: 'F', // Created Fixture is available and had been Created by us.
	'-': 'F', // this sneaky one is not in the docs
	New: 'N', // Match A New Match has been added to our data.
	Cancelled: 'C', // A Match has been Cancelled.
};

const replaceLiveMatchStatus = (status: string): string => {
	return paStatusToMatchStatus[status] ?? status.slice(0, 2);
};
