// ----- Imports ----- //

import { Tag } from '@guardian/content-api-models/v1/tag';
import { andThen, map, map2, OptionKind, none, some, withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import { isObject, pipe, pipe2 } from 'lib';
import { FootballContent } from '@guardian/apps-rendering-api-models/footballContent';
import { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';

// ----- Types ----- //

interface Scorer {
    name: string;
    time: number;
}

interface Team {
    name: string;
    score: number;
    scorers: Scorer[];
}

type Teams = [string, string];

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
    homeTeam: Team;
    awayTeam: Team;
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

const parseNumber = (number: unknown): Option<number> =>
    typeof number === 'number' ? some(number) : none;

const parseMatchStatus = (status: unknown, time: unknown): Option<MatchStatus> =>
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

const parseScorer = (scorer: unknown): Option<Scorer> => {
    if (!isObject(scorer)) {
        return none;
    }

    return map2(
        (name: string, time: number) => ({ name, time })
    )(
        parseString(scorer.player)
    )(
        parseNumber(scorer.timeInMinutes)
    )
}

const parseArray = <A>(parseA: (a: unknown) => Option<A>) => (array: unknown): Option<A[]> => {
    const f = (acc: A[], remainder: unknown[]): Option<A[]> => {
        if (remainder.length === 0) {
            return some(acc);
        }

        const [ item, ...tail ] = remainder;
        const parsed = parseA(item);

        if (parsed.kind === OptionKind.Some) {
            return f([ ...acc, parsed.value ], tail);
        }

        return none;
    }

    if (Array.isArray(array)) {
        return f([], array);
    }

    return none;
}

const parseScorers = (score: Option<number>, scorers: unknown): Option<Scorer[]> =>
    pipe(
        score,
        andThen(s => s === 0 ? some([]) : parseArray(parseScorer)(scorers)),
    )

const parseTeam = (team: unknown): Option<Team> => {
    if (!isObject(team)) {
        return none;
    }

    const name = parseString(team.name);
    const score = parseNumber(team.score);
    const scorers = parseScorers(score, team.scorers);

    if (
        name.kind === OptionKind.Some &&
        score.kind === OptionKind.Some &&
        scorers.kind === OptionKind.Some
    ) {
        return some({
            name: name.value,
            score: score.value,
            scorers: scorers.value,
        });
    }

    return none;
}

const parseMatchScores = (json: unknown): Option<MatchScores> => {
    if (!isObject(json)) {
        return none;
    }

    const league = parseString(json.competitionDisplayName);
    const stadium = parseString(json.venue);
    const status = parseMatchStatus(json.status, json.KickOff);
    const home = parseTeam(json.homeTeam);
    const away = parseTeam(json.awayTeam);

    if (
        league.kind === OptionKind.Some &&
        stadium.kind === OptionKind.Some &&
        status.kind === OptionKind.Some &&
        home.kind === OptionKind.Some &&
        away.kind === OptionKind.Some
    ) {
        return some({
            league: league.value,
            stadium: stadium.value,
            status: status.value,
            homeTeam: home.value,
            awayTeam: away.value,
        });
    }

    return none;
}

const teamsFromTags = (tags: Tag[]): Option<Teams> => {
    const [ teamA, teamB ] = tags.reduce((ids: string[], tag: Tag) => {
        const teamTag = tag.references.find(ref => ref.id.startsWith('pa-football-team'));

        if (teamTag !== undefined) {
            const id = teamTag.id.split('/')[1];

            if (id !== undefined) {
                return [ ...ids, id ];
            }
        }

        return ids;
    }, []);

    if (teamA !== undefined && teamB !== undefined) {
        return some([teamA, teamB]);
    }

    return none;
}

const teamsFromFootballContent = (footballContent: Option<FootballContent>): Option<Teams> => {
    return pipe(
        footballContent,
        map((c: FootballContent ) => {return [c.homeTeam.id, c.awayTeam.id]}),
    )
}

// ----- Exports ----- //

export type {
    MatchStatus,
    MatchScores,
    Team,
}

export {
    MatchStatusKind,
    TeamLocation,
    parseMatchScores,
    teamsFromTags,
    teamsFromFootballContent
}
