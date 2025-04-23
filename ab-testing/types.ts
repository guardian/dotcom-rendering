type Team = 'commercial' | 'webex';

type TestName = `${Team}-${string}`;

type TestGroup = {
	id: String;
	/** Percentage of users in this group */
	size: number;
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
	/** Test group definition */
	groups: Array<TestGroup>;
	/** Can this test overlap other tests? Required for 100% tests */
	allowOverlap?: boolean;
};
