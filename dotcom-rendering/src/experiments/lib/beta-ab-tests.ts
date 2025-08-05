import { isServer } from '../../lib/isServer';

export interface BetaABTestAPI {
	isUserInTest: (testId: string, variantId: string) => boolean;
	trackABTests: (
		ophanRecord: OphanRecordFunction,
		errorReporter: ErrorReporter,
	) => void;
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

export class BetaABTests implements BetaABTestAPI {
	private participations: ABParticipations;

	constructor({ serverSideABTests }: BetaABTestsConfig) {
		if (isServer) {
			this.participations = serverSideABTests;
		} else {
			this.participations =
				window.guardian.modules.abTests?.getParticipations() ?? {};
		}
	}

	isUserInTest(testId: string, variantId: string): boolean {
		return this.participations[testId] === variantId;
	}

	trackABTests(
		ophanRecord: OphanRecordFunction,
		errorReporter: ErrorReporter,
	): void {
		ophanRecord({
			abTestRegister: this.buildOphanPayload(errorReporter),
		});
	}

	private buildOphanPayload(errorReporter: ErrorReporter) {
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
			errorReporter(error);
			return {};
		}
	}
}
