import { isObject, isUndefined } from '@guardian/libs';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { FEFootballDataPage } from '../feFootballDataPage';
import {
	type FootballMatches,
	type FootballMatchKind,
	getParserErrorMessage,
	parse,
	type Regions,
} from '../footballMatches';
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
				const feFootballData = responseJson as FEFootballDataPage;
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
	nations: Regions;
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
	nations,
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
			regions={nations}
			guardianBaseUrl={guardianBaseUrl}
			kind={kind}
			initialDays={initialDays}
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
