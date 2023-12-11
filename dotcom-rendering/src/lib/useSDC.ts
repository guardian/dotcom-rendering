import type { ModuleDataResponse } from '@guardian/support-dotcom-components';
import {
	getBanner,
	getEpic,
	getLiveblogEpic,
	getPuzzlesBanner,
} from '@guardian/support-dotcom-components';
import type {
	BannerPayload,
	EpicPayload,
} from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import useSWRImmutable from 'swr/immutable';

const useSDC = <T>(
	key: string,
	fetcher: (baseUrl: string, payload: T) => Promise<ModuleDataResponse>,
): ModuleDataResponse | undefined => {
	const { data, error } = useSWRImmutable(key, fetcher, {
		revalidateOnFocus: false,
	});
	if (error) {
		window.guardian.modules.sentry.reportError(error, 'rr-epic');
	}
	return data;
};

/**
 * Hooks for making requests to the support-dotcom-components API
 */
type UseSDC<T> = (
	baseUrl: string,
	payload: T,
) => ModuleDataResponse | undefined;

export const useSDCEpic: UseSDC<EpicPayload> = (baseUrl, payload) =>
	useSDC('epic', () => getEpic(baseUrl, payload));

export const useSDCLiveblogEpic: UseSDC<EpicPayload> = (baseUrl, payload) =>
	useSDC('liveblog-epic', () => getLiveblogEpic(baseUrl, payload));

export const useSDCBanner: UseSDC<BannerPayload> = (baseUrl, payload) =>
	useSDC('banner', () => getBanner(baseUrl, payload));

export const useSDCPuzzlesBanner: UseSDC<BannerPayload> = (baseUrl, payload) =>
	useSDC('puzzles', () => getPuzzlesBanner(baseUrl, payload));
