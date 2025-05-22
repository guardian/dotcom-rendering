type Team = 'commercial' | 'webex';

type TestName = `${Team}-${string}`;

export type ABTest = {
	/** Name of the AB test */
	name: TestName;
	/** Description of the AB test */
	description: string;
	/** Email address of owner(s) of the test */
	owners: string[];
	/** The datetime the test expires on (expressed in UTC) - will turn OFF when expires */
	expirationDate: Date;
	/** Test type: should this run on the server or client */
	type: 'server' | 'client';
	/** Indicates whether changing the test state is 'dangerous' */
	highImpact: boolean;
	/** Whether the AB test is currently running or not
	 * Would be nice to know who changed the status last and when
	 */
	status: 'ON' | 'OFF';
	/** The size of the test, all variants will be divided equally to fit */
	audienceSize: number;
	/** The offset of the test, adjust to ensure that tests do not overlap */
	audienceOffset?: number;
	/**
	 * Each test space represents 100% of the audience
	 * Having multiple test spaces allows deliberate overlapping of test audiences
	 * Defaults to A
	 */
	audienceSpace?: 'A' | 'B';
	/** Test group definition */
	groups: string[];
};
