// ----- Imports ----- //

import type { FootballContent } from '@guardian/apps-rendering-api-models/footballContent';
import type { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import { andThen, fromNullable, map, map2, none, some } from '@guardian/types';
import type { Option } from '@guardian/types';
import { pipe } from 'lib';

// ----- Types ----- //

const enum TeamLocation {
	Home,
	Away,
}

const enum MatchStatusKind {
	KickOff,
	FirstHalf,
	HalfTime,
	SecondHalf,
	FullTime,
	ExtraTime,
	Penalties,
	Suspended,
}

type MatchStatus =
	| {
			kind: MatchStatusKind.KickOff;
			time: string;
	  }
	| {
			kind: MatchStatusKind.FirstHalf;
	  }
	| {
			kind: MatchStatusKind.HalfTime;
	  }
	| {
			kind: MatchStatusKind.SecondHalf;
	  }
	| {
			kind: MatchStatusKind.FullTime;
	  }
	| {
			kind: MatchStatusKind.ExtraTime;
	  }
	| {
			kind: MatchStatusKind.Penalties;
	  }
	| {
			kind: MatchStatusKind.Suspended;
	  };

interface MatchScores {
	league: string;
	stadium: string;
	status: MatchStatus;
	homeTeam: FootballTeam;
	awayTeam: FootballTeam;
}

// ----- Functions ----- //

const parseStatus = (status: unknown): Option<MatchStatusKind> => {
	if (typeof status !== 'string') {
		return none;
	}

	switch (status) {
		case 'F':
			return some(MatchStatusKind.KickOff);
		case '1st':
			return some(MatchStatusKind.FirstHalf);
		case 'HT':
			return some(MatchStatusKind.HalfTime);
		case '2nd':
			return some(MatchStatusKind.SecondHalf);
		case 'FT':
			return some(MatchStatusKind.FullTime);
		case 'ET':
			return some(MatchStatusKind.ExtraTime);
		case 'PT':
			return some(MatchStatusKind.Penalties);
		case 'S':
			return some(MatchStatusKind.Suspended);
		default:
			return none;
	}
};

const parseTime = (time: unknown): Option<string> => {
	if (typeof time !== 'string') {
		return none;
	}

	const date = new Date(time);

	if (isNaN(date.getUTCMinutes())) {
		return none;
	}

	return some(`${date.getUTCHours()}:${date.getUTCMinutes()}`);
};

const parseMatchStatus = (status: string, time: string): Option<MatchStatus> =>
	pipe(
		status,
		parseStatus,
		andThen<MatchStatusKind, MatchStatus>((s) => {
			if (s === MatchStatusKind.KickOff) {
				return pipe(
					time,
					parseTime,
					map((t) => ({ kind: s, time: t })),
				);
			}

			return some({ kind: s });
		}),
	);

const parseMatchScores: (
	footballContent: Option<FootballContent>,
) => Option<MatchScores> = andThen((football: FootballContent) => {
	const maybeStadium = fromNullable(football.venue);
	const maybeStatus = parseMatchStatus(football.status, football.kickOff);
	return map2((stadium: string, status: MatchStatus) => ({
		league: football.competitionDisplayName,
		stadium,
		status,
		homeTeam: football.homeTeam,
		awayTeam: football.awayTeam,
	}))(maybeStadium)(maybeStatus);
});

// ----- Exports ----- //

export type { MatchStatus, MatchScores };

export { MatchStatusKind, TeamLocation, parseMatchScores };
