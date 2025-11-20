import { getCookie, isUndefined } from '@guardian/libs';
import { getForcedParticipationsFromUrlFlat } from '../lib/getAbUrlHash';

const AB_COOKIE_NAME = 'gu_client_ab_tests';

type ABParticipations = {
	[testId: string]: string;
};

/**
 * get client-side AB test state from the cookie
 */
const getClientParticipations = (): ABParticipations => {
	const clientParticipations = getCookie({
		name: AB_COOKIE_NAME,
		shouldMemoize: true,
	});

	if (clientParticipations) {
		return clientParticipations
			.split(',')
			.reduce<ABParticipations>((participations, abTestStatus) => {
				const [testId, groupId] = abTestStatus.split(':');
				if (testId && groupId) {
					participations[testId] = groupId;
				}
				return participations;
			}, {});
	}

	return {};
};

/**
 * Get all AB test participations, client and server side
 */
const getABTestParticipations = (): ABParticipations => {
	return {
		...getClientParticipations(),
		...window.guardian.config.serverSideABTests,
		...getForcedParticipationsFromUrlFlat(window.location.hash),
	};
};

const initWindowABTesting = (): void => {
	const participations = getABTestParticipations();

	window.guardian.modules.abTests = {
		getParticipations: getABTestParticipations,
		isUserInTest: (testId: string) => {
			return !isUndefined(participations[testId]);
		},
		isUserInTestGroup: (testId: string, groupId: string) => {
			return participations[testId] === groupId;
		},
	};
};

export { initWindowABTesting, getABTestParticipations };
