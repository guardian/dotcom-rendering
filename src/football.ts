// ----- Imports ----- //

import type { FootballContent } from '@guardian/apps-rendering-api-models/footballContent';
import type { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import { Optional } from 'optional';

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

const parseStatus = (status: unknown): Optional<MatchStatusKind> => {
	if (typeof status !== 'string') {
		return Optional.none();
	}

	switch (status) {
		case 'F':
			return Optional.some(MatchStatusKind.KickOff);
		case '1st':
			return Optional.some(MatchStatusKind.FirstHalf);
		case 'HT':
			return Optional.some(MatchStatusKind.HalfTime);
		case '2nd':
			return Optional.some(MatchStatusKind.SecondHalf);
		case 'FT':
			return Optional.some(MatchStatusKind.FullTime);
		case 'ET':
			return Optional.some(MatchStatusKind.ExtraTime);
		case 'PT':
			return Optional.some(MatchStatusKind.Penalties);
		case 'S':
			return Optional.some(MatchStatusKind.Suspended);
		default:
			return Optional.none();
	}
};

const parseTime = (time: unknown): Optional<string> => {
	if (typeof time !== 'string') {
		return Optional.none();
	}

	const date = new Date(time);

	if (isNaN(date.getUTCMinutes())) {
		return Optional.none();
	}

	return Optional.some(`${date.getUTCHours()}:${date.getUTCMinutes()}`);
};

const parseMatchStatus = (
	status: string,
	time: string,
): Optional<MatchStatus> =>
	parseStatus(status).flatMap<MatchStatus>((s) => {
		if (s === MatchStatusKind.KickOff) {
			return parseTime(time).map((t) => ({ kind: s, time: t }));
		}

		return Optional.some({ kind: s });
	});

const parseMatchScores = (football: FootballContent): Optional<MatchScores> => {
	const maybeStadium = Optional.fromNullable(football.venue);
	const maybeStatus = parseMatchStatus(football.status, football.kickOff);

	return Optional.map2(
		maybeStadium,
		maybeStatus,
		(stadium: string, status: MatchStatus) => ({
			league: football.competitionDisplayName,
			stadium,
			status,
			homeTeam: football.homeTeam,
			awayTeam: football.awayTeam,
		}),
	);
};

// ----- Exports ----- //

export type { MatchStatus, MatchScores };

export { MatchStatusKind, TeamLocation, parseMatchScores };
