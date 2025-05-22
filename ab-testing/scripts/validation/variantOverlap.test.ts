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
		audienceSize: 100 / 100,
		groups: ['control', 'variant'],
	};

	assertThrows(() => noVariantOverlap([overlapTest, overlapTest]));
});

Deno.test('noVariantOverlap - disallows partial overlap', () => {
	const overlapTest1: ABTest = {
		name: 'commercial-big-overlap',
		description: 'Overlap the variants',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date(),
		type: 'client',
		highImpact: false,
		audienceSize: 50 / 100,
		groups: ['control', 'variant'],
	};

	const overlapTest2: ABTest = {
		name: 'commercial-big-overlap',
		description: 'Overlap the variants',
		owners: ['commercial.dev@guardian.co.uk'],
		status: 'ON',
		expirationDate: new Date(),
		type: 'client',
		highImpact: false,
		audienceSize: 50 / 100,
		audienceOffset: 0.25,
		groups: ['control', 'variant'],
	};
	assertThrows(() => noVariantOverlap([overlapTest1, overlapTest2]));
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
			audienceSize: 100 / 100,
			groups: ['control', 'variant'],
			audienceSpace: 'B',
		};

		const secondaryTest: ABTest = {
			name: 'commercial-big-overlap',
			description: 'Overlap the variants',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: new Date(),
			type: 'client',
			highImpact: false,
			audienceSize: 100 / 100,
			groups: ['control', 'variant'],
		};

		assertEquals(noVariantOverlap([primaryTest, secondaryTest]), true);
	},
);
