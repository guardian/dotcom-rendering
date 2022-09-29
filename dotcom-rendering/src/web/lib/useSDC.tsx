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
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';

const options: SWRConfiguration = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
};

/**
 * Hooks for making requests to the support-dotcom-components API
 */
type UseSDC<T> = (
	baseUrl: string,
	payload: T,
) => ModuleDataResponse | undefined;

export const useSDCEpic: UseSDC<EpicPayload> = (baseUrl, payload) =>
	useSWR('epic', () => getEpic(baseUrl, payload), options).data;

export const useSDCLiveblogEpic: UseSDC<EpicPayload> = (baseUrl, payload) =>
	useSWR('liveblog-epic', () => getLiveblogEpic(baseUrl, payload), options)
		.data;

export const useSDCBanner: UseSDC<BannerPayload> = (baseUrl, payload) =>
	useSWR('banner', () => getBanner(baseUrl, payload), options).data;

export const useSDCPuzzlesBanner: UseSDC<BannerPayload> = (baseUrl, payload) =>
	useSWR('puzzles', () => getPuzzlesBanner(baseUrl, payload), options).data;
