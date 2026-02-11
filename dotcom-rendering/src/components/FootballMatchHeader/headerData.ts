import { safeParse } from 'valibot';
import {
	parseFootballMatchV2,
	type FootballMatch,
} from '../../footballMatchV2';
import { error, fromValibot, ok, type Result } from '../../lib/result';
import {
	feFootballMatchHeaderSchema,
	type FEFootballMatchHeader,
} from '../../frontend/feFootballMatchHeader';
import { safeParseURL } from '../../lib/parse';
import type { ComponentProps } from 'react';
import type { Tabs } from './Tabs';

export type HeaderData = {
	tabs: ComponentProps<typeof Tabs>;
	match: FootballMatch;
};

export const parse =
	(selected: HeaderData['tabs']['selected']) =>
	(json: unknown): Result<string, HeaderData> => {
		const feData = fromValibot(
			safeParse(feFootballMatchHeaderSchema, json),
		);

		if (!feData.ok) {
			return error('Failed to validate match header json');
		}

		const parsedMatch = parseFootballMatchV2(feData.value.footballMatch);

		if (!parsedMatch.ok) {
			return error('Failed to parse the match from the header json');
		}

		const maybeTabs = createTabs(
			selected,
			feData.value,
			parsedMatch.value.kind,
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
	kind: 'live' | 'report' | 'info';
};

const createTabs = (
	selected: HeaderData['tabs']['selected'],
	feData: FEFootballMatchHeader,
	matchKind: FootballMatch['kind'],
): Result<MatchURLError, HeaderData['tabs']> => {
	const reportURL =
		feData.reportURL !== undefined
			? safeParseURL(feData.reportURL)
			: undefined;
	const liveURL =
		feData.liveURL !== undefined ? safeParseURL(feData.liveURL) : undefined;
	const infoURL = safeParseURL(feData.infoURL);

	if (reportURL !== undefined && !reportURL.ok) {
		return error({ kind: 'report' });
	}

	if (liveURL !== undefined && !liveURL.ok) {
		return error({ kind: 'live' });
	}

	if (!infoURL.ok) {
		return error({ kind: 'info' });
	}

	switch (selected) {
		case 'info':
			return ok({
				matchKind,
				selected,
				reportURL: reportURL?.value,
				liveURL: liveURL?.value,
			});
		case 'live':
			return ok({
				matchKind,
				selected,
				reportURL: reportURL?.value,
				infoURL: infoURL.value,
			});
		case 'report':
			return ok({
				matchKind,
				selected,
				liveURL: liveURL?.value,
				infoURL: infoURL.value,
			});
	}
};
