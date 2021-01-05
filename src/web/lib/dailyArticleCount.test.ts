import {
	DailyArticleCount,
	DailyArticleCountKey,
	getDailyArticleCount,
	incrementDailyArticleCount,
} from './dailyArticleCount';

const today = Math.floor(Date.now() / 86400000);

const validDailyArticleCount: DailyArticleCount = [
	{
		day: today,
		count: 3,
	},
	{
		day: today - 1,
		count: 2,
	},
	{
		day: today - 2,
		count: 1,
	},
];

describe('dailyArticleCount', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('gets an empty array of daily article counts by default', () => {
		const output = getDailyArticleCount();

		expect(output).toEqual([]);
	});

	it('returns array of valid daily article counts if they exist', () => {
		localStorage.setItem(
			DailyArticleCountKey,
			JSON.stringify({ value: validDailyArticleCount }),
		);

		const output = getDailyArticleCount();

		expect(output).toEqual(validDailyArticleCount);
	});

	it('returns empty array of daily article counts if failed to parse local storage, and remove the key from localStorage', () => {
		localStorage.setItem(DailyArticleCountKey, 'not a valid json string');

		const output = getDailyArticleCount();

		expect(output).toEqual([]);
		expect(localStorage.getItem(DailyArticleCountKey)).toBeNull();
	});

	it('returns empty array of daily article counts if invalid json format, and removes the key from localStorage', () => {
		localStorage.setItem(
			DailyArticleCountKey,
			JSON.stringify(validDailyArticleCount), // invalid format (array only, not it { value: array } format)
		);

		const output = getDailyArticleCount();

		expect(output).toEqual([]);
		expect(localStorage.getItem(DailyArticleCountKey)).toBeNull();
	});

	it('increments daily article count for today if daily article count does not exist', () => {
		// set localstorage to mock daily count
		incrementDailyArticleCount();

		const expected = [
			{
				day: today,
				count: 1,
			},
		];

		const output = getDailyArticleCount();

		expect(output).toEqual(expected);
	});

	it('increments daily article count if it exists for today', () => {
		// set localstorage to mock daily count
		localStorage.setItem(
			DailyArticleCountKey,
			JSON.stringify({ value: validDailyArticleCount }),
		);

		// increment article view
		incrementDailyArticleCount();

		// set up expected object (views for today should be incremented)
		const expected = [...validDailyArticleCount];
		expected[0].count += 1;

		const output = getDailyArticleCount();

		expect(output).toEqual(expected);
	});

	it('increments daily article count for today if daily article count exists, but not for day', () => {
		// valid daily article count without first element (today removed)
		const [, ...mocked] = validDailyArticleCount;

		// set localstorage to mock daily count
		localStorage.setItem(
			DailyArticleCountKey,
			JSON.stringify({ value: mocked }),
		);

		// increment article view
		incrementDailyArticleCount();

		// set up expected object (views for today should be 1)
		const expected = [...validDailyArticleCount];
		expected[0].count = 1;

		const output = getDailyArticleCount();

		expect(output).toEqual(expected);
	});

	it('increments daily article for today if it does not exist, and removes any older than 60 days', () => {
		// valid daily article count with some older than 60 days
		const [, ...withoutToday] = validDailyArticleCount;
		const mocked: DailyArticleCount = [
			...withoutToday,
			...[
				{ day: today - 61, count: 1 },
				{ day: today - 62, count: 2 },
			],
		];

		// set localstorage to mock daily count
		localStorage.setItem(
			DailyArticleCountKey,
			JSON.stringify({ value: mocked }),
		);

		// increment article view
		incrementDailyArticleCount();

		// set up expected object (views for today should be incremented, older than 60 days removed)
		const expected = [...validDailyArticleCount];
		expected[0].count = 1;

		const output = getDailyArticleCount();

		expect(output).toEqual(expected);
	});
});
