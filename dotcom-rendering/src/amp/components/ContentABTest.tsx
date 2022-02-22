import React from 'react';

export enum TestGroup {
	A = 0,
	B = 1,
	C = 2,
	D = 3,
}

interface TestContext {
	group: TestGroup;
}

const getGroup = (shortUrlId: string) => {
	console.log(`Using ${shortUrlId} to compute the AMP test group`);
	console.log(`Except for now we'll harcode as Group A`);
	const group = TestGroup.A;
	return group;
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
		throw Error('useTestGroup must be used within the AmpTestProvider');
	}

	return context;
};
