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
import useSWRImmutable from 'swr';

/**
 * Hooks for making requests to the support-dotcom-components API
 */
type UseSDC<T> = (
	baseUrl: string,
	payload: T,
) => ModuleDataResponse | undefined;

export const useSDCEpic: UseSDC<EpicPayload> = (baseUrl, payload) =>
	useSWRImmutable('epic', () => getEpic(baseUrl, payload)).data;

export const useSDCLiveblogEpic: UseSDC<EpicPayload> = (baseUrl, payload) =>
	useSWRImmutable('liveblog-epic', () => getLiveblogEpic(baseUrl, payload))
		.data;

export const useSDCBanner: UseSDC<BannerPayload> = (baseUrl, payload) =>
	useSWRImmutable('banner', () => getBanner(baseUrl, payload)).data;

export const useSDCPuzzlesBanner: UseSDC<BannerPayload> = (baseUrl, payload) =>
	useSWRImmutable('puzzles', () => getPuzzlesBanner(baseUrl, payload)).data;
