import { getCookie, isUndefined } from '@guardian/libs';

const AB_COOKIE_NAME = 'gu_client_ab_tests';

type ABParticipations = {
	[testId: string]: string;
};

/**
 * get client-side AB test state from the cookie
 */
const getClientParticipations = (): ABParticipations => {
	const userTestBuckets = getCookie({
		name: AB_COOKIE_NAME,
		shouldMemoize: true,
	});

	if (userTestBuckets) {
		return userTestBuckets
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
const initABTesting = (): void => {
	const { serverSideABTests } = window.guardian.config;

	const clientSideABTests = getClientParticipations();

	const participations = {
		...clientSideABTests,
		...serverSideABTests,
	};

	window.guardian.modules.abTests = {
		getParticipations: () => participations,
		isUserInTest: (testId: string) => {
			return !isUndefined(participations[testId]);
		},
		isUserInTestGroup: (testId: string, groupId: string) => {
			return participations[testId] === groupId;
		},
	};
};

export { initABTesting };
