import type { ModuleDataResponse } from '@guardian/support-dotcom-components';
import {
	getBanner,
	getEpic,
	getLiveblogEpic,
} from '@guardian/support-dotcom-components';
import type {
	BannerPayload,
	EpicPayload,
} from '@guardian/support-dotcom-components/dist/dotcom/types';
import type {
	BannerProps,
	EpicProps,
} from '@guardian/support-dotcom-components/dist/shared/types';
import useSWRImmutable from 'swr/immutable';

const useSDC = <PAYLOAD, PROPS>(
	key: string,
	fetcher: (
		baseUrl: string,
		payload: PAYLOAD,
	) => Promise<ModuleDataResponse<PROPS>>,
): ModuleDataResponse<PROPS> | undefined => {
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
type UseSDC<PAYLOAD, PROPS> = (
	baseUrl: string,
	payload: PAYLOAD,
) => ModuleDataResponse<PROPS> | undefined;

export const useSDCEpic: UseSDC<EpicPayload, EpicProps> = (baseUrl, payload) =>
	useSDC('epic', () => getEpic(baseUrl, payload));

export const useSDCLiveblogEpic: UseSDC<EpicPayload, EpicProps> = (
	baseUrl,
	payload,
) => useSDC('liveblog-epic', () => getLiveblogEpic(baseUrl, payload));

export const useSDCBanner: UseSDC<BannerPayload, BannerProps> = (
	baseUrl,
	payload,
) => useSDC('banner', () => getBanner(baseUrl, payload));
