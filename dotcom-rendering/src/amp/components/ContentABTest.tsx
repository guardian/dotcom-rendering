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
// Note we have to filter out numbers due to the implementation of enums
const NUM_GROUPS = Object.values(TestGroup).filter((x) => isString(x)).length;

interface TestContext {
	group: TestGroup | undefined;
}

export const getGroup = (shortUrlId: string): TestGroup | undefined => {
	const hashedShortUrlId = sha256(shortUrlId).words.reduce(
		(acc, w) => acc + w,
		0,
	);

	// Do we need a BigInt?
	// console.log(
	// 	num,
	// 	hash.words.reduce<bigint>((acc, w) => acc + BigInt(w), 0n),
	// );

	const group = Math.abs(hashedShortUrlId % NUM_GROUPS);

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

	return undefined;
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

export const useTestGroup = () => {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw Error('useTestGroup must be used within the TestProvider');
	}

	return context;
};
