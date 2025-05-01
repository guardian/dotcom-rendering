import { assertEquals, assertThrows } from 'jsr:@std/assert';
import { testsToArray, abTestsToMVTs } from './mvts.ts';
import { ABTest } from '../../types.ts';

// Mock ABTest objects for testing
const createTest = (
	name: string,
	allowOverlap = false,
	groups = [{ id: 'control', size: 0.5 }],
) =>
	({
		name,
		allowOverlap,
		groups,
	}) as unknown as ABTest;

Deno.test('testsToArray - empty array', () => {
	const result = testsToArray([]);
	assertEquals(result, []);
});

Deno.test('testsToArray - single test with one group', () => {
	const test = createTest('Test1', false, [{ id: 'variant', size: 0.1 }]);
	const result = testsToArray([test]);

	// Size 0.1 should create 100 entries (0.1 * 1000)
	assertEquals(result.length, 100);
	assertEquals(result[0], 'Test1:variant');
	assertEquals(result[99], 'Test1:variant');
});

Deno.test('testsToArray - single test with multiple groups', () => {
	const test = createTest('Test1', false, [
		{ id: 'control', size: 0.5 },
		{ id: 'variant', size: 0.2 },
	]);
	const result = testsToArray([test]);

	// Should have 500 + 200 = 700 entries
	assertEquals(result.length, 700);
	assertEquals(result[0], 'Test1:control');
	assertEquals(result[499], 'Test1:control');
	assertEquals(result[500], 'Test1:variant');
	assertEquals(result[699], 'Test1:variant');
});

Deno.test('testsToArray - multiple tests', () => {
	const test1 = createTest('Test1', false, [{ id: 'control', size: 0.3 }]);
	const test2 = createTest('Test2', true, [{ id: 'variant', size: 0.2 }]);

	const result = testsToArray([test1, test2]);

	// Should have 300 + 200 = 500 entries
	assertEquals(result.length, 500);
	assertEquals(result[0], 'Test1:control');
	assertEquals(result[299], 'Test1:control');
	assertEquals(result[300], 'Test2:variant');
	assertEquals(result[499], 'Test2:variant');
});

Deno.test('abTestsToMVTs - empty array', () => {
	const result = abTestsToMVTs([]);
	assertEquals(result, {});
});

Deno.test('abTestsToMVTs - only normal tests', () => {
	const test = createTest('Test1', false, [{ id: 'control', size: 0.001 }]); // 1 entry

	const result = abTestsToMVTs([test]);

	assertEquals(Object.keys(result).length, 1);
	assertEquals(result['mvt:0'], ['Test1:control']);
});

Deno.test('abTestsToMVTs - only overlapping tests', () => {
	const test = createTest('Test1', true, [{ id: 'variant', size: 0.001 }]); // 1 entry

	const result = abTestsToMVTs([test]);

	assertEquals(Object.keys(result).length, 1);
	assertEquals(result['mvt:0'], ['Test1:variant']);
});

Deno.test('abTestsToMVTs - normal and overlapping tests', () => {
	const normalTest = createTest('Normal', false, [
		{ id: 'control', size: 0.001 },
	]); // 1 entry
	const overlapTest = createTest('Overlap', true, [
		{ id: 'variant', size: 0.001 },
	]); // 1 entry

	const result = abTestsToMVTs([normalTest, overlapTest]);

	assertEquals(Object.keys(result).length, 2);
	assertEquals(result['mvt:0'], ['Normal:control']);
	assertEquals(result['mvt:1'], ['Overlap:variant']);
});

Deno.test('abTestsToMVTs - overlapping tests added to existing slots', () => {
	// Create 1000 normal test entries to fill all slots
	const normalTest = createTest('Normal', false, [
		{ id: 'control', size: 1 },
	]); // 1000 entries

	// Create 2 overlapping test entries, these should be added to the first slots
	const overlapTest = createTest('Overlap', true, [
		{ id: 'variant', size: 0.002 },
	]); // 2 entries

	const result = abTestsToMVTs([normalTest, overlapTest]);

	// First slot should now have 2 entries
	assertEquals(result['mvt:0'].length, 2);
	assertEquals(result['mvt:0'][0], 'Normal:control');
	assertEquals(result['mvt:0'][1], 'Overlap:variant');

	// Second slot should also have 2 entries
	assertEquals(result['mvt:1'].length, 2);
	assertEquals(result['mvt:1'][0], 'Normal:control');
	assertEquals(result['mvt:1'][1], 'Overlap:variant');
	// Remaining slots should have 1 entry
	assertEquals(result['mvt:2'].length, 1);
	assertEquals(result['mvt:2'][0], 'Normal:control');

	assertEquals(result['mvt:999'].length, 1);
	assertEquals(result['mvt:999'][0], 'Normal:control');
});

Deno.test('abTestsToMVTs - throw error when exceeding capacity', () => {
	// Create 1000 normal test entries
	const normalTest = createTest('Normal', false, [
		{ id: 'control', size: 1 },
	]);

	// Create 1001 overlapping test entries (exceeds 1000 * 2 = 2000)
	const overlapTest1 = createTest('Overlap1', true, [
		{ id: 'variant', size: 1 },
	]); // 1000 entries
	const overlapTest2 = createTest('Overlap2', true, [
		{ id: 'variant2', size: 0.001 },
	]); // 1 entry for MAX_GROUPS_PER_MVT overflow

	// We expect an error when all mvt slots have 2 groups
	assertThrows(
		() => {
			abTestsToMVTs([normalTest, overlapTest1, overlapTest2]);
		},
		Error,
		'Overlapping MVT groups exceed the maximum size of 1000',
	);
});
