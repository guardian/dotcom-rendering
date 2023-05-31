import type { ServerSideTests } from '../../../types/config';
import { abTestPayload } from './ophan';

describe('abTestPayload', () => {
	test('constructs payload correctly from config test data', () => {
		const tests: ServerSideTests = {
			MyTestVariant: 'variant',
		};

		const actual = abTestPayload(tests);
		const expected = {
			abTestRegister: {
				abMyTestVariant: { variantName: 'variant', complete: false },
			},
		};

		expect(actual).toEqual(expected);
	});
});
