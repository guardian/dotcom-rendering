import { getTemplateAreas } from './Grid';

describe('getTemplateAreas returns correct grid-template-areas ', () => {
	test('for 2 slices: [50%, 25%, 25%], [25%, 25%, 25%, 25%]', () => {
		const percentages: CardPercentageType[][] = [
			['50%', '25%', '25%'],
			['25%', '25%', '25%', '25%'],
		];
		const expected = ['1 1 2 3', '4 5 6 7'];
		expect(getTemplateAreas(percentages)).toStrictEqual(expected);
	});
	test('for 2 slices: [50%, 50%], [25%, 75%]', () => {
		const per2: CardPercentageType[][] = [
			['50%', '50%'],
			['25%', '75%'],
		];
		const expected2 = ['1 1 2 2', '3 4 4 4'];
		expect(getTemplateAreas(per2)).toStrictEqual(expected2);
	});
	test('for 3 slices: [100%], [25%, 25%, 50%], [75%, 25%]', () => {
		const per3: CardPercentageType[][] = [
			['100%'],
			['25%', '25%', '50%'],
			['75%', '25%'],
		];
		const expected3 = ['1 1 1 1', '2 3 4 4', '5 5 5 6'];
		expect(getTemplateAreas(per3)).toStrictEqual(expected3);
	});

	test('for 3 slices: [66.666%, 33.333%], [33.333%, 66.666%], [25%, 25%, 50%]', () => {
		const per4: CardPercentageType[][] = [
			['66.666%', '33.333%'],
			['33.333%', '66.666%'],
			['25%', '25%', '50%'],
		];
		const expected4 = ['1 1 2', '3 4 4', '5 6 7 7'];

		expect(getTemplateAreas(per4)).toStrictEqual(expected4);
	});
});
