import { formatAudioDuration } from './ListenToArticle.importable';

describe('format Audio Duration correctly', () => {
	const testCases = [
		{ input: -60, expected: undefined },
		{ input: 0, expected: undefined },
		{ input: 1, expected: '0:01' },
		{ input: 59, expected: '0:59' },
		{ input: 60, expected: '1:00' },
		{ input: 61, expected: '1:01' },
		{ input: 3599, expected: '59:59' },
		{ input: 3600, expected: undefined },
	];

	for (const { input, expected } of testCases) {
		it(`correctly formats ${input} as ${expected}`, () => {
			expect(formatAudioDuration(input)).toEqual(expected);
		});
	}
});
