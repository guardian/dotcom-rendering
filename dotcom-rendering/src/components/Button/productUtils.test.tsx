import { render } from '@testing-library/react';
import {
	createAccessibleProductLabel,
	createStrikeThroughProductLabel,
} from './productUtils';

describe('createStrikeThroughProductLabel', () => {
	it('returns the label unchanged when there is no struck-through text', () => {
		const { container } = render(
			<>{createStrikeThroughProductLabel('£5 at Shop')}</>,
		);

		expect(container.textContent).toBe('£5 at Shop');
		expect(container.querySelector('s')).toBeNull();
	});

	it('renders the old price in an s element and preserves the rest', () => {
		const { container } = render(
			<>{createStrikeThroughProductLabel('~£10~ £5 at Shop')}</>,
		);

		expect(container.querySelector('s')).toHaveTextContent('£10');
		expect(container.textContent).toBe('£10 £5 at Shop');
	});
});

describe('createAccessibleProductLabel', () => {
	it('returns the label unchanged when there is no struck-through text', () => {
		expect(createAccessibleProductLabel('£5 at Shop')).toBe('£5 at Shop');
	});

	it('describes the old and new prices accessibly', () => {
		expect(createAccessibleProductLabel('~£10~ £5 at Shop')).toBe(
			'Was £10, now £5 at Shop',
		);
	});
});
