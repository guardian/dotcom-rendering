import { ABTest } from '../../types.ts';

// TODO: This is a placeholder, actual number TBD
export const MAX_SERVER_SIDE_TESTS = 20;

export function limitServerSideTests(tests: ABTest[]) {
	const serverSideTests = tests.filter((test) => test.type === 'server');

	if (serverSideTests.length <= MAX_SERVER_SIDE_TESTS) {
		return true;
	}

	throw new Error('Amount of server-side tests exceeds allowed limit');
}
