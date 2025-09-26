import { assertEquals, assertThrows } from 'jsr:@std/assert';
import { ABTest } from '../../types.ts';
import { uniqueName } from './uniqueName.ts';

function createTestABTest(name: ABTest['name']): ABTest {
	return {
		name,
		description: 'A test description',
		owners: ['test@guardian.co.uk'],
		status: 'ON',
		expirationDate: '2025-12-31',
		type: 'client',
		audienceSize: 10 / 100,
		groups: ['control', 'variant'],
	};
}

Deno.test('uniqueName - passes when all test names are unique', () => {
	const tests: ABTest[] = [
		createTestABTest('commercial-test-one'),
		createTestABTest('commercial-test-two'),
		createTestABTest('webex-test-three'),
	];

	assertEquals(uniqueName(tests), true);
});

Deno.test('uniqueName - passes with empty array', () => {
	const tests: ABTest[] = [];

	assertEquals(uniqueName(tests), true);
});

Deno.test('uniqueName - passes with single test', () => {
	const tests: ABTest[] = [createTestABTest('commercial-single-test')];

	assertEquals(uniqueName(tests), true);
});

Deno.test('uniqueName - throws when duplicate names exist', () => {
	const tests: ABTest[] = [
		createTestABTest('commercial-duplicate-test'),
		createTestABTest('commercial-unique-test'),
		createTestABTest('commercial-duplicate-test'), // Duplicate name
	];

	assertThrows(
		() => uniqueName(tests),
		Error,
		'Duplicate test name found: commercial-duplicate-test',
	);
});
