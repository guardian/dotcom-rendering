import { isUndefined } from '@guardian/libs';
import { getABTestParticipations } from '../../client/abTesting';

export interface BetaABTestAPI {
	getParticipations: () => ABParticipations;
	isUserInTest: (testId: string) => boolean;
	isUserInTestGroup: (testId: string, groupId: string) => boolean;
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

type BetaABTestsConfig =
	| {
			isServer: true;
			serverSideABTests: Record<string, string>;
	  }
	| {
			isServer: false;
			serverSideABTests?: never;
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

	constructor({ isServer, serverSideABTests }: BetaABTestsConfig) {
		if (isServer) {
			this.participations = serverSideABTests;
		} else {
			this.participations = getABTestParticipations();
		}
	}

	getParticipations(): ABParticipations {
		return this.participations;
	}

	isUserInTest(testId: string): boolean {
		return !isUndefined(this.participations[testId]);
	}

	isUserInTestGroup(testId: string, groupId: string): boolean {
		return this.participations[testId] === groupId;
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
