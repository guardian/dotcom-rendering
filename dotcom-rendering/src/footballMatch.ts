import { isOneOf } from '@guardian/libs';
import { listParse } from './footballMatches';
import type {
	FEFootballMatch,
	FEFootballPlayer,
	FEFootballPlayerEvent,
	FEFootballTeam,
} from './frontend/feFootballMatchPage';
import type { Result } from './lib/result';
import { error, ok } from './lib/result';

const eventTypes = ['substitution', 'dismissal', 'booking'] as const;
const isEventType = isOneOf(eventTypes);

export type PlayerEvent = {
	eventTime: string; // minutes
	eventType: (typeof eventTypes)[number];
};

export type FootballTeam = {
	id: string;
	name: string;
	codename: string;
	players: FootballPlayer[];
	possession: number;
	shotsOn: number;
	shotsOff: number;
	corners: number;
	fouls: number;
	colours: string;
	score?: number;
	crest: string;
	scorers: string[];
};

export type FootballPlayer = {
	id: string;
	name: string;
	position: string;
	lastName: string;
	substitute: boolean;
	timeOnPitch: string;
	shirtNumber: string;
	events: PlayerEvent[];
};

export type FootballMatch = {
	homeTeam: FootballTeam;
	awayTeam: FootballTeam;
	comments: string;
};

type UnknownEventType = {
	kind: 'UnknownEventType';
	message: string;
};

type ParserError = UnknownEventType;

const parsePlayerEvent = (
	feFootballMatchPlayerEvent: FEFootballPlayerEvent,
): Result<ParserError, PlayerEvent> => {
	if (!isEventType(feFootballMatchPlayerEvent.eventType)) {
		return error({
			kind: 'UnknownEventType',
			message: `Unknown Player Event Type - ${feFootballMatchPlayerEvent.eventType}`,
		});
	}

	return ok({
		eventTime: feFootballMatchPlayerEvent.eventTime,
		eventType: feFootballMatchPlayerEvent.eventType,
	});
};

const parseEvents = listParse(parsePlayerEvent);

const parsePlayer = (
	feFootballMatchPlayer: FEFootballPlayer,
): Result<ParserError, FootballPlayer> => {
	const parsedEvents = parseEvents(feFootballMatchPlayer.events);

	if (parsedEvents.kind === 'error') {
		return parsedEvents;
	}

	return ok({
		id: feFootballMatchPlayer.id,
		name: feFootballMatchPlayer.name,
		position: feFootballMatchPlayer.position,
		lastName: feFootballMatchPlayer.lastName,
		substitute: feFootballMatchPlayer.substitute,
		timeOnPitch: feFootballMatchPlayer.timeOnPitch,
		shirtNumber: feFootballMatchPlayer.shirtNumber,
		events: parsedEvents.value,
	});
};

const parsePlayers = listParse(parsePlayer);

const parseTeam = (
	feFootballMatchTeam: FEFootballTeam,
): Result<ParserError, FootballTeam> => {
	const parsedPlayers = parsePlayers(feFootballMatchTeam.players);

	if (parsedPlayers.kind === 'error') {
		return parsedPlayers;
	}

	return ok({
		id: feFootballMatchTeam.id,
		name: feFootballMatchTeam.name,
		codename: feFootballMatchTeam.codename,
		score: feFootballMatchTeam.score,
		scorers: feFootballMatchTeam.scorers,
		possession: feFootballMatchTeam.possession,
		shotsOn: feFootballMatchTeam.shotsOn,
		shotsOff: feFootballMatchTeam.shotsOff,
		fouls: feFootballMatchTeam.fouls,
		corners: feFootballMatchTeam.corners,
		colours: feFootballMatchTeam.colours,
		crest: feFootballMatchTeam.crest,
		players: parsedPlayers.value,
	});
};

export const parse = (
	feFootballMatch: FEFootballMatch,
): Result<ParserError, FootballMatch> => {
	const parsedHomeTeam = parseTeam(feFootballMatch.homeTeam);
	const parsedAwayTeam = parseTeam(feFootballMatch.awayTeam);

	if (parsedHomeTeam.kind === 'error') {
		return parsedHomeTeam;
	}

	if (parsedAwayTeam.kind === 'error') {
		return parsedAwayTeam;
	}

	return ok({
		homeTeam: parsedHomeTeam.value,
		awayTeam: parsedAwayTeam.value,
		comments: feFootballMatch.comments,
	});
};
