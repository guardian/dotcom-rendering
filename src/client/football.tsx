// ----- Imports ----- //

import {
    fromNullable,
    andThen,
    none,
    some,
    OptionKind,
} from '@guardian/types';
import type { Option } from '@guardian/types';
import { isObject, pipe2 } from 'lib';
import { parseMatchScores } from 'football';
import type { MatchScores } from 'football';
import FootballScores from 'components/footballScores';
import ReactDOM from 'react-dom';
import { padZero } from 'date';

// ----- Setup ----- //

const footballElement = 'js-football-scores';
const scoresEndpoint = '/sport/football/matches';

// ----- Functions ----- //

const getMatchDate = (dateString: string | undefined): Option<Date> =>
	pipe2(
		dateString,
		fromNullable,
		andThen(d => {
			const date = new Date(d);

			return isNaN(date.getDay()) ? none : some(date);
		}),
	);

const getMatchSelector = (
	date: Option<Date>,
	teamA: Option<string>,
	teamB: Option<string>,
): Option<string> => {
	if (date.kind === OptionKind.Some &&
		teamA.kind === OptionKind.Some &&
		teamB.kind === OptionKind.Some
	) {
		// MAPI sorts these by string value
		const teams = teamA.value < teamB.value ? [teamA.value, teamB.value] : [teamB.value, teamA.value];
		const d = date.value;
		const year = d.getUTCFullYear();
		const month = padZero(d.getUTCMonth() + 1);
		const day = padZero(d.getUTCDate());

		return some(`${year}-${month}-${day}_${teams[0]}_${teams[1]}`);
	}

	return none;
}

const requestScores = async (selector: string): Promise<Option<MatchScores>> => {
    const params = new URLSearchParams({ selector: selector });
                
    const res = await fetch(
        `${scoresEndpoint}?${params.toString()}`,
        {
            headers: { 'Content-Type': 'application/json' },
            mode: 'same-origin',
        },
	);
	
    if (res.ok) {
		const json: unknown = await res.json();

        if (!isObject(json)) {
            return none;
		}
		
		const data = json[selector];

        return parseMatchScores(data);
    }

    return Promise.reject();
}

const setup = async (): Promise<void> => {
	const footballScores = fromNullable(document.getElementById(footballElement));

	if (footballScores.kind === OptionKind.Some) {
		const elem = footballScores.value;
		const matchDate = getMatchDate(elem.dataset.date);
			
		const teamA = fromNullable(elem.dataset.teamA);
		const teamB = fromNullable(elem.dataset.teamB);

		const selector = getMatchSelector(matchDate, teamA, teamB);

		if (selector.kind === OptionKind.Some) {
			const scores = await requestScores(selector.value);
			
			if (scores.kind === OptionKind.Some) {
				const stats = scores.value;

				ReactDOM.render(
					<FootballScores
						status={stats.status}
						league={stats.league}
						stadium={stats.stadium}
						homeTeam={stats.homeTeam}
						awayTeam={stats.awayTeam}
					/>,
					elem,
				);
			}
		}
	}
}

// ----- Exports ----- //

export {
    setup,
}
