import { getConsentFor } from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';

const hasRequiredConsents = (state: ConsentState): boolean =>
	getConsentFor('braze', state);

export { hasRequiredConsents };
