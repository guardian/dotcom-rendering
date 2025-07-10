import { getCookie } from '@guardian/libs';

const AB_COOKIE_NAME = 'Client_AB_Tests';

export interface BetaABTestAPI {
	isUserInTest: (testId: string, variantId: string) => boolean;
	trackABTests: () => void;
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

/**
 * get client-side AB test state from the cookie
 */
const getParticipations = (): ABParticipations => {
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
			}, {});
	}

	return {};
};

export class BetaABTests implements BetaABTestAPI {
	private participations: ABParticipations;
	private ophanRecord: OphanRecordFunction;
	private errorReporter: ErrorReporter;

	constructor({ ophanRecord, errorReporter }: BetaABTestsConfig) {
		this.participations = getParticipations();
		this.ophanRecord = ophanRecord;
		this.errorReporter = errorReporter;
	}

	isUserInTest(testId: string, variantId: string): boolean {
		return this.participations[testId] === variantId;
	}

	trackABTests(): void {
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
			this.errorReporter(error);
			return {};
		}
	}
}
