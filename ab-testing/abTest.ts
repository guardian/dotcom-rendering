type TestGroup = {
	id: String;
	size: number; // Percentage?
};

export type ABTest = {
	/** Name of the AB test */
	name: string;
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

const ABTests: ABTest[] = [
	// Example client side AB test definition
	{
		name: 'ab-test-client-1',
		description: 'AB test for client thingy 1',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'OFF',
		expirationDate: new Date('2025-04-30'),
		type: 'client',
		highImpact: false,
		controlGroup: { id: 'control-1', size: 0.2 },
		variantGroups: [{ id: 'variant-1', size: 0.2 }],
		offset: 0,
	},
	// Example server side AB test definition
	{
		name: 'ab-test-server-1',
		description: 'AB test for server thingy 2',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date('2025-04-30'),
		type: 'server',
		highImpact: true,
		controlGroup: { id: 'control-1', size: 0.1 },
		variantGroups: [{ id: 'variant-1', size: 0.1 }],
		offset: 0,
	},
];
