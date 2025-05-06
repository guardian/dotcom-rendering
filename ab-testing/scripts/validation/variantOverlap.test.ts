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
		size: 100 / 100,
		groups: ['control', 'variant'],
	};

	assertThrows(() => noVariantOverlap([overlapTest, overlapTest]));
});

Deno.test(
	'noVariantOverlap - allows variant overlap with secondary test space',
	() => {
		const primaryTest: ABTest = {
			name: 'commercial-big-overlap',
			description: 'Overlap the variants',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: new Date(),
			type: 'client',
			highImpact: false,
			size: 100 / 100,
			groups: ['control', 'variant'],
			testSpace: 'secondary',
		};

		const secondaryTest: ABTest = {
			name: 'commercial-big-overlap',
			description: 'Overlap the variants',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: new Date(),
			type: 'client',
			highImpact: false,
			size: 100 / 100,
			groups: ['control', 'variant'],
			testSpace: 'primary',
		};

		assertEquals(noVariantOverlap([primaryTest, secondaryTest]), true);
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
		size: 10 / 100,
		groups: ['control', 'variant'],
	};

	assertEquals(noVariantOverlap([overlapTest, overlapTest]), true);
});
