import { getCookie } from '@guardian/libs';

const AB_COOKIE_NAME = 'Client_AB_Tests';

type ABTestAPI = {
	isUserInTest: (testId: string, variantId: string) => boolean;
};

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

type BetaABTestsConfig = {
	ophanRecord: OphanRecordFunction;
	errorReporter: ErrorReporter;
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

export class BetaABTests implements ABTestAPI {
	private participations: ABParticipations;

	constructor({ ophanRecord, errorReporter }: BetaABTestsConfig) {
		this.participations = this.getParticipations();
		this.trackABTests({ ophanRecord, errorReporter });
	}

	isUserInTest(testId: string, variantId: string): boolean {
		return this.participations[testId] === variantId;
	}

	private trackABTests({ ophanRecord, errorReporter }: BetaABTestsConfig) {
		ophanRecord({
			abTestRegister: this.buildOphanPayload(errorReporter),
		});
	}

	private buildOphanPayload(errorReporter: ErrorReporter) {
		try {
			const log: OphanABPayload = {};

			for (const [testId, variantId] of Object.entries(
				this.participations,
			)) {
				log[testId] = makeABEvent(variantId, false);
			}

			return log;
		} catch (error: unknown) {
			// Encountering an error should invalidate the logging process.
			errorReporter(error);
			return {};
		}
	}

	private getParticipations(): ABParticipations {
		const userTestBuckets = getCookie({
			name: AB_COOKIE_NAME,
			shouldMemoize: true,
		});

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
