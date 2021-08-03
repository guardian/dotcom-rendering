import MockDate from 'mockdate';

import { render, screen } from '@testing-library/react';

import { useTimeAgo } from './useTimeAgo';

function setup(html: string, options?: any) {
	function TestComponent() {
		useTimeAgo(options);
		return <div dangerouslySetInnerHTML={{ __html: html }} />;
	}
	return render(<TestComponent />);
}

const now = new Date().valueOf();
const nowIso = new Date(now).toISOString();

const oneMinute = 60 * 1000 * 1;
const oneSecond = 1000 * 1;
const fiveSeconds = 1000 * 5;
const forteenSeconds = 1000 * 14;
const fifteenSeconds = 1000 * 15;
const twentySeconds = 20 * 1000;
const thirtySeconds = 30 * 1000;

describe('useTimeAgo', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		MockDate.reset();
	});

	it('only updates time elements that have the data-relativeformat and datetime attributes', async () => {
		const html = `
			<div>
				<time data-testid="1" datetime="${nowIso}">Original value</time>
				<div data-testid="2" datetime="${nowIso}" data-relativeformat="med">Original value</div>
				<time data-testid="3" data-relativeformat="med">Original value</time>
				<time data-testid="4" datetime="${nowIso}" data-relativeformat="med">Original value</time>
			</div>`;
		setup(html);
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('Original value');
		expect(screen.getByTestId('2')).toHaveTextContent('Original value');
		expect(screen.getByTestId('3')).toHaveTextContent('Original value');
		expect(screen.getByTestId('4')).toHaveTextContent('15s');
	});

	it('fails gracefully if format is invalid', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="INVALID">Original value</time>`;
		setup(html);
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('Original value');
	});

	it('updates the text shown in time elements as time progresses', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="med">now</time>`;
		setup(html);
		MockDate.set(now);
		expect(screen.getByTestId('1')).toHaveTextContent('now');
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('15s');
		MockDate.set(now + thirtySeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('30s');
		MockDate.set(now + oneMinute);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('1m');
	});

	it('updates relative time after the default 15s interval has passed', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="med">1s ago</time>`;
		setup(html);
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(forteenSeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('1s ago');
		jest.advanceTimersByTime(oneSecond);
		expect(screen.getByTestId('1')).toHaveTextContent('15s ago');
	});

	it('respects if long format is passed', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="long">1 second ago</time>`;
		setup(html);
		MockDate.set(now + fifteenSeconds);
		jest.advanceTimersByTime(fifteenSeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('15 seconds ago');
	});

	it('respects if short format is passed', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="short">now</time>`;
		setup(html);
		MockDate.set(now + twentySeconds);
		jest.advanceTimersByTime(twentySeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('20s');
	});

	it('is possible to pass in a custom default interval', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="short">now</time>`;
		setup(html, {
			interval: 25000,
		});
		MockDate.set(now + thirtySeconds);
		jest.advanceTimersByTime(twentySeconds);
		expect(screen.getByTestId('1')).not.toHaveTextContent('20s');
		expect(screen.getByTestId('1')).toHaveTextContent('now');
		jest.advanceTimersByTime(fiveSeconds);
		expect(screen.getByTestId('1')).toHaveTextContent('30s');
	});
});
