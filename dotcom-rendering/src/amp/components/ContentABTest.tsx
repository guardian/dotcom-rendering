import React from 'react';
import sha256 from 'crypto-js/sha256';

const NUM_GROUPS = 12;

type TestGroup = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface TestContext {
	group?: TestGroup;
}

const isTestGroup = (n: number): n is TestGroup =>
	n === 0 ||
	n === 1 ||
	n === 2 ||
	n === 3 ||
	n === 4 ||
	n === 5 ||
	n === 6 ||
	n === 7 ||
	n === 8 ||
	n === 9 ||
	n === 10 ||
	n === 11;

/**
 * Compute which test group to place the current page in
 *
 * @param pageId The data that is used to assign a certain piece of content into a bucket
 * @returns The test group the content is placed in
 */
export const getGroup = (pageId: string): TestGroup => {
	const hashedPageId = sha256(`/${pageId}`).words[0];

	const group = Math.abs(hashedPageId) % NUM_GROUPS;

	if (isTestGroup(group)) {
		return group;
	}

	// This should be unreachable
	// Report and throw an error if it isn't
	const error = new Error('Failed to put AMP content into group');
	window.guardian.modules.sentry.reportError(error, 'commercial');
	throw error;
};

const Context = React.createContext<TestContext | undefined>(undefined);

export const TestProvider = ({
	switches,
	pageId,
	children,
}: {
	switches: Switches;
	pageId: string;
	children: React.ReactNode;
}) => {
	const group = getGroup(pageId);
	const providerValue = switches.ampContentABTesting ? { group } : {};
	return (
		<Context.Provider value={providerValue}>{children}</Context.Provider>
	);
};

/**
 * Obtain the current test group
 *
 * @example
 * const { group } = useTestGroup();
 *
 *	switch(group) {
 *    case (0): {
 * 		// ...
 *    }
 *    case (1): {
 * 		// ...
 *    }
 *    // Handle other groups
 *  }
 *
 */
export const useTestGroup = () => {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw Error('useTestGroup must be used within the TestProvider');
	}

	return context;
};
