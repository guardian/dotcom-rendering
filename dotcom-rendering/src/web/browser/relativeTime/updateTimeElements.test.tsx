import { render, screen } from '@testing-library/react';
import MockDate from 'mockdate';
import { updateTimeElements } from './updateTimeElements';

function setup(html: string) {
	function TestComponent() {
		return <div dangerouslySetInnerHTML={{ __html: html }} />;
	}
	return render(<TestComponent />);
}

const now = new Date().valueOf();
const nowIso = new Date(now).toISOString();

const oneMinute = 60 * 1000 * 1;
const fifteenSeconds = 1000 * 15;
const twentySeconds = 20 * 1000;
const thirtySeconds = 30 * 1000;

describe('updateTimeElements', () => {
	beforeEach(() => {
		MockDate.reset();
	});

	it('only updates time elements that have the data-relativeformat and datetime attributes', async () => {
		const html = `
			<div>
				<time data-testid="1" datetime="${nowIso}">I am missing data-relativeformat</time>
				<div data-testid="2" datetime="${nowIso}" data-relativeformat="med">I am a div, not time</div>
				<time data-testid="3" data-relativeformat="med">I am missing datatime</time>
				<time data-testid="4" datetime="${nowIso}" data-relativeformat="med">Original value</time>
			</div>`;
		setup(html);
		MockDate.set(now + fifteenSeconds);
		updateTimeElements();
		expect(screen.getByTestId('1')).toHaveTextContent(
			'I am missing data-relativeformat',
		);
		expect(screen.getByTestId('2')).toHaveTextContent('I am a div, not time');
		expect(screen.getByTestId('3')).toHaveTextContent('I am missing datatime');
		expect(screen.getByTestId('4')).toHaveTextContent('15s');
	});

	it('fails gracefully if format is invalid', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="INVALID">Original value</time>`;
		setup(html);
		MockDate.set(now + fifteenSeconds);
		updateTimeElements();
		expect(screen.getByTestId('1')).toHaveTextContent('Original value');
	});

	it('updates the text shown in time elements as time progresses', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="med">now</time>`;
		setup(html);
		MockDate.set(now);
		updateTimeElements();
		expect(screen.getByTestId('1')).toHaveTextContent('now');
		MockDate.set(now + fifteenSeconds);
		updateTimeElements();
		expect(screen.getByTestId('1')).toHaveTextContent('15s');
		MockDate.set(now + thirtySeconds);
		updateTimeElements();
		expect(screen.getByTestId('1')).toHaveTextContent('30s');
		MockDate.set(now + oneMinute);
		updateTimeElements();
		expect(screen.getByTestId('1')).toHaveTextContent('1m');
	});

	it('respects if long format is passed', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="long">1 second ago</time>`;
		setup(html);
		MockDate.set(now + fifteenSeconds);
		updateTimeElements();
		expect(screen.getByTestId('1')).toHaveTextContent('15 seconds ago');
	});

	it('respects if short format is passed', async () => {
		const html = `<time data-testid="1" datetime="${nowIso}" data-relativeformat="short">now</time>`;
		setup(html);
		MockDate.set(now + twentySeconds);
		updateTimeElements();
		expect(screen.getByTestId('1')).toHaveTextContent('20s');
	});
});
