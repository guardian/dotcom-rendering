import { isObject } from '@guardian/libs';
import {
	getOptionsHeadersWithOkta,
	type SignedInWithCookies,
	type SignedInWithOkta,
} from '../../lib/identity';
import { fetchJson } from './fetchJson';
import type { UserBenefits } from './user-features';

type UserBenefitsResponse = {
	benefits: string[];
};
export const syncDataFromUserBenefitsApi = async (
	signedInAuthStatus: SignedInWithOkta | SignedInWithCookies,
): Promise<UserBenefits> => {
	const url = window.guardian.config.page.userBenefitsApiUrl;
	if (!url) {
		throw new Error('userBenefitsApiUrl is not defined');
	}
	const response = await fetchJson(url, {
		mode: 'cors',
		...getOptionsHeadersWithOkta(signedInAuthStatus),
	});
	if (!validateResponse(response)) {
		throw new Error('invalid response');
	}
	return {
		hideSupportMessaging: response.benefits.includes(
			'hideSupportMessaging',
		),
		adFree: response.benefits.includes('adFree'),
		allowRejectAll: response.benefits.includes('allowRejectAll'),
	};
};

const validateResponse = (
	response: unknown,
): response is UserBenefitsResponse => {
	return isObject(response) && Array.isArray(response.benefits);
};
