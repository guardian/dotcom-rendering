import React from 'react';
import sha256 from 'crypto-js/sha256';
import { isString } from '@guardian/libs';

export enum TestGroup {
	A = 0,
	B = 1,
	C = 2,
	D = 3,
}

// Compute the total number of groups from the enum above
// Note we have to filter out numbers due to the transpiled implementation of enums with numeric values
const NUM_GROUPS = Object.values(TestGroup).filter(isString).length;

interface TestContext {
	group: TestGroup;
}

/**
 * Compute which test group to place the current page in
 *
 * @param shortUrlId The data that is used to assign a certain piece of content into a bucket
 * @returns The test group the content is placed in
 */
const getGroup = (shortUrlId: string): TestGroup => {
	const hashedShortUrlId = sha256(shortUrlId).words[0];

	const group = Math.abs(hashedShortUrlId) % NUM_GROUPS;

	if (group in TestGroup) {
		switch (group) {
			case 0: {
				return TestGroup.A;
			}
			case 1: {
				return TestGroup.B;
			}
			case 2: {
				return TestGroup.C;
			}
			case 3: {
				return TestGroup.D;
			}
		}
	}

	// This should be unreachable
	// Report and throw an error if it isn't
	const error = new Error('Failed to put AMP content into bucket');
	window.guardian.modules.sentry.reportError(error, 'commercial');
	throw error;
};

const Context = React.createContext<TestContext | undefined>(undefined);

export const TestProvider = ({
	shortUrlId,
	children,
}: {
	shortUrlId: string;
	children: React.ReactNode;
}) => {
	const group = getGroup(shortUrlId);
	return <Context.Provider value={{ group }}>{children}</Context.Provider>;
};

/**
 * Obtain the current test group
 *
 * @example
 * const { group } = useTestGroup();
 *
 *	switch(group) {
 *    case (TestGroup.A) {
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
