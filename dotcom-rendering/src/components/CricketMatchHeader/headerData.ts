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

export const parse = (json: unknown): Result<string, CricketHeaderData> => {
	const feData = fromValibot(safeParse(feCricketMatchHeaderSchema, json));

	if (!feData.ok) {
		return error('Failed to validate match header json');
	}

	const parsedMatch = parseCricketMatchV2(feData.value.cricketMatch);

	if (!parsedMatch.ok) {
		return error('Failed to parse the match from the header json');
	}

	const maybeTabs = createTabs(feData.value, parsedMatch.value.kind);

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

const createTabs = (
	feData: FECricketMatchHeader,
	matchKind: CricketMatch['kind'],
): Result<MatchURLError, CricketHeaderData['tabs']> => {
	const reportURL =
		feData.reportURL !== undefined
			? safeParseURL(feData.reportURL)
			: undefined;
	const liveURL =
		feData.liveURL !== undefined ? safeParseURL(feData.liveURL) : undefined;
	if (reportURL !== undefined && !reportURL.ok) {
		return error({ kind: 'report' });
	}

	if (liveURL !== undefined && !liveURL.ok) {
		return error({ kind: 'live' });
	}

	return ok({
		matchKind,
		sportKind: 'cricket',
		reportURL: reportURL?.value,
		liveURL: liveURL?.value,
	});
};
