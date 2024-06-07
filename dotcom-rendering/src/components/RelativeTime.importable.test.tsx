import { render } from '@testing-library/react';
import { RelativeTime } from './RelativeTime.importable';

describe('RelativeTime', () => {
	test.each([
		[0, 'now'],
		[25, 'now'],
		[55, 'now'],
		[60, '1m ago'],
		[2 * 60, '2m ago'],
		[60 * 60, '1h ago'],
		[24 * 60 * 60, '1d ago'],
		[3 * 24 * 60 * 60, '3d ago'],
		[6 * 24 * 60 * 60, '6d ago'],
		[-1, 'now'], // future date
		[-9e9, 'now'], // future date
	])('For a difference of %s seconds, show “%s”', (difference, expected) => {
		const now = Date.now();
		const then = now - difference * 1000;
		const { getByText } = render(
			<RelativeTime then={then} now={now} editionId="UK" />,
		);

		expect(getByText(expected)).toBeDefined();
	});

	test('Eight days ago is absolute', () => {
		const now = Date.now();
		const then = now - 8 * 24 * 60 * 60 * 1000;
		const { getByText } = render(
			<RelativeTime then={then} now={now} editionId="UK" />,
		);

		const expected = new Date(then).toLocaleString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});

		expect(getByText(expected)).toBeDefined();
	});
});
