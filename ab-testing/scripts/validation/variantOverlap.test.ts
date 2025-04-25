import { assertEquals, assertThrows } from 'jsr:@std/assert';
import { noVariantOverlap } from './variantOverlap.ts';
import { ABTest } from '../../types.ts';

Deno.test('noVariantOverlap - disallows variant overlap', () => {
	const overlapTest: ABTest = {
		name: 'commercial-big-overlap',
		description: 'Overlap the variants',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date(),
		type: 'client',
		highImpact: false,
		groups: [
			{ id: 'control', size: 50 / 100 },
			{ id: 'variant', size: 50 / 100 },
		],
	};

	assertThrows(() => noVariantOverlap([overlapTest, overlapTest]));
});

Deno.test(
	'noVariantOverlap - allows variant overlap with the allowOverlap setting',
	() => {
		const overlapTest: ABTest = {
			name: 'commercial-big-overlap',
			description: 'Overlap the variants',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: new Date(),
			type: 'client',
			highImpact: false,
			groups: [
				{ id: 'control', size: 50 / 100 },
				{ id: 'variant', size: 50 / 100 },
			],
			allowOverlap: true,
		};

		assertEquals(noVariantOverlap([overlapTest, overlapTest]), true);
	},
);

Deno.test('noVariantOverlap - allows tests with no variant overlap', () => {
	const overlapTest: ABTest = {
		name: 'commercial-no-overlap',
		description: 'Do not overlap the variants',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date(),
		type: 'client',
		highImpact: false,
		groups: [
			{ id: 'control', size: 5 / 100 },
			{ id: 'variant', size: 5 / 100 },
		],
	};

	assertEquals(noVariantOverlap([overlapTest, overlapTest]), true);
});
