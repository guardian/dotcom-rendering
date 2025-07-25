import { assertEquals, assertThrows } from 'jsr:@std/assert@^1.0.13';
import { TestGroupMVTManager } from './test-group-mvt-manager.ts';
import { AudienceSpace } from '../lib/types.ts';

// Helper function to create mock AudienceSpace
function createMockAudienceSpace(
	testGroups: Record<string, number[]>,
): AudienceSpace {
	const audienceSpace = new Map<
		string,
		{ name: string; type: string; exp: number }
	>();

	for (const [groupName, mvts] of Object.entries(testGroups)) {
		mvts.forEach((mvt) => {
			audienceSpace.set(`testGroup:${mvt}`, {
				name: groupName,
				type: 'server',
				exp: Date.now() + 86400000, // 24 hours from now
			});
		});
	}

	return audienceSpace;
}

Deno.test(
	'TestGroupMVTManager - constructor initializes with empty audience space',
	() => {
		const emptyAudienceSpace = new Map<
			string,
			{ name: string; type: string; exp: number }
		>();
		const manager = new TestGroupMVTManager(emptyAudienceSpace);

		assertEquals(manager.testGroups.size, 0);
	},
);

Deno.test(
	'TestGroupMVTManager - constructor initializes with existing test groups',
	() => {
		const existingGroups = {
			'test1:control': [0, 1, 2],
			'test1:variant': [3, 4, 5],
			'test2:control': [6, 7],
		};
		const audienceSpace = createMockAudienceSpace(existingGroups);
		const manager = new TestGroupMVTManager(audienceSpace);

		assertEquals(manager.testGroups.size, 3);
		assertEquals(manager.getTestGroup('test1:control'), [0, 1, 2]);
		assertEquals(manager.getTestGroup('test1:variant'), [3, 4, 5]);
		assertEquals(manager.getTestGroup('test2:control'), [6, 7]);
	},
);

Deno.test(
	'TestGroupMVTManager - getTestGroup returns undefined for non-existent group',
	() => {
		const emptyAudienceSpace = new Map<
			string,
			{ name: string; type: string; exp: number }
		>();
		const manager = new TestGroupMVTManager(emptyAudienceSpace);

		assertEquals(manager.getTestGroup('non-existent'), undefined);
	},
);

Deno.test(
	'TestGroupMVTManager - addTestGroup successfully adds new test group',
	() => {
		const emptyAudienceSpace = new Map<
			string,
			{ name: string; type: string; exp: number }
		>();
		const manager = new TestGroupMVTManager(emptyAudienceSpace);

		manager.addTestGroup('test1:control', 3);

		const testGroup = manager.getTestGroup('test1:control');
		assertEquals(testGroup?.length, 3);
		// MVTs should be allocated from the lowest available (0, 1, 2)
		assertEquals(testGroup, [0, 1, 2]);
	},
);

Deno.test(
	'TestGroupMVTManager - addTestGroup throws error when test group already exists',
	() => {
		const existingGroups = {
			'test1:control': [0, 1, 2],
		};
		const audienceSpace = createMockAudienceSpace(existingGroups);
		const manager = new TestGroupMVTManager(audienceSpace);

		assertThrows(
			() => manager.addTestGroup('test1:control', 2),
			Error,
			'Test test1:control already exists',
		);
	},
);

Deno.test(
	'TestGroupMVTManager - addTestGroup throws error when not enough available MVTs',
	() => {
		// Create a manager with all MVTs occupied except 2
		const existingGroups = {
			'test1:control': Array.from({ length: 998 }, (_, i) => i),
		};
		const audienceSpace = createMockAudienceSpace(existingGroups);
		const manager = new TestGroupMVTManager(audienceSpace);

		assertThrows(
			() => manager.addTestGroup('test2:control', 5),
			Error,
			'Not enough available MVTs for test test2:control',
		);
	},
);

Deno.test('TestGroupMVTManager - resizeTestGroup increases group size', () => {
	const existingGroups = {
		'test1:control': [0, 1, 2],
	};
	const audienceSpace = createMockAudienceSpace(existingGroups);
	const manager = new TestGroupMVTManager(audienceSpace);

	manager.resizeTestGroup('test1:control', 5);

	const testGroup = manager.getTestGroup('test1:control');
	assertEquals(testGroup?.length, 5);
	// Should keep original MVTs and add new ones from available pool
	assertEquals(testGroup?.slice(0, 3), [0, 1, 2]);
});

Deno.test('TestGroupMVTManager - resizeTestGroup decreases group size', () => {
	const existingGroups = {
		'test1:control': [0, 1, 2, 3, 4],
	};
	const audienceSpace = createMockAudienceSpace(existingGroups);
	const manager = new TestGroupMVTManager(audienceSpace);

	manager.resizeTestGroup('test1:control', 3);

	const testGroup = manager.getTestGroup('test1:control');
	assertEquals(testGroup?.length, 3);
	assertEquals(testGroup, [0, 1, 2]);
});

Deno.test(
	'TestGroupMVTManager - resizeTestGroup with same size does nothing',
	() => {
		const existingGroups = {
			'test1:control': [0, 1, 2],
		};
		const audienceSpace = createMockAudienceSpace(existingGroups);
		const manager = new TestGroupMVTManager(audienceSpace);

		manager.resizeTestGroup('test1:control', 3);

		const testGroup = manager.getTestGroup('test1:control');
		assertEquals(testGroup?.length, 3);
		assertEquals(testGroup, [0, 1, 2]);
	},
);

Deno.test(
	'TestGroupMVTManager - resizeTestGroup throws error for non-existent group',
	() => {
		const emptyAudienceSpace = new Map<
			string,
			{ name: string; type: string; exp: number }
		>();
		const manager = new TestGroupMVTManager(emptyAudienceSpace);

		assertThrows(
			() => manager.resizeTestGroup('non-existent', 5),
			Error,
			'Test non-existent does not exist',
		);
	},
);

Deno.test(
	'TestGroupMVTManager - resizeTestGroup throws error when not enough available MVTs',
	() => {
		const existingGroups = {
			'test1:control': [0, 1, 2],
			'test2:control': Array.from({ length: 995 }, (_, i) => i + 3), // Occupy most MVTs
		};
		const audienceSpace = createMockAudienceSpace(existingGroups);
		const manager = new TestGroupMVTManager(audienceSpace);

		assertThrows(
			() => manager.resizeTestGroup('test1:control', 10),
			Error,
			'Not enough available MVTs for test test1:control',
		);
	},
);

Deno.test(
	'TestGroupMVTManager - deleteTestGroup removes group and frees MVTs',
	() => {
		const existingGroups = {
			'test1:control': [0, 1, 2],
			'test2:control': [3, 4, 5],
		};
		const audienceSpace = createMockAudienceSpace(existingGroups);
		const manager = new TestGroupMVTManager(audienceSpace);

		manager.deleteTestGroup('test1:control');

		assertEquals(manager.getTestGroup('test1:control'), undefined);
		assertEquals(manager.testGroups.size, 1);

		// Should be able to create a new group with the freed MVTs
		manager.addTestGroup('test3:control', 3);
		const newTestGroup = manager.getTestGroup('test3:control');
		assertEquals(newTestGroup?.length, 3);
	},
);

Deno.test(
	'TestGroupMVTManager - deleteTestGroup handles non-existent group gracefully',
	() => {
		const emptyAudienceSpace = new Map<
			string,
			{ name: string; type: string; exp: number }
		>();
		const manager = new TestGroupMVTManager(emptyAudienceSpace);

		// Should not throw an error
		manager.deleteTestGroup('non-existent');
		assertEquals(manager.testGroups.size, 0);
	},
);

Deno.test(
	'TestGroupMVTManager - complex scenario with multiple operations',
	() => {
		const existingGroups = {
			'test1:control': [0, 1, 2],
			'test1:variant': [3, 4, 5],
		};
		const audienceSpace = createMockAudienceSpace(existingGroups);
		const manager = new TestGroupMVTManager(audienceSpace);

		// Add a new test group
		manager.addTestGroup('test2:control', 4);
		assertEquals(manager.getTestGroup('test2:control')?.length, 4);

		// Resize an existing group
		manager.resizeTestGroup('test1:control', 5);
		assertEquals(manager.getTestGroup('test1:control')?.length, 5);

		// Delete a group
		manager.deleteTestGroup('test1:variant');
		assertEquals(manager.getTestGroup('test1:variant'), undefined);

		// Add another group using freed MVTs
		manager.addTestGroup('test3:control', 2);
		assertEquals(manager.getTestGroup('test3:control')?.length, 2);

		// Verify final state
		assertEquals(manager.testGroups.size, 3);
	},
);

Deno.test(
	'TestGroupMVTManager - MVT allocation preserves low-to-high order',
	() => {
		const emptyAudienceSpace = new Map<
			string,
			{ name: string; type: string; exp: number }
		>();
		const manager = new TestGroupMVTManager(emptyAudienceSpace);

		// Add first group - should get lowest MVTs
		manager.addTestGroup('test1:control', 3);
		const group1 = manager.getTestGroup('test1:control');
		assertEquals(group1, [0, 1, 2]);

		// Add second group - should get next lowest MVTs
		manager.addTestGroup('test2:control', 2);
		const group2 = manager.getTestGroup('test2:control');
		assertEquals(group2, [3, 4]);
	},
);

Deno.test(
	'TestGroupMVTManager - handles MVT parsing from key correctly',
	() => {
		// Test with different key formats that might exist
		const audienceSpace = new Map<
			string,
			{ name: string; type: string; exp: number }
		>();
		audienceSpace.set('testGroup:123', {
			name: 'test1:control',
			type: 'server',
			exp: Date.now() + 86400000,
		});
		audienceSpace.set('testGroup:456', {
			name: 'test1:control',
			type: 'server',
			exp: Date.now() + 86400000,
		});

		const manager = new TestGroupMVTManager(audienceSpace);

		assertEquals(manager.testGroups.size, 1);
		const testGroup = manager.getTestGroup('test1:control');
		assertEquals(testGroup?.length, 2);
		assertEquals(testGroup?.includes(123), true);
		assertEquals(testGroup?.includes(456), true);
	},
);

Deno.test('TestGroupMVTManager - addTestGroup with size 0', () => {
	const emptyAudienceSpace = new Map<
		string,
		{ name: string; type: string; exp: number }
	>();
	const manager = new TestGroupMVTManager(emptyAudienceSpace);

	manager.addTestGroup('test1:control', 0);

	const testGroup = manager.getTestGroup('test1:control');
	assertEquals(testGroup?.length, 0);
	assertEquals(testGroup, []);
});

Deno.test('TestGroupMVTManager - resizeTestGroup to size 0', () => {
	const existingGroups = {
		'test1:control': [0, 1, 2],
	};
	const audienceSpace = createMockAudienceSpace(existingGroups);
	const manager = new TestGroupMVTManager(audienceSpace);

	manager.resizeTestGroup('test1:control', 0);

	const testGroup = manager.getTestGroup('test1:control');
	assertEquals(testGroup?.length, 0);
	assertEquals(testGroup, []);
});

Deno.test(
	'TestGroupMVTManager - available MVTs maintain sorted order after operations',
	() => {
		const existingGroups = {
			'test1:control': [500, 600, 700],
		};
		const audienceSpace = createMockAudienceSpace(existingGroups);
		const manager = new TestGroupMVTManager(audienceSpace);

		// Delete the group to free MVTs
		manager.deleteTestGroup('test1:control');

		// Add a new group - should still get lowest available MVTs
		manager.addTestGroup('test2:control', 2);
		const testGroup = manager.getTestGroup('test2:control');
		assertEquals(testGroup, [0, 1]);
	},
);

Deno.test('TestGroupMVTManager - stress test with maximum MVTs', () => {
	const emptyAudienceSpace = new Map<
		string,
		{ name: string; type: string; exp: number }
	>();
	const manager = new TestGroupMVTManager(emptyAudienceSpace);

	// Add a group that uses all available MVTs
	manager.addTestGroup('test1:control', 1000);

	const testGroup = manager.getTestGroup('test1:control');
	assertEquals(testGroup?.length, 1000);

	// Should not be able to add another group
	assertThrows(
		() => manager.addTestGroup('test2:control', 1),
		Error,
		'Not enough available MVTs for test test2:control',
	);
});

Deno.test(
	'TestGroupMVTManager - constructor with invalid MVT key format',
	() => {
		const audienceSpace = new Map<
			string,
			{ name: string; type: string; exp: number }
		>();
		audienceSpace.set('invalidKey', {
			name: 'test1:control',
			type: 'server',
			exp: Date.now() + 86400000,
		});
		audienceSpace.set('testGroup:notANumber', {
			name: 'test1:control',
			type: 'server',
			exp: Date.now() + 86400000,
		});
		audienceSpace.set('testGroup:123', {
			name: 'test1:control',
			type: 'server',
			exp: Date.now() + 86400000,
		});

		// Constructor should handle invalid keys gracefully
		const manager = new TestGroupMVTManager(audienceSpace);

		// The group should exist but only with valid MVTs
		const testGroup = manager.getTestGroup('test1:control');
		assertEquals(testGroup !== undefined, true);
		assertEquals(testGroup?.length, 1);
		assertEquals(testGroup, [123]);
		// No NaN values should be present
		assertEquals(testGroup?.some((mvt) => Number.isNaN(mvt)), false);
	},
);
