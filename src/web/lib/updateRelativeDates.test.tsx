import MockDate from 'mockdate';

import { updateRelativeDates } from './updateRelativeDates';

const now = new Date().valueOf();
const nowIso = new Date(now).toISOString();

const oneMinute = 60 * 1000 * 1;
const fiveMinutes = 60 * 1000 * 5;
const oneSecond = 1000 * 1;
const fourSeconds = 1000 * 4;
const fiveSeconds = 1000 * 5;
const forteenSeconds = 1000 * 14;
const fifteenSeconds = 1000 * 15;
const twentySeconds = 20 * 1000;
const thirtySeconds = 30 * 1000;

describe('updateRelativeDates', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		MockDate.reset();
	});

	it('only updates time elements that have the data-relativeformat and datetime attributes', async () => {
		document.body.innerHTML = `
			<div>
				<time data-testid="1" datetime="${nowIso}">Original value</time>
				<div data-testid="2" datetime="${nowIso}" data-relativeformat="med">Original value</div>
				<time data-testid="3" data-relativeformat="med">Original value</time>
				<time data-testid="4" datetime="${nowIso}" data-relativeformat="med">Original value</time>
			</div>`;
		updateRelativeDates();
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'Original value',
		);
		expect(document.querySelector('[data-testid="2"]')).toHaveTextContent(
			'Original value',
		);
		expect(document.querySelector('[data-testid="3"]')).toHaveTextContent(
			'Original value',
		);
		expect(document.querySelector('[data-testid="4"]')).toHaveTextContent(
			'15s',
		);
	});

	it('fails gracefully if format is invalid', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="INVALID">Original value</time>`;
		updateRelativeDates();
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'Original value',
		);
	});

	it('updates the text shown in time elements as time progresses', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="med">1s</time>`;
		updateRelativeDates();
		MockDate.set(now);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'1s',
		);
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'15s',
		);
		MockDate.set(now + thirtySeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'30s',
		);
		MockDate.set(now + oneMinute);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'1m',
		);
	});

	it('relative dates do not change if the script is never run', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="med">1s ago</time>`;
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'1s ago',
		);
		MockDate.set(now + fiveMinutes);
		jest.advanceTimersByTime(twentySeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'1s ago',
		);
	});

	it('updates relative time after the default 15s interval has passed', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="med">1s ago</time>`;
		updateRelativeDates();
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(forteenSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'1s ago',
		);
		jest.advanceTimersByTime(oneSecond);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'15s ago',
		);
	});

	it('uses the data-interval value if passed', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="med" data-interval="5000">1s ago</time>`;
		updateRelativeDates();
		MockDate.set(now + fiveSeconds);
		jest.advanceTimersByTime(oneSecond);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'1s ago',
		);
		jest.advanceTimersByTime(fourSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'5s ago',
		);
	});

	it('respects if the long format is passed', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="long" data-interval="5000">1 second ago</time>`;
		updateRelativeDates();
		MockDate.set(now + fiveSeconds);
		jest.advanceTimersByTime(fiveSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'5 seconds ago',
		);
	});

	it('respects if the short format is passed', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="short">1s</time>`;
		updateRelativeDates();
		MockDate.set(now + twentySeconds);
		jest.advanceTimersByTime(twentySeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'20s',
		);
	});

	it('is possible to pass in a custom default interval', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="short">1s</time>`;
		updateRelativeDates({
			interval: 25000,
		});
		MockDate.set(now + thirtySeconds);
		jest.advanceTimersByTime(twentySeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'1s',
		);
		jest.advanceTimersByTime(fiveSeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'30s',
		);
	});

	it('data-interval values override options.interval', async () => {
		document.body.innerHTML = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="short" data-interval="5000">1s</time>`;
		updateRelativeDates({
			interval: 25000,
		});
		MockDate.set(now + thirtySeconds);
		jest.advanceTimersByTime(twentySeconds);
		expect(document.querySelector('[data-testid="1"]')).toHaveTextContent(
			'30s',
		);
	});
});
