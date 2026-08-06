import { isOneOf } from '@guardian/libs';
import { listParse } from './footballMatches';
import type { FootballTeam } from './footballTeam';
import type {
	FEFootballMatchStats,
	FEFootballMatchStatsSummary,
	FEFootballPlayer,
	FEFootballPlayerEventEnhanced,
	FEFootballSubstitution,
	FEFootballTeam,
	FEFootballTeamSummary,
} from './frontend/feFootballMatchInfoPage';
import { parseIntResult } from './lib/parse';
import type { Result } from './lib/result';
import { error, ok } from './lib/result';
import { cleanTeamName } from './sportDataPage';

/**
 * The stats for each team in a given football match.
 */
export type FootballMatchStats = {
	homeTeam: FootballMatchTeamWithStats;
	awayTeam: FootballMatchTeamWithStats;
};

/**
 * The summary stats for each team in a given football match.
 */
export type FootballMatchStatsSummary = {
	homeTeam: FootballMatchTeamWithStatsSummary;
	awayTeam: FootballMatchTeamWithStatsSummary;
	status: string;
	infoURL: string;
};

/**
 * Extended stats information about a given team in a football match, including
 * a list of players.
 */
export type FootballMatchTeamWithStats = FootballTeam & {
	abbreviatedName: string;
	possession: number;
	shotsOnTarget: number;
	shotsOffTarget: number;
	corners: number;
	fouls: number;
	players: FootballPlayer[];
	statsColour: string;
	substitutions: Substitution[];
};

/**
 * Summary stats information about a given team in a football match
 */
export type FootballMatchTeamWithStatsSummary = FootballTeam & {
	possession: number;
	shotsTotal: number;
	statsColour: string;
};

/**
 * Information about a player's participation in a given football match.
 */
type FootballPlayer = {
	paID: string;
	name: string;
	lastName: string;
	substitute: boolean;
	shirtNumber: number;
	events: PlayerEvent[];
};

const eventTypes = ['substitution', 'dismissal', 'booking'] as const;
const isEventType = isOneOf(eventTypes);

/**
 * Events involving a particular player in a given football match.
 */
export type PlayerEvent = {
	id: string;
	kind: (typeof eventTypes)[number];
	minute: number;
	addedTime: number;
};

export type Substitution = {
	eventId: string;
	name: string;
	lastName: string;
};

type UnknownEventType = {
	kind: 'UnknownEventType';
	message: string;
};

type FootballInvalidEventTime = {
	kind: 'FootballInvalidEventTime';
	message: string;
};

type FootballInvalidShirtNumber = {
	kind: 'FootballInvalidShirtNumber';
	message: string;
};

type ParserError =
	| UnknownEventType
	| FootballInvalidEventTime
	| FootballInvalidShirtNumber;

const parsePlayerEvent = (
	feFootballMatchPlayerEvent: FEFootballPlayerEventEnhanced,
): Result<ParserError, PlayerEvent> => {
	if (!isEventType(feFootballMatchPlayerEvent.eventType)) {
		return error({
			kind: 'UnknownEventType',
			message: `Unknown Player Event Type - ${feFootballMatchPlayerEvent.eventType}`,
		});
	}

	const eventType = feFootballMatchPlayerEvent.eventType;

	return parseIntResult(feFootballMatchPlayerEvent.normalTime)
		.mapError<ParserError>((message) => ({
			kind: 'FootballInvalidEventTime',
			message,
		}))
		.flatMap<ParserError, PlayerEvent>((min) =>
			ok({
				id: feFootballMatchPlayerEvent.eventId,
				kind: eventType,
				minute: min + 1,
				addedTime: parseInt(feFootballMatchPlayerEvent.addedTime),
			}),
		);
};

const parseEvents = listParse(parsePlayerEvent);

const parseSubstitution = (
	feFootballMatchSubstitution: FEFootballSubstitution,
): Result<ParserError, Substitution> =>
	ok({
		eventId: feFootballMatchSubstitution.eventId,
		name: feFootballMatchSubstitution.name,
		lastName: feFootballMatchSubstitution.lastName,
	});

const parseSubstitutions = listParse(parseSubstitution);

const parseFootballPlayer = (
	feFootballMatchPlayer: FEFootballPlayer,
): Result<ParserError, FootballPlayer> =>
	parseEvents(feFootballMatchPlayer.enhancedEvents).flatMap((events) =>
		parseIntResult(feFootballMatchPlayer.shirtNumber)
			.mapError<ParserError>((message) => ({
				kind: 'FootballInvalidShirtNumber',
				message,
			}))
			.map((shirtNumber) => ({
				paID: feFootballMatchPlayer.id,
				name: feFootballMatchPlayer.name,
				lastName: feFootballMatchPlayer.lastName,
				substitute: feFootballMatchPlayer.substitute,
				shirtNumber,
				events,
			})),
	);

const parsePlayers = listParse(parseFootballPlayer);

const parseTeamWithStats = (
	feFootballMatchTeam: FEFootballTeam,
): Result<ParserError, FootballMatchTeamWithStats> =>
	parseSubstitutions(feFootballMatchTeam.substitutions).flatMap(
		(substitutions) =>
			parsePlayers(feFootballMatchTeam.players).map((players) => ({
				paID: feFootballMatchTeam.id,
				name: cleanTeamName(feFootballMatchTeam.name),
				abbreviatedName: feFootballMatchTeam.codename,
				possession: feFootballMatchTeam.possession,
				shotsOnTarget: feFootballMatchTeam.shotsOn,
				shotsOffTarget: feFootballMatchTeam.shotsOff,
				corners: feFootballMatchTeam.corners,
				fouls: feFootballMatchTeam.fouls,
				players,
				statsColour: feFootballMatchTeam.colours,
				substitutions,
			})),
	);

export const parseMatchStats = (
	feFootballMatch: FEFootballMatchStats,
): Result<ParserError, FootballMatchStats> =>
	parseTeamWithStats(feFootballMatch.homeTeam).flatMap((homeTeam) =>
		parseTeamWithStats(feFootballMatch.awayTeam).map((awayTeam) => ({
			homeTeam,
			awayTeam,
		})),
	);

const parseTeamWithStatsSummary = (
	feFootballMatchTeam: FEFootballTeamSummary,
): Result<ParserError, FootballMatchTeamWithStatsSummary> =>
	ok({
		paID: feFootballMatchTeam.id,
		name: cleanTeamName(feFootballMatchTeam.name),
		possession: feFootballMatchTeam.possession,
		shotsTotal: feFootballMatchTeam.shotsOn + feFootballMatchTeam.shotsOff,
		statsColour: feFootballMatchTeam.colours,
	});

export const parseMatchStatsSummary = (
	feFootballMatchStatsSummary: FEFootballMatchStatsSummary,
): Result<ParserError, FootballMatchStatsSummary> =>
	parseTeamWithStatsSummary(feFootballMatchStatsSummary.homeTeam).flatMap(
		(homeTeam) =>
			parseTeamWithStatsSummary(feFootballMatchStatsSummary.awayTeam).map(
				(awayTeam) => ({
					homeTeam,
					awayTeam,
					status: feFootballMatchStatsSummary.status,
					infoURL: feFootballMatchStatsSummary.infoURL,
				}),
			),
	);
