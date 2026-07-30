import { activeABtests } from '@guardian/ab-testing-config';
import { isUndefined } from '@guardian/libs';
import { getABTestParticipations } from '../../client/abTesting';
import { EditorialAbTest } from '../../types/front';

export interface ABTestAPI {
	getParticipations: () => ABParticipations;
	isUserInTest: (testId: string) => boolean;
	isUserInTestGroup: (testId: string, groupId: string) => boolean;
	trackABTests: (
		ophanRecord: OphanRecordFunction,
		errorReporter: ErrorReporter,
	) => void;
}

export type ABParticipations = {
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

type ABTestsConfig = {
	editorialAbTests?: EditorialAbTest[];
} & (
	| {
			isServer: true;
			serverSideABTests: Record<string, string>;
	  }
	| {
			isServer: false;
			serverSideABTests?: never;
	  }
);

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

export class ABTests implements ABTestAPI {
	private participations: ABParticipations;
	private editorialParticipations: EditorialAbTest[] | undefined;

	constructor({
		isServer,
		serverSideABTests,
		editorialAbTests,
	}: ABTestsConfig) {
		this.editorialParticipations = editorialAbTests;

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
			editorialAbTestRegister: this.buildOphanEditorialPayload(),
		});
	}

	private buildOphanEditorialPayload(): OphanABPayload {
		return (
			this.editorialParticipations?.reduce<OphanABPayload>(
				(eventLog, test) => {
					eventLog[test.testUuid] = makeABEvent(
						'editorial test',
						false,
					);
					return eventLog;
				},
				{},
			) ?? {}
		);
	}

	private shouldReportToOphan(testId: string): boolean {
		const activeTest = activeABtests.find(({ name }) => name === testId);
		return activeTest?.shouldReportToOphan
			? activeTest.shouldReportToOphan()
			: true;
	}

	private buildOphanPayload(errorReporter: ErrorReporter): OphanABPayload {
		try {
			const testAndVariantIds = Object.entries(
				this.participations,
			).filter(([testId]) => this.shouldReportToOphan(testId));

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
