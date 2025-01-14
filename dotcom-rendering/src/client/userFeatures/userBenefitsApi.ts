import { isBoolean, isObject } from '@guardian/libs';
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
	const response = await fetchJson(
		`${
			window.guardian.config.page.userBenefitsApiUrl ??
			'https://user-benefits.code.dev-guardianapis.com/benefits/me'
		}/me`,
		{
			mode: 'cors',
			...getOptionsHeadersWithOkta(signedInAuthStatus),
		},
	);
	if (!validateResponse(response)) {
		throw new Error('invalid response');
	}
	return {
		hideSupportMessaging: response.benefits.includes(
			'hideSupportMessaging',
		),
		adFree: response.benefits.includes('adFree'),
	};
};

const validateResponse = (
	response: unknown,
): response is UserBenefitsResponse => {
	return isObject(response) && isBoolean(response.benefits);
};
