import { formatAudioDuration } from './ListenToArticle.importable';

describe('format Audio Duration correctly', () => {
	const testCases = [
		{ input: -60, expected: '00:00' },
		{ input: 0, expected: '00:00' },
		{ input: 1, expected: '00:01' },
		{ input: 59, expected: '00:59' },
		{ input: 60, expected: '01:00' },
		{ input: 61, expected: '01:01' },
		{ input: 3599, expected: '59:59' },
		{ input: 3600, expected: '01:00:00' },
		{ input: 3601, expected: '01:00:01' },
		{ input: 3661, expected: '01:01:01' },
		{ input: 21601, expected: '' }, // Don't show very large duration that exceed 3 hours
	];

	for (const { input, expected } of testCases) {
		it(`correctly formats ${input} as ${expected}`, () => {
			expect(formatAudioDuration(input)).toEqual(expected);
		});
	}
});
