type Team = 'commercial' | 'webex';

type TestName = `${Team}-${string}`;

type TestGroup = {
	id: String;
	size: number; // Percentage?
};

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
	/** Control group definition */
	controlGroup: TestGroup;
	/** Variants group definition */
	variantGroups: Array<TestGroup>;
	/**
	 * We either need to specify an offset for our test, or we would
	 * specify the test buckets used for the whole test.
	 */
	offset: number;
};
