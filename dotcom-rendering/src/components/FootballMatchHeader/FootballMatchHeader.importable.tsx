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
		const run = async () => {
			const res = await fetch(props.matchHeaderURL);
			const json = await res.json();
			const feData = fromValibot(
				safeParse(feFootballMatchHeaderSchema, json),
			);

			if (feData.ok) {
				const parsedMatch = parseFootballMatchV2(
					feData.value.footballMatch,
				);

				if (parsedMatch.ok) {
					setMatch(parsedMatch.value);
					const maybeTabs = createTabs(
						props.tabs.selected,
						feData.value,
						parsedMatch.value.kind,
					);

					if (!maybeTabs.ok) {
						log(
							'dotcom',
							`The match header data contained an invalid ${maybeTabs.error.kind} URL`,
						);
					} else {
						setTabs(maybeTabs.value);
					}
				} else {
					log('dotcom', 'Failed to validate match header json');
				}
			} else {
				log('dotcom', 'Failed to validate match header json');
			}
		};

		run().catch(() => {
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
