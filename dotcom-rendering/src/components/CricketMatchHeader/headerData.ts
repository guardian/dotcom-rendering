import { safeParse } from 'valibot';
import { type CricketMatch, parseCricketMatchV2 } from '../../cricketMatchV2';
import type { FECricketMatchHeader } from '../../frontend/feCricketMatchHeader';
import { feCricketMatchHeaderSchema } from '../../frontend/feCricketMatchHeader';
import { safeParseURL } from '../../lib/parse';
import { error, fromValibot, ok, type Result } from '../../lib/result';

export type CricketHeaderData = {
	tabs: {
		liveURL?: URL;
		reportURL?: URL;
	};
	match: CricketMatch;
};

export const parse =
	(selectedTab: 'live' | 'info' | 'report', currentUrl: URL) =>
	(json: unknown): Result<string, CricketHeaderData> => {
		const feData = fromValibot(safeParse(feCricketMatchHeaderSchema, json));

		if (!feData.ok) {
			return error('Failed to validate match header json');
		}

		const parsedMatch = parseCricketMatchV2(feData.value.cricketMatch);

		if (!parsedMatch.ok) {
			return error('Failed to parse the match from the header json');
		}

		const maybeTabs = createTabs(
			feData.value,
			parsedMatch.value.kind,
			selectedTab,
			currentUrl,
		);

		if (!maybeTabs.ok) {
			return error(
				`The match header data contained an invalid ${maybeTabs.error.kind} URL`,
			);
		}

		return ok({
			match: parsedMatch.value,
			tabs: maybeTabs.value,
		});
	};

type MatchURLError = {
	kind: 'live' | 'report';
};

/**
 * Returns the URL for a given tab if we have it, if we don't have it and we are on that tab we can fallback to the current URL, there are some edge cases where live/report tabs urls aren't found by the API e.g the article is not tagged correctly.
 */
const getTabURL = (
	kind: 'live' | 'report',
	url: string | undefined,
	selectedTab: 'live' | 'info' | 'report',
	currentUrl: URL,
): Result<MatchURLError, URL | undefined> => {
	if (url === undefined) {
		if (selectedTab === kind) {
			return ok(currentUrl);
		}
		return ok(undefined);
	}

	const parsedURL = safeParseURL(url);

	if (!parsedURL.ok) {
		return error({ kind });
	}

	return ok(parsedURL.value);
};

const createTabs = (
	feData: FECricketMatchHeader,
	matchKind: CricketMatch['kind'],
	selectedTab: 'live' | 'info' | 'report',
	currentUrl: URL,
): Result<MatchURLError, CricketHeaderData['tabs']> => {
	const reportURL = getTabURL(
		'report',
		feData.reportURL,
		selectedTab,
		currentUrl,
	);
	const liveURL = getTabURL('live', feData.liveURL, selectedTab, currentUrl);

	if (!reportURL.ok) {
		return error(reportURL.error);
	}

	if (!liveURL.ok) {
		return error(liveURL.error);
	}

	return ok({
		matchKind,
		sportKind: 'cricket',
		reportURL: reportURL.value,
		liveURL: liveURL.value,
	});
};
