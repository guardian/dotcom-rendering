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
	/** The size of the test, all variants will be divided equally to fit */
	size: number;
	/** Test group definition */
	groups: string[];
	/**
	 * Defaults to primary, all the tests in a test space must add up to 100%
	 * Be aware that putting a test in the secondary space may mean it will overlap other tests
	 **/
	testSpace?: 'primary' | 'secondary';
};
