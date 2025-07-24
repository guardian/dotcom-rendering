import { formatAudioDuration } from './ListenToArticle.importable';

describe('format Audio Duration correctly', () => {
	const testCases = [
		{ input: 0, expected: '00:00' },
		{ input: 59, expected: '00:59' },
		{ input: 61, expected: '01:01' },
		{ input: 3600, expected: '01:00:00' },
		{ input: 3661, expected: '01:01:01' },
		{ input: 21601, expected: '' }, // Don't show very large duration that exceed 3 hours
	];

	for (const { input, expected } of testCases) {
		it(`correctly formats ${input} as ${expected}`, () => {
			expect(formatAudioDuration(input)).toEqual(expected);
		});
	}
});
