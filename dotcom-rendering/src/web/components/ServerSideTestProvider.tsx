import type { PartialStoryFn } from '@storybook/addons/dist/ts3.9/types';
import type { ComponentProps, JSXElementConstructor } from 'react';
import React from 'react';
import type { ServerSideTests } from '../../types/config';

const ServerSideTestContext = React.createContext<
	{ activeServerSideTests: ServerSideTests } | undefined
>(undefined);

export const ServerSideTestProvider = ({
	tests,
	children,
}: {
	tests: ServerSideTests;
	children: React.ReactNode;
}) => (
	<ServerSideTestContext.Provider value={{ activeServerSideTests: tests }}>
		{children}
	</ServerSideTestContext.Provider>
);

/**
 * Get current server side tests
 *
 * @example
 * const { activeServerSideTests } = useServerSideTests();
 *
 * if (activeServerSideTests.myTestName == "variant") {
 * 	//...
 * } else {
 * 	//...
 * }
 *
 */
export const useServerSideTests = () => {
	const context = React.useContext(ServerSideTestContext);

	if (context === undefined) {
		throw Error(
			'useServerSideTests must be used within the ContentABTestProvider',
		);
	}

	return context;
};

/**
 *
 * @param tests
 * @returns A Storybook decorator function which will wrap a story in a <ServerSideTestProvider>
 * 			containing the data passed to the factory in the `tests` parameter.
 * 			This decorator should receive a type parameter corresponding to the top-level
 * 			component in the story.
 *
 * @example
	export default {
		component: MyComponent,
		title: 'Components/MyComponent',
		decorators: [
			mockServerSideTestsProviderFactory({myTest: "control"})<typeof MyComponent>,
		],
	};
 */
export function mockServerSideTestsProviderFactory(tests: ServerSideTests) {
	return function <
		/* eslint-disable @typescript-eslint/no-explicit-any -- Can we narrow this? */
		C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
		/* eslint-enable @typescript-eslint/no-explicit-any */
	>(Story: PartialStoryFn<ComponentProps<C>>) {
		return (
			<ServerSideTestProvider tests={tests}>
				<Story />
			</ServerSideTestProvider>
		);
	};
}
