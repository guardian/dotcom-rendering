import { assertEquals, assertThrows } from 'jsr:@std/assert';
import { testSpaceToMVTs, abTestsToMVTs } from './build-mvt-dict.ts';
import { ABTest } from '../../types.ts';

// Mock ABTest objects for testing
const createTest = (
	name: string,
	audienceSize: number,
	groups = ['control'],
	audienceOffset: number = 0,
	audienceSpace: 'A' | 'B' = 'A',
) =>
	({
		name,
		audienceSize,
		groups,
		audienceOffset,
		audienceSpace,
		type: 'client',
		expirationDate: new Date('2050-12-30'),
	}) as unknown as ABTest;

Deno.test('testSpaceToMVTs - empty array', () => {
	const result = testSpaceToMVTs([]);
	assertEquals(result, {});
});

Deno.test('testSpaceToMVTs - single test with one group', () => {
	const test = createTest('Test1', 0.1, ['variant']);
	const result = testSpaceToMVTs([test]);

	// Size 0.1 should create 100 entries (0.1 * 1000)
	assertEquals(Object.keys(result).length, 100);
	assertEquals(result[`mvt:0`], {
		name: 'Test1:variant',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result[`mvt:99`], {
		name: 'Test1:variant',
		exp: 2555971200,
		type: 'client',
	});
});

Deno.test('testSpaceToMVTs - single test with multiple groups', () => {
	const test = createTest('Test1', 0.5, ['control', 'variant']); // 2 groups
	const result = testSpaceToMVTs([test]);

	// Should have 500 entries
	assertEquals(Object.keys(result).length, 500);
	assertEquals(result['mvt:0'], {
		name: 'Test1:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:249'], {
		name: 'Test1:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:250'], {
		name: 'Test1:variant',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:499'], {
		name: 'Test1:variant',
		exp: 2555971200,
		type: 'client',
	});
});

Deno.test('testSpaceToMVTs - multiple tests', () => {
	const test1 = createTest('Test1', 0.2, ['control', 'variant']);
	const test2 = createTest('Test2', 0.2, ['control', 'variant'], 0.2);

	const result = testSpaceToMVTs([test1, test2]);

	// Should have 200 + 200 = 400 entries
	assertEquals(Object.keys(result).length, 400);
	assertEquals(result['mvt:0'], {
		name: 'Test1:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:99'], {
		name: 'Test1:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:100'], {
		name: 'Test1:variant',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:199'], {
		name: 'Test1:variant',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:200'], {
		name: 'Test2:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:299'], {
		name: 'Test2:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:300'], {
		name: 'Test2:variant',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:399'], {
		name: 'Test2:variant',
		exp: 2555971200,
		type: 'client',
	});
});

Deno.test('abTestsToMVTs - empty array', () => {
	const result = abTestsToMVTs([]);
	assertEquals(result, {});
});

Deno.test('abTestsToMVTs - only normal tests', () => {
	const test = createTest('Test1', 0.001, ['control']); // 1 entry

	const result = abTestsToMVTs([test]);

	assertEquals(Object.keys(result).length, 1);
	assertEquals(result['mvt:0'][0], {
		name: 'Test1:control',
		exp: 2555971200,
		type: 'client',
	});
});

Deno.test('abTestsToMVTs - overlapping tests added to existing slots', () => {
	// Create 1000 normal test entries to fill all slots
	const normalTest = createTest('Normal', 1, ['control']); // 1000 entries

	// Create overlapping test, the entries should be added to the first slots
	const overlapTest = createTest('Overlap', 1, ['variant'], 0, 'B'); // 1000 entries

	const result = abTestsToMVTs([normalTest, overlapTest]);

	// First slot should now have 2 entries
	assertEquals(result['mvt:0'].length, 2);
	assertEquals(result['mvt:0'][0], {
		name: 'Normal:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:0'][1], {
		name: 'Overlap:variant',
		exp: 2555971200,
		type: 'client',
	});

	// Second slot should also have 2 entries
	assertEquals(result['mvt:1'].length, 2);
	assertEquals(result['mvt:1'][0], {
		name: 'Normal:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:1'][1], {
		name: 'Overlap:variant',
		exp: 2555971200,
		type: 'client',
	});

	assertEquals(result['mvt:999'].length, 2);
	assertEquals(result['mvt:999'][0], {
		name: 'Normal:control',
		exp: 2555971200,
		type: 'client',
	});
	assertEquals(result['mvt:999'][1], {
		name: 'Overlap:variant',
		exp: 2555971200,
		type: 'client',
	});
});

Deno.test('abTestsToMVTs - throw error when exceeding capacity', () => {
	// Create 1000 normal test entries
	const normalTest = createTest('Normal', 1, ['control']); // 1000 entries

	// Create 1001 secondary test entries (exceeds 1000)
	const overlapTest1 = createTest('Overlap1', 1, ['variant1'], 0, 'B');
	const overlapTest2 = createTest('Overlap2', 0.001, ['variant2'], 1, 'B');

	// We expect an error when all mvt slots have 2 groups
	assertThrows(
		() => {
			abTestsToMVTs([normalTest, overlapTest1, overlapTest2]);
		},
		Error,
		'Test space 1 test sizes add up to > 100%.',
	);
});
