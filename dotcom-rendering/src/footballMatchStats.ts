import type { FootballTeam } from './footballTeam';

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

/**
 * Events involving a particular player in a given football match.
 */
export type PlayerEvent = {
	kind: 'substitution' | 'booking' | 'dismissal';
	minute: number;
};
