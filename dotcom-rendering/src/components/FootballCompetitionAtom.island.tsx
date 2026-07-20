import useSWR from 'swr';
import { omit, safeParse } from 'valibot';
import { parse as parseFootballMatches } from '../footballMatches';
import { feFootballMatchDaySchema } from '../frontend/feFootballMatchDay';
import { FootballMatchDay } from './FootballMatchDay';

type Props = {
	footballCompetitionData: {
		competitionId: string;
		componentType: string;
	};
};

// The public match-day JSON endpoint returns the full DCR page payload, which
// does not include the `competitionTag` field that the embed endpoint provides.
// We therefore validate the fields we actually receive and derive the tag from
// the first competition's URL below.
const matchDayResponseSchema = omit(feFootballMatchDaySchema, [
	'competitionTag',
]);

const fetcher = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());

export const FootballCompetitionAtom = ({ footballCompetitionData }: Props) => {
	// competition id is e.g. 700, so need to map to a competition name, e.g. Premier League, La Liga, etc.
	// the endpoint is hardcoded and irrespective of the competition, so we can comment the below out
	// production use of this component would imply using the map to adjust the fetched url with the relevant competition name
	const competitionIdToNameMap: Record<string, string> = {
		700: 'world-cup-2026',
		100: 'premier-league',
	};

	const competitionName =
		competitionIdToNameMap[footballCompetitionData.competitionId];

	const { data, error } = useSWR<unknown, Error>(
		///
		// `https://api.nextgen.guardianapps.co.uk/football/${footballCompetitionData.competitionId}/embed
		// https://www.theguardian.com/football/world-cup-2026/live.json?dcr=true
		// production use of this component would likely require using the live endpoint, but this will only return data if there's an actual match on the day
		// for testing purposes, we can hardcode a match day endpoint to return data for a specific date, e.g. 2026-07-09, which provides at least one result
		// 'https://api.nextgen.guardianapps.co.uk/football/match-day/2026/jul/09.json?dcr=true',
		`https://api.nextgen.guardianapps.co.uk/football/${competitionName}/live.json?dcr=true`,
		fetcher,
	);

	if (error) {
		return <div>Failed to load football data</div>;
	}

	if (data === undefined) {
		return <div>Loading…</div>;
	}

	const validated = safeParse(matchDayResponseSchema, data);
	if (!validated.success) {
		return <div>Unexpected football data shape</div>;
	}

	const { matchesList, editionId, guardianBaseURL } = validated.output;

	const parsedMatches = parseFootballMatches(matchesList);
	if (!parsedMatches.ok) {
		return <div>Could not parse football matches</div>;
	}

	// Derive the competition tag (e.g. "world-cup-2026") from the first
	// competition's URL (e.g. "/football/world-cup-2026").
	const competitionTag =
		matchesList[0]?.competitionMatches[0]?.competitionSummary.url.replace(
			'/football/',
			'',
		) ?? '';

	return (
		<FootballMatchDay
			competitionTag={competitionTag}
			matches={parsedMatches.value}
			guardianBaseUrl={guardianBaseURL}
			edition={editionId}
		/>
	);
};
