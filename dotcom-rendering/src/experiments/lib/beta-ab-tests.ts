const AB_COOKIE_NAME = 'Client_AB_Tests';

type ABTestAPI = {
	isUserInTest: (testId: string, variantId: string) => boolean;
};

type ABParticipations = {
	[testId: string]: string;
};

export class BetaABTests implements ABTestAPI {
	private participations: ABParticipations;

	constructor() {
		this.participations = this.getParticipations();
	}

	isUserInTest(testId: string, variantId: string): boolean {
		return this.participations[testId] === variantId;
	}

	private getParticipations(): ABParticipations {
		const cookieValues = document.cookie.split(';');
		const ABTestCookie =
			cookieValues.find((cookie) =>
				cookie.startsWith(`${AB_COOKIE_NAME}=`),
			) ?? '';
		const cookieRegex = /=(.+)/;
		const userTestBuckets = cookieRegex.exec(ABTestCookie)?.[1];

		if (userTestBuckets) {
			return userTestBuckets
				.split(',')
				.reduce<ABParticipations>((participations, abParticipation) => {
					const [testId, variantId] = abParticipation.split(':');
					if (testId && variantId) {
						participations[testId] = variantId;
					}
					return participations;
				}, {});
		}

		return {};
	}
}
