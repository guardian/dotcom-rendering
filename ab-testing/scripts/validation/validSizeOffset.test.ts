import { assertThrows, assertEquals } from 'jsr:@std/assert';
import { ABTest } from '../../types.ts';
import { validSizeOffset } from './validSizeOffset.ts';

const baseTest: ABTest = {
	name: 'commercial-future',
	description: 'End on a weekday',
	owners: ['commercial.dev@guardian.co.uk'],
	status: 'ON',
	expirationDate: new Date(),
	type: 'client',
	highImpact: false,
	audienceSize: 10 / 100,
	groups: ['control', 'variant'],
};
Deno.test(
	'validSizeOffset - passes when audienceSize is between 0 and 1',
	() => {
		const test: ABTest = {
			...baseTest,
			audienceSize: 0.5,
		};

		assertEquals(validSizeOffset([test]), true);
	},
);

Deno.test('validSizeOffset - throws when audienceSize is less than 0', () => {
	const test: ABTest = {
		...baseTest,
		audienceSize: -0.1,
	};

	assertThrows(
		() => validSizeOffset([test]),
		Error,
		`Invalid audienceSize for test ${test.name}`,
	);
});

Deno.test(
	'validSizeOffset - throws when audienceSize is greater than 1',
	() => {
		const test: ABTest = {
			...baseTest,
			audienceSize: 1.1,
		};

		assertThrows(
			() => validSizeOffset([test]),
			Error,
			`Invalid audienceSize for test ${test.name}`,
		);
	},
);
