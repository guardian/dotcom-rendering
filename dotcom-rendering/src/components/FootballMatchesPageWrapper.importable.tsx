import { isObject, isUndefined } from '@guardian/libs';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { Region } from '../footballDataPage';
import {
	type FootballMatches,
	type FootballMatchKind,
	getParserErrorMessage,
	parse,
} from '../footballMatches';
import type { FEFootballMatchListPage } from '../frontend/feFootballMatchListPage';
import type { EditionId } from '../lib/edition';
import type { Result } from '../lib/result';
import { error, ok } from '../lib/result';
import { FootballMatchesPage } from './FootballMatchesPage';

export const getMoreDays =
	(
		ajaxUrl: string,
		nextPage: string,
		setNextPage: Dispatch<SetStateAction<string | undefined>>,
	) =>
	async (): Promise<Result<'failed', FootballMatches>> => {
		try {
			const fetchResponse = await fetch(`${ajaxUrl}${nextPage}.json?dcr`);

			const responseJson: unknown = await fetchResponse.json();

			if (isObject(responseJson)) {
				const feFootballData = responseJson as FEFootballMatchListPage;
				const parsedFootballMatches = parse(feFootballData.matchesList);

				if (parsedFootballMatches.kind === 'error') {
					throw new Error(
						`Failed to parse matches: ${getParserErrorMessage(
							parsedFootballMatches.error,
						)}`,
					);
				}

				setNextPage(feFootballData.nextPage);

				return ok(parsedFootballMatches.value);
			}
			throw new Error('Failed to parse response JSON as an object');
		} catch (e) {
			if (e instanceof Error) {
				window.guardian.modules.sentry.reportError(
					e,
					'get-more-football-matches-button',
				);
			}

			return error('failed');
		}
	};

const goToCompetitionSpecificPage =
	(guardianBaseUrl: string) => (path: string) => {
		const url = `${guardianBaseUrl}${path}`;
		window.location.assign(url);
	};

type Props = {
	regions: Region[];
	now: string;
	guardianBaseUrl: string;
	ajaxUrl: string;
	kind: FootballMatchKind;
	initialDays: FootballMatches;
	secondPage?: string;
	edition: EditionId;
	renderAds: boolean;
	pageId: string;
};

export const FootballMatchesPageWrapper = ({
	regions,
	now,
	guardianBaseUrl,
	ajaxUrl,
	kind,
	initialDays,
	secondPage,
	edition,
	renderAds,
	pageId,
}: Props) => {
	const [nextPage, setNextPage] = useState(secondPage);

	return (
		<FootballMatchesPage
			regions={regions}
			guardianBaseUrl={guardianBaseUrl}
			kind={kind}
			initialDays={initialDays}
			now={now}
			edition={edition}
			goToCompetitionSpecificPage={goToCompetitionSpecificPage(
				guardianBaseUrl,
			)}
			getMoreDays={
				isUndefined(nextPage)
					? undefined
					: getMoreDays(ajaxUrl, nextPage, setNextPage)
			}
			renderAds={renderAds}
			pageId={pageId}
		/>
	);
};
