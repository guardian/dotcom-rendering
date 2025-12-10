import { isOneOf } from '@guardian/libs';
import { listParse, replaceLiveMatchStatus } from './footballMatches';
import type {
	FEFootballMatch,
	FEFootballPlayer,
	FEFootballPlayerEvent,
	FEFootballTeam,
} from './frontend/feFootballMatchPage';
import type { Result } from './lib/result';
import { error, ok } from './lib/result';
import { cleanTeamName } from './sportDataPage';

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
	status: string;
	comments?: string;
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
): Result<ParserError, FootballPlayer> =>
	parseEvents(feFootballMatchPlayer.events).map((events) => ({
		id: feFootballMatchPlayer.id,
		name: feFootballMatchPlayer.name,
		position: feFootballMatchPlayer.position,
		lastName: feFootballMatchPlayer.lastName,
		substitute: feFootballMatchPlayer.substitute,
		timeOnPitch: feFootballMatchPlayer.timeOnPitch,
		shirtNumber: feFootballMatchPlayer.shirtNumber,
		events,
	}));

const parsePlayers = listParse(parsePlayer);

const parseTeam = (
	feFootballMatchTeam: FEFootballTeam,
): Result<ParserError, FootballTeam> =>
	parsePlayers(feFootballMatchTeam.players).map((players) => ({
		id: feFootballMatchTeam.id,
		name: cleanTeamName(feFootballMatchTeam.name),
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
		players,
	}));

export const parse = (
	feFootballMatch: FEFootballMatch,
): Result<ParserError, FootballMatch> =>
	parseTeam(feFootballMatch.homeTeam).flatMap((homeTeam) =>
		parseTeam(feFootballMatch.awayTeam).map((awayTeam) => ({
			homeTeam,
			awayTeam,
			status: replaceLiveMatchStatus(feFootballMatch.status),
			comments: feFootballMatch.comments,
		})),
	);
