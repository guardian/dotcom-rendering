import { log } from '@guardian/libs';
import { type ComponentProps, useEffect, useState } from 'react';
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

type Props = {
	leagueName: string;
	match: FootballMatch;
	tabs: ComponentProps<typeof FootballMatchHeaderComponent>['tabs'];
	edition: EditionId;
	matchHeaderURL: URL;
};

export const FootballMatchHeader = (props: Props) => {
	const [match, setMatch] = useState(props.match);
	const [tabs, setTabs] = useState(props.tabs);

	useEffect(() => {
		fetch(props.matchHeaderURL)
			.then((res) => res.json())
			.then(parseHeaderData(props.tabs.selected))
			.then((result) => {
				if (!result.ok) {
					log('dotcom', result.error);
				} else {
					setMatch(result.value.match);
					setTabs(result.value.tabs);
				}
			})
			.catch(() => {
				log('dotcom', 'Failed to fetch match header json');
			});
	}, [props.matchHeaderURL, props.tabs.selected]);

	return (
		<FootballMatchHeaderComponent
			leagueName={props.leagueName}
			match={match}
			tabs={tabs}
			edition={props.edition}
		/>
	);
};

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
