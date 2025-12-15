import type { FootballMatch } from './footballMatchV2';

/**
 * A collection of football matches happening across one or more days, where
 * each day is represented by a separate item in the list.
 */
export type FootballMatches = FootballCompetitionsOnDay[];

/**
 * All the football competitions with matches on a given day.
 */
type FootballCompetitionsOnDay = {
	day: Date;
	competitions: FootballCompetition[];
};

/**
 * A selection of football matches happening as part of a given competition.
 */
type FootballCompetition = {
	id: string;
	tag: string;
	name: string;
	nation: string;
	matches: FootballMatch[];
};
