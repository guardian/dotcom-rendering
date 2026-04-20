type FastlyTestParams = { name: string; type: string; exp: number };

type AudienceSpace = Map<string, FastlyTestParams>;

type AllSpace = Map<string, FastlyTestParams[]>;

type Team =
	| 'commercial'
	// WebX in the canonical name for the team, when the last test using webex expires we should remove webex from this union type
	| 'webex'
	| 'webx'
	| 'thefilter'
	| 'fronts-and-curation'
	| 'growth';

type TestName = `${Team}-${string}`;

type Year = `${number}${number}${number}${number}`;
type Month = `${number}${number}`;
type Day = `${number}${number}`;

type ABTest = {
	/** Name of the AB test */
	name: TestName;
	/** Description of the AB test */
	description: string;
	/** Email address of owner(s) of the test */
	owners: string[];
	/** The datetime the test expires on (expressed in UTC) - will turn OFF when expires */
	expirationDate: `${Year}-${Month}-${Day}`;
	/** Test type: should this run on the server or client */
	type: 'server' | 'client';
	/**
	 * Whether the AB test is currently running or not
	 * Would be nice to know who changed the status last and when
	 */
	status: 'ON' | 'OFF';
	/** The size of the test, all variants will be divided equally to fit */
	audienceSize: number;
	/**
	 * Each test space represents 100% of the audience
	 * Having multiple test spaces allows deliberate overlapping of test audiences
	 * Defaults to A
	 */
	audienceSpace?: 'A' | 'B' | 'C';
	/** Test group definition */
	groups: string[];
	/**
	 * Bypasses sampling to force metrics collection for this test
	 * See DCR Metrics component for end usage
	 */
	shouldForceMetricsCollection?: boolean;
	/**
	 * Determines whether the test should be included in Ophan reporting. This function
	 * will be evaluated on the client before the Ophan network request is made.
	 *
	 * For example, you could use this if you have a server-side test and would like to exclude certain
	 * pageviews from reporting based on client-side information, such as users with smaller screens.
	 *
	 * @example: shouldReportToOphan: () => window.innerWidth >= 1300
	 *
	 * On by default: if not provided, the test will report to Ophan as usual.
	 */
	shouldReportToOphan?: () => boolean;
};

export type { ABTest, FastlyTestParams, AudienceSpace, AllSpace };
