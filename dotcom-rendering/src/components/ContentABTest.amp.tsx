import sha256 from 'crypto-js/sha256';
import React from 'react';
import { guard } from '../lib/guard';
import { reportErrorToSentry } from '../lib/reportErrorToSentry';
import type { Switches } from '../types/config';

const AB_TEST_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

const NUM_GROUPS = AB_TEST_GROUPS.length;

type ContentABTestGroup = (typeof AB_TEST_GROUPS)[number];

const isContentABTestGroup = guard(AB_TEST_GROUPS);

interface ContentABTestContext {
	group?: ContentABTestGroup;
}

/**
 * Compute which test group to place the current page in
 *
 * @param pageId The data that is used to assign a certain piece of content into a bucket
 * @returns The test group the content is placed in
 */
export const getGroup = (pageId: string): ContentABTestGroup => {
	// Apply a SHA-256 hash to the page ID
	// Add the leading slash as this will be present when we apply the equivalent algorithm at the analysis stage
	const hashedPageId = sha256(`/${pageId}`);
	// Take the last 4 bytes of the hash
	// the sha256 function will always return a hash, even if the input is undefined.
	const [lastFourBytes] = hashedPageId.words.slice(-1);

	// Assign the group by applying mod base 12
	// Mod can return negative values so we apply `Math.abs` to avoid negative groups
	const group = Math.abs(lastFourBytes ?? NaN) % NUM_GROUPS;

	if (isContentABTestGroup(group)) {
		return group;
	}

	// This should be unreachable
	// Report and throw an error if it isn't
	const error = new Error('Failed to put AMP content into group');
	reportErrorToSentry(error, 'commercial');
	throw error;
};

const Context = React.createContext<ContentABTestContext | undefined>(
	undefined,
);

export const ContentABTestProvider = ({
	switches,
	pageId,
	children,
}: {
	switches: Switches;
	pageId: string;
	children: React.ReactNode;
}) => {
	const group = getGroup(pageId);
	// eslint-disable-next-line react/jsx-no-constructed-context-values -- TODO consider using useMemo?
	const providerValue = switches.ampContentAbTesting ? { group } : {};
	return (
		<Context.Provider value={providerValue}>{children}</Context.Provider>
	);
};

/**
 * Obtain the current test group
 *
 * @example
 * const { group } = useContentABTestGroup();
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
export const useContentABTestGroup = () => {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw Error(
			'useContentABTestGroup must be used within the ContentABTestProvider',
		);
	}

	return context;
};
