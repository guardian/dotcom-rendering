import { render } from '@testing-library/react';
import {
	createAccessibleProductLabel,
	createStrikeThroughProductLabel,
	formatPrice,
	rewriteLabelWithLatestPrice,
} from './livePriceUtils';

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

describe('formatPrice', () => {
	it('formats decimal place to two places', () => {
		const price = 1.5;
		const result = formatPrice(price);
		expect(result).toEqual('1.50');
	});

	it('formats whole number to no decimal places', () => {
		const price = 15;
		const result = formatPrice(price);
		expect(result).toEqual('15');
	});

	it('formats numbers in the thousands with a comma', () => {
		const price = 1500.5;
		const result = formatPrice(price);
		expect(result).toEqual('1,500.50');
	});
});

describe('rewriteLabelWithLatestPrice', () => {
	const latestPrice = {
		currencySymbol: '£',
		price: '5',
	};

	it('strikes through the existing price and adds the formatted latest price', () => {
		expect(rewriteLabelWithLatestPrice(latestPrice, '£10 at Shop')).toBe(
			'~£10~ £5 at Shop',
		);
	});

	it('formats latest prices with decimal places', () => {
		expect(
			rewriteLabelWithLatestPrice(
				{ currencySymbol: '£', price: '5.5' },
				'£10.50 at Shop',
			),
		).toBe('~£10.50~ £5.50 at Shop');
	});

	it('formats latest prices with thousands separators', () => {
		expect(
			rewriteLabelWithLatestPrice(
				{ currencySymbol: '£', price: '1500.5' },
				'£2,000 at Shop',
			),
		).toBe('~£2,000~ £1,500.50 at Shop');
	});

	it('supports dollar prices', () => {
		expect(
			rewriteLabelWithLatestPrice(
				{ currencySymbol: '$', price: '5.5' },
				'$10 at Shop',
			),
		).toBe('~$10~ $5.50 at Shop');
	});

	it('returns the label unchanged when it has no supported price', () => {
		expect(rewriteLabelWithLatestPrice(latestPrice, 'Buy at Shop')).toBe(
			'Buy at Shop',
		);
	});

	it('returns the label unchanged when the currency symbols do not match', () => {
		expect(
			rewriteLabelWithLatestPrice(
				{ currencySymbol: '$', price: '5.5' },
				'£10 at Shop',
			),
		).toBe('£10 at Shop');
	});

	it('returns the label unchanged when the latest price is not numeric', () => {
		expect(
			rewriteLabelWithLatestPrice(
				{ currencySymbol: '£', price: 'not a price' },
				'£10 at Shop',
			),
		).toBe('£10 at Shop');
	});

	it('returns the label if it does not follow standard convention', () => {
		expect(
			rewriteLabelWithLatestPrice(
				latestPrice,
				'Now £100, originally £125 at Field Company (discount in cart)',
			),
		).toBe('Now £100, originally £125 at Field Company (discount in cart)');
	});

	it('returns the label if it does not follow standard convention, using quantities', () => {
		expect(
			rewriteLabelWithLatestPrice(
				latestPrice,
				'£5.50 for 300 at Sainsburys (£1.83/100g)',
			),
		).toBe('£5.50 for 300 at Sainsburys (£1.83/100g)');
	});
});
