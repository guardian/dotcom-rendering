import { calculateNumAdsThatFit } from './LiveblogRightMultipleAdSlots.importable';

/**
 	Right ad height = 1059px
	Liveblog ad container height = 1400px
	White space between ads = 900px

	The top of the highest liveblog ad that can be inserted is 1959px from the top of the right column.
	The height of a liveblog ad container is 1400px.
	The padding-bottom on the right column of 36px.

	The minimum height required to insert one liveblog ad is 1959 + 1400 + 36 = 3395px.
	The minimum height required to insert two liveblog ads is 3395 + 1400 + 900 = 5695px.
 */

describe(`LiveblogRightMultipleAdSlots`, () => {
	describe(`calculateNumAdsThatFit`, () => {
		const cases = [
			[3394, 0],
			[3395, 1],
			[5694, 1],
			[5695, 2],
		];
		test.each(cases)(
			`inserts the correct number of ads`,
			(rightColHeight, expectedAds) => {
				const result = calculateNumAdsThatFit(rightColHeight);
				expect(result).toEqual(expectedAds);
			},
		);
	});
});
