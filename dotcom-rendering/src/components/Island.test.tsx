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
	<Island priority="critical">
		<Mock />
	</Island>
);

() => (
	<Island priority="critical" defer={{ until: 'visible' }}>
		<Mock />
	</Island>
);

() => (
	// @ts-expect-error -- critical island be deferred until idle
	<Island priority="critical" defer={{ until: 'idle' }}>
		<Mock />
	</Island>
);

() => (
	<Island priority="feature" defer={{ until: 'interaction' }}>
		<Mock />
	</Island>
);

() => (
	// @ts-expect-error -- non-critical island must be deferred
	<Island priority="feature">
		<Mock />
	</Island>
);

() => (
	<Island
		priority="enhancement"
		defer={{ until: 'visible' }}
		clientOnly={true}
	>
		<Mock />
	</Island>
);

() => (
	// @ts-expect-error -- until interaction must have server-rendered fallback
	<Island
		priority="enhancement"
		defer={{ until: 'interaction' }}
		clientOnly={true}
	>
		<Mock />
	</Island>
);

// this is just to stop Jest complaining about no tests
test('this is not a real test, ignore it, it tells you nothing useful 💃', () =>
	undefined);
