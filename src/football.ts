// ----- Imports ----- //

import { andThen, map, OptionKind, none, some } from '@guardian/types';
import type { Option } from '@guardian/types';
import { pipe2 } from 'lib';
import { FootballContent } from '@guardian/apps-rendering-api-models/footballContent';
import { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';

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

type MatchStatus = {
    kind: MatchStatusKind.KickOff;
    time: string;
} | {
    kind: MatchStatusKind.FirstHalf;
} | {
    kind: MatchStatusKind.HalfTime;
} | {
    kind: MatchStatusKind.SecondHalf;
} | {
    kind: MatchStatusKind.FullTime;
} | {
    kind: MatchStatusKind.ExtraTime;
} | {
    kind: MatchStatusKind.Penalties;
} | {
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
}

const parseTime = (time: unknown): Option<string> => {
    if (typeof time !== 'string') {
        return none;
    }

    const date = new Date(time);

    if (isNaN(date.getUTCMinutes())) {
        return none;
    }

    return some(`${date.getUTCHours()}:${date.getUTCMinutes()}`);
}

const parseString = (string: unknown): Option<string> =>
    typeof string === 'string' ? some(string) : none;

const parseMatchStatus = (status: string, time: string): Option<MatchStatus> =>
    pipe2(
        status,
        parseStatus,
        andThen<MatchStatusKind, MatchStatus>(s => {
            if (s === MatchStatusKind.KickOff) {
                return pipe2(
                    time,
                    parseTime,
                    map(t => ({ kind: s, time: t })),
                );
            }
            
            return some({ kind: s });
        }),
    );

const parseMatchScores = (footballContent: Option<FootballContent>): Option<MatchScores> => {
    if (footballContent.kind === OptionKind.Some){
        const stadium = parseString(footballContent.value.venue);
        const status = parseMatchStatus(footballContent.value.status, footballContent.value.kickOff);
    
        if (
            stadium.kind === OptionKind.Some &&
            status.kind === OptionKind.Some 
        ) {
            return some({
                league: footballContent.value.competitionDisplayName,
                stadium: stadium.value,
                status: status.value,
                homeTeam: footballContent.value.homeTeam,
                awayTeam: footballContent.value.awayTeam,
            });
        }
    }

    return none;
}

// ----- Exports ----- //

export type {
    MatchStatus,
    MatchScores
}

export {
    MatchStatusKind,
    TeamLocation,
    parseMatchScores
}
