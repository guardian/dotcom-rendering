import { getCookie } from '@guardian/libs';

/**
 * This cookie is used to store a CAPI key for the sIndicator feature, its presence also causes the
 * dotcom-rendering/src/client/sIndicator.ts script to be loaded, which then uses the key to query CAPI for the
 * rights.syndication status of the current article and onward links.
 *
 * The cookie is set via the syndication. subdomain of the guardian, defined in https://github.com/guardian/reuse-content
 */

const SINDICATOR_CAPI_KEY_COOKIE = 'GU_SINDICATOR_CAPI_KEY';

export const maybeSIndicatorCapiKey: string | null = getCookie({
	name: SINDICATOR_CAPI_KEY_COOKIE,
});
