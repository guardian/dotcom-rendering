import type { EpicPayload } from '@guardian/support-dotcom-components/dist/dotcom/types';
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/types';
import useSWRImmutable from 'swr/immutable';
import type { ModuleDataResponse } from './sdcRequests';
import { getLiveblogEpic } from './sdcRequests';

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
		window.guardian.modules.sentry.reportError(error as Error, 'rr-epic');
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

export const useSDCLiveblogEpic: UseSDC<EpicPayload, EpicProps> = (
	baseUrl,
	payload,
) => useSDC('liveblog-epic', () => getLiveblogEpic(baseUrl, payload));
