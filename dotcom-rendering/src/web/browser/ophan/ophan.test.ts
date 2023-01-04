import type { ServerSideTests } from '../../../types/config';
import { abTestPayload } from './ophan';

describe('abTestPayload', () => {
	test('constructs payload correctly from config test data', () => {
		const tests: ServerSideTests = {
			MyTest: 'variant',
		};

		const actual = abTestPayload(tests);
		const expected = {
			abTestRegister: {
				abMyTest: { variantName: 'variant', complete: false },
			},
		};

		expect(actual).toEqual(expected);
	});
});
