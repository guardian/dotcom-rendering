import { getTemplateAreas } from './Grid';

describe('getTemplateAreas returns correct grid-template-areas ', () => {
	test('for 2 slices: [50%, 25%, 25%], [25%, 25%, 25%, 25%]', () => {
		const percentages: CardPercentageType[][] = [
			['50%', '25%', '25%'],
			['25%', '25%', '25%', '25%'],
		];
		const expected = [
			'card-1 card-1 card-2 card-3',
			'card-4 card-5 card-6 card-7',
		];
		expect(getTemplateAreas(percentages)).toStrictEqual(expected);
	});

	test('for 2 slices: [50%, 50%], [25%, 75%]', () => {
		const percentages: CardPercentageType[][] = [
			['50%', '50%'],
			['25%', '75%'],
		];
		const expected = [
			'card-1 card-1 card-2 card-2',
			'card-3 card-4 card-4 card-4',
		];
		expect(getTemplateAreas(percentages)).toStrictEqual(expected);
	});

	test('for 3 slices: [100%], [25%, 25%, 50%], [75%, 25%]', () => {
		const percentages: CardPercentageType[][] = [
			['100%'],
			['25%', '25%', '50%'],
			['75%', '25%'],
		];
		const expected = [
			'card-1 card-1 card-1 card-1',
			'card-2 card-3 card-4 card-4',
			'card-5 card-5 card-5 card-6',
		];
		expect(getTemplateAreas(percentages)).toStrictEqual(expected);
	});

	test('for 3 slices: [66.666%, 33.333%], [33.333%, 66.666%], [25%, 25%, 50%]', () => {
		const percentages: CardPercentageType[][] = [
			['66.666%', '33.333%'],
			['33.333%', '66.666%'],
			['25%', '25%', '50%'],
		];
		const expected = [
			'card-1 card-1 card-2',
			'card-3 card-4 card-4',
			'card-5 card-6 card-7 card-7',
		];
		expect(getTemplateAreas(percentages)).toStrictEqual(expected);
	});
});
