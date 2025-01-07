import { isBoolean, isObject } from '@guardian/libs';
import type { SignedInWithCookies, SignedInWithOkta } from '../../lib/identity';
import { getOptionsHeadersWithOkta } from '../../lib/identity';
import type { UserBenefits } from './user-features-lib';
import { fetchJson } from './user-features-lib';

const dates = {
	1: '01',
	2: '02',
	3: '03',
	4: '04',
	5: '05',
	6: '06',
	7: '07',
	8: '08',
	9: '09',
	10: '10',
	11: '11',
	12: '12',
	13: '13',
	14: '14',
	15: '15',
	16: '16',
	17: '17',
	18: '18',
	19: '19',
	20: '20',
	21: '21',
	22: '22',
	23: '23',
	24: '24',
	25: '25',
	26: '26',
	27: '27',
	28: '28',
	29: '29',
	30: '30',
	31: '31',
} as const;

const months = {
	1: '01',
	2: '02',
	3: '03',
	4: '04',
	5: '05',
	6: '06',
	7: '07',
	8: '08',
	9: '09',
	10: '10',
	11: '11',
	12: '12',
} as const;

type LocalDate =
	`${number}-${(typeof months)[keyof typeof months]}-${(typeof dates)[keyof typeof dates]}`;

/**
 * This type is manually kept in sync with the Membership API:
 * https://github.com/guardian/members-data-api/blob/a48acdebed6a334ceb4336ece275b9cf9b3d6bb7/membership-attribute-service/app/models/Attributes.scala#L134-L151
 */
type UserFeaturesResponse = {
	userId: string;
	tier?: string;
	recurringContributionPaymentPlan?: string;
	oneOffContributionDate?: LocalDate;
	membershipJoinDate?: LocalDate;
	digitalSubscriptionExpiryDate?: LocalDate;
	paperSubscriptionExpiryDate?: LocalDate;
	guardianWeeklyExpiryDate?: LocalDate;
	liveAppSubscriptionExpiryDate?: LocalDate;
	alertAvailableFor?: string;
	showSupportMessaging: boolean;
	contentAccess: {
		member: boolean;
		paidMember: boolean;
		recurringContributor: boolean;
		digitalPack: boolean;
		paperSubscriber: boolean;
		guardianWeeklySubscriber: boolean;
	};
};

export const syncDataFromMembersDataApi: (
	signedInAuthStatus: SignedInWithOkta | SignedInWithCookies,
) => Promise<UserBenefits> = async (
	signedInAuthStatus: SignedInWithOkta | SignedInWithCookies,
) => {
	const response = await fetchJson(
		`${
			window.guardian.config.page.userAttributesApiUrl ??
			'/USER_ATTRIBUTE_API_NOT_FOUND'
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
		hideSupportMessaging: !response.showSupportMessaging,
		adFree: response.contentAccess.digitalPack,
	};
};

const validateResponse = (
	response: unknown,
): response is UserFeaturesResponse => {
	return (
		isObject(response) &&
		isBoolean(response.showSupportMessaging) &&
		isObject(response.contentAccess) &&
		isBoolean(response.contentAccess.paidMember) &&
		isBoolean(response.contentAccess.recurringContributor) &&
		isBoolean(response.contentAccess.digitalPack)
	);
};
