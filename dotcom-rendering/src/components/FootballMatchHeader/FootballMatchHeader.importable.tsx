import { log } from '@guardian/libs';
import { type ComponentProps } from 'react';
import { safeParse } from 'valibot';
import {
	type FootballMatch,
	parseFootballMatchV2,
} from '../../footballMatchV2';
import {
	type FEFootballMatchHeader,
	feFootballMatchHeaderSchema,
} from '../../frontend/feFootballMatchHeader';
import { type EditionId } from '../../lib/edition';
import { safeParseURL } from '../../lib/parse';
import { error, fromValibot, ok, type Result } from '../../lib/result';
import { FootballMatchHeader as FootballMatchHeaderComponent } from './FootballMatchHeader';
import useSWR, { SWRConfiguration } from 'swr';
type Props = {
	leagueName: string;
	match: FootballMatch;
	tabs: ComponentProps<typeof FootballMatchHeaderComponent>['tabs'];
	edition: EditionId;
	matchHeaderURL: URL;
};

export const FootballMatchHeader = (props: Props) => {
	const options = {
		errorRetryCount: 1,
		refreshInterval: (latestData: HeaderData | undefined) => {
			return latestData?.match.kind === 'Live' ||
				latestData?.match.kind === 'Fixture'
				? 16_000
				: 0;
		},
	} satisfies SWRConfiguration<HeaderData>;

	const { data } = useSWR<HeaderData, string>(
		props.matchHeaderURL,
		fetcher(props.tabs.selected),
		options,
	);

	return (
		<FootballMatchHeaderComponent
			leagueName={props.leagueName}
			match={data?.match ?? props.match}
			tabs={data?.tabs ?? props.tabs}
			edition={props.edition}
		/>
	);
};

const fetcher =
	(selected: Props['tabs']['selected']) =>
	(url: string): Promise<HeaderData> =>
		fetch(url)
			.then((res) => res.json())
			.then(parseHeaderData(selected))
			.then((result) => {
				if (!result.ok) {
					log('dotcom', result.error);
					throw new Error();
				} else {
					return result.value;
				}
			})
			.catch(() => {
				log('dotcom', 'Failed to fetch match header json');
				throw new Error();
			});

type HeaderData = {
	tabs: Props['tabs'];
	match: FootballMatch;
};

const parseHeaderData =
	(selected: Props['tabs']['selected']) =>
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
	selected: Props['tabs']['selected'],
	feData: FEFootballMatchHeader,
	matchKind: FootballMatch['kind'],
): Result<MatchURLError, Props['tabs']> => {
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
