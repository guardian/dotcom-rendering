import { isOneOf } from '@guardian/libs';
import { listParse } from './footballMatches';
import type { FootballTeam } from './footballTeam';
import type {
	FEFootballMatch,
	FEFootballPlayer,
	FEFootballPlayerEvent,
	FEFootballTeam,
} from './frontend/feFootballMatchPage';
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
};

/**
 * Information about a player's participation in a given football match.
 */
type FootballPlayer = {
	paID: string;
	name: string;
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
	kind: (typeof eventTypes)[number];
	minute: number;
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
	feFootballMatchPlayerEvent: FEFootballPlayerEvent,
): Result<ParserError, PlayerEvent> => {
	if (!isEventType(feFootballMatchPlayerEvent.eventType)) {
		return error({
			kind: 'UnknownEventType',
			message: `Unknown Player Event Type - ${feFootballMatchPlayerEvent.eventType}`,
		});
	}

	const eventType = feFootballMatchPlayerEvent.eventType;

	return parseIntResult(feFootballMatchPlayerEvent.eventTime)
		.mapError<ParserError>((message) => ({
			kind: 'FootballInvalidEventTime',
			message,
		}))
		.flatMap<ParserError, PlayerEvent>((min) =>
			ok({
				kind: eventType,
				minute: min,
			}),
		);
};

const parseEvents = listParse(parsePlayerEvent);

const parseFootballPlayer = (
	feFootballMatchPlayer: FEFootballPlayer,
): Result<ParserError, FootballPlayer> =>
	parseEvents(feFootballMatchPlayer.events).flatMap((events) =>
		parseIntResult(feFootballMatchPlayer.shirtNumber)
			.mapError<ParserError>((message) => ({
				kind: 'FootballInvalidShirtNumber',
				message,
			}))
			.map((shirtNumber) => ({
				paID: feFootballMatchPlayer.id,
				name: feFootballMatchPlayer.name,
				substitute: feFootballMatchPlayer.substitute,
				shirtNumber,
				events,
			})),
	);

const parsePlayers = listParse(parseFootballPlayer);

const parseTeamWithStats = (
	feFootballMatchTeam: FEFootballTeam,
): Result<ParserError, FootballMatchTeamWithStats> =>
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
	}));

export const parseMatchStats = (
	feFootballMatch: FEFootballMatch,
): Result<ParserError, FootballMatchStats> =>
	parseTeamWithStats(feFootballMatch.homeTeam).flatMap((homeTeam) =>
		parseTeamWithStats(feFootballMatch.awayTeam).map((awayTeam) => ({
			homeTeam,
			awayTeam,
		})),
	);
