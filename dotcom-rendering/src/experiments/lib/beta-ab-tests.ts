import { getCookie } from '@guardian/libs';

const AB_COOKIE_NAME = 'gu_client_ab_tests';

export interface BetaABTestAPI {
	isUserInTest: (testId: string, variantId: string) => boolean;
	trackABTests: () => void;
	getParticipations: () => ABParticipations;
}

type ABParticipations = {
	[testId: string]: string;
};

interface OphanABEvent {
	variantName: string;
	complete: string | boolean;
	campaignCodes?: readonly string[];
}

type OphanABPayload = Record<string, OphanABEvent>;

type OphanRecordFunction = (send: Record<string, OphanABPayload>) => void;

type ErrorReporter = (e: unknown) => void;

type BetaABTestsConfig =
	| {
			ssr?: false;
			ophanRecord: OphanRecordFunction;
			errorReporter: ErrorReporter;
			serverSideABTests: Record<string, string>;
	  }
	| {
			ssr: true;
			serverSideABTests: Record<string, string>;
	  };

/**
 * generate an A/B event for Ophan
 */
const makeABEvent = (variantName: string, complete: boolean): OphanABEvent => {
	const event: OphanABEvent = {
		variantName,
		complete,
	};

	return event;
};

/**
 * get client-side AB test state from the cookie
 */
const getParticipations = (
	serverSideABTests: Record<string, string>,
	ssr: boolean,
): ABParticipations => {
	if (ssr) {
		return serverSideABTests;
	}

	const userTestBuckets = getCookie({
		name: AB_COOKIE_NAME,
		shouldMemoize: true,
	});

	if (userTestBuckets) {
		return userTestBuckets
			.split(',')
			.reduce<ABParticipations>((participations, abTestStatus) => {
				const [testId, variantId] = abTestStatus.split(':');
				if (testId && variantId) {
					participations[testId] = variantId;
				}
				return participations;
			}, serverSideABTests);
	}

	return serverSideABTests;
};

export class BetaABTests implements BetaABTestAPI {
	private participations: ABParticipations = {};
	private ophanRecord?: OphanRecordFunction;
	private errorReporter?: ErrorReporter;

	constructor(config: BetaABTestsConfig) {
		const { ssr, serverSideABTests } = config;

		this.participations = getParticipations(
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- test
			serverSideABTests || {},
			Boolean(config.ssr),
		);
		if (!ssr) {
			this.ophanRecord = config.ophanRecord;
			this.errorReporter = config.errorReporter;
		}
	}

	isUserInTest(testId: string, variantId: string): boolean {
		return this.participations[testId] === variantId;
	}

	getParticipations(): ABParticipations {
		return this.participations;
	}

	trackABTests(): void {
		this.ophanRecord &&
			this.ophanRecord({
				abTestRegister: this.buildOphanPayload(),
			});
	}

	private buildOphanPayload() {
		try {
			const testAndVariantIds = Object.entries(this.participations);

			return testAndVariantIds.reduce<OphanABPayload>(
				(eventLog, [testId, variantId]) => {
					eventLog[testId] = makeABEvent(variantId, false);
					return eventLog;
				},
				{},
			);
		} catch (error: unknown) {
			// Encountering an error should invalidate the logging process.
			this.errorReporter && this.errorReporter(error);
			return {};
		}
	}
}
