/**
 * @file
 * Test that impossible prop combinations are caught by TypeScript.
 *
 * What we're really testing is that this file compiles.
 *
 * The tests themselves are not really testing anything, but because it's a
 * *.test.tsx, Jest will run it.
 *
 * The test are just there to stop Jest blowing up when it gets the compiled version.
 */

import { Island } from './Island';

const Mock = () => <>🏝️</>;

() => (
	<Island>
		<Mock />
	</Island>
);

() => (
	<Island defer={{ until: 'interaction' }}>
		<Mock />
	</Island>
);

() => (
	// @ts-expect-error -- until interaction must have
	// server-rendered fallback
	<Island defer={{ until: 'interaction' }} clientOnly={true}>
		<Mock />
	</Island>
);

// this is just to stop Jest complaining about no tests
test('this is not a real test, ignore it, it tells you nothing useful 💃', () =>
	undefined);
