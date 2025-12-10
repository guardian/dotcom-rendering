import type { FootballTeam } from './footballTeam';

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
	venue: string;
};

/**
 * Once a match has started, we can bundle together information about a team,
 * such as its name, with its score and which players have scored.
 */
type FootballMatchTeamWithScore = FootballTeam & {
	score: number;
	scorers: string[];
};
