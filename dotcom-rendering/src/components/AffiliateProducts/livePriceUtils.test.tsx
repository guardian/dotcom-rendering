import { render } from '@testing-library/react';
import {
	applyLatestPriceToLabel,
	createAccessibleProductLabel,
	createStrikeThroughProductLabel,
	formatPrice,
	getProductCtaLivePrice,
	getProductCtaLivePriceDisplay,
	rewriteLabelWithLatestPrice,
	shouldPutOldPriceInStrikethrough,
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
				'$15 at Shop',
			),
		).toBe('~$15~ $5.50 at Shop');
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

describe('shouldPutOldPriceInStrikethrough', () => {
	it('returns false for price increase', () => {
		const latestPrice = 45;
		const articlePrice = 40;
		const result = shouldPutOldPriceInStrikethrough(
			latestPrice,
			articlePrice,
		);
		expect(result).toBe(false);
	});

	it('returns false for a drop of 15% but less than £5', () => {
		const latestPrice = 4;
		const articlePrice = 5;
		const result = shouldPutOldPriceInStrikethrough(
			latestPrice,
			articlePrice,
		);
		expect(result).toBe(false);
	});

	it('returns false for a drop of more than £5 but less than 10%', () => {
		const latestPrice = 395;
		const articlePrice = 400;
		const result = shouldPutOldPriceInStrikethrough(
			latestPrice,
			articlePrice,
		);
		expect(result).toBe(false);
	});

	it('returns false for a drop of more than £5 but less than 10%', () => {
		const latestPrice = 395;
		const articlePrice = 400;
		const result = shouldPutOldPriceInStrikethrough(
			latestPrice,
			articlePrice,
		);
		expect(result).toBe(false);
	});

	it('returns true for a drop of exactly 10% (and greater than £5)', () => {
		const latestPrice = 90;
		const articlePrice = 100;
		const result = shouldPutOldPriceInStrikethrough(
			latestPrice,
			articlePrice,
		);
		expect(result).toBe(true);
	});

	it('returns true for a drop of exactly 10% and £5', () => {
		const latestPrice = 45;
		const articlePrice = 50;
		const result = shouldPutOldPriceInStrikethrough(
			latestPrice,
			articlePrice,
		);
		expect(result).toBe(true);
	});

	it('returns true for a drop of more than 10% and £5', () => {
		const latestPrice = 19.9;
		const articlePrice = 34.9;
		const result = shouldPutOldPriceInStrikethrough(
			latestPrice,
			articlePrice,
		);
		expect(result).toBe(true);
	});
});

describe('getProductCtaLivePrice', () => {
	const cta = {
		url: 'https://example.com',
		text: '',
		retailer: 'Shop',
		price: '£10',
	};

	it('returns the article price when there is no latest price', () => {
		const { container } = render(<>{getProductCtaLivePrice(cta)}</>);
		expect(container.textContent).toBe('£10');
	});

	it('uses the latest price for dollar prices', () => {
		const { container } = render(
			<>
				{getProductCtaLivePrice({
					...cta,
					price: '$10',
					latestPrice: { currencySymbol: '$', price: '11' },
				})}
			</>,
		);
		expect(container.textContent).toBe('$11');
	});

	it('handles article prices with thousands separators', () => {
		const { container } = render(
			<>
				{getProductCtaLivePrice({
					...cta,
					price: '£1,299',
					latestPrice: { currencySymbol: '£', price: '1000' },
				})}
			</>,
		);
		expect(container.querySelector('s')).toHaveTextContent('£1,299');
		expect(container.textContent).toBe('£1,299 £1,000');
	});
});

describe('applyLatestPriceToLabel', () => {
	const label = '£10 at Shop';

	it('does not present a live price when there is no latest price', () => {
		expect(applyLatestPriceToLabel(undefined, label)).toEqual({
			label,
			livePriceDisplay: undefined,
		});
	});

	it('does not present a live price when the label does not follow standard convention', () => {
		expect(
			applyLatestPriceToLabel(
				{ currencySymbol: '£', price: '5' },
				'Buy at Shop',
			).livePriceDisplay,
		).toBeUndefined();
	});

	it('does not present a live price when the currency symbols do not match', () => {
		expect(
			applyLatestPriceToLabel({ currencySymbol: '$', price: '5' }, label)
				.livePriceDisplay,
		).toBeUndefined();
	});

	it('does not present a live price when the latest price is not numeric', () => {
		expect(
			applyLatestPriceToLabel(
				{ currencySymbol: '£', price: 'not a price' },
				label,
			).livePriceDisplay,
		).toBeUndefined();
	});

	it('presents a live price when the price goes up', () => {
		expect(
			applyLatestPriceToLabel(
				{ currencySymbol: '£', price: '12' },
				label,
			),
		).toEqual({ label: '£12 at Shop', livePriceDisplay: 'live' });
	});

	it('presents a live price when the price drops slightly', () => {
		expect(
			applyLatestPriceToLabel({ currencySymbol: '£', price: '9' }, label),
		).toEqual({ label: '£9 at Shop', livePriceDisplay: 'live' });
	});

	it('presents a live price when it is the same as the article price', () => {
		expect(
			applyLatestPriceToLabel(
				{ currencySymbol: '£', price: '10' },
				label,
			),
		).toEqual({ label: '£10 at Shop', livePriceDisplay: 'live' });
	});

	it('presents a struck through live price when the price drops significantly', () => {
		expect(
			applyLatestPriceToLabel({ currencySymbol: '£', price: '5' }, label),
		).toEqual({
			label: '~£10~ £5 at Shop',
			livePriceDisplay: 'strikethrough',
		});
	});
});

describe('getProductCtaLivePriceDisplay', () => {
	const cta = {
		url: 'https://example.com',
		text: '',
		retailer: 'Shop',
		price: '£10',
	};

	it('does not present a live price when there is no latest price', () => {
		expect(getProductCtaLivePriceDisplay(cta)).toEqual({
			content: '£10',
			livePriceDisplay: undefined,
		});
	});

	it('does not present a live price when the latest price is not numeric', () => {
		expect(
			getProductCtaLivePriceDisplay({
				...cta,
				latestPrice: { currencySymbol: '£', price: 'not a price' },
			}).livePriceDisplay,
		).toBeUndefined();
	});

	it('does not present a live price when the article price is not numeric', () => {
		expect(
			getProductCtaLivePriceDisplay({
				...cta,
				price: 'Price on request',
				latestPrice: { currencySymbol: '£', price: '12' },
			}),
		).toEqual({ content: 'Price on request', livePriceDisplay: undefined });
	});

	it('presents a live price when the price goes up', () => {
		expect(
			getProductCtaLivePriceDisplay({
				...cta,
				latestPrice: { currencySymbol: '£', price: '12' },
			}),
		).toEqual({ content: '£12', livePriceDisplay: 'live' });
	});

	it('presents a live price when the price drops slightly', () => {
		expect(
			getProductCtaLivePriceDisplay({
				...cta,
				latestPrice: { currencySymbol: '£', price: '9' },
			}),
		).toEqual({ content: '£9', livePriceDisplay: 'live' });
	});

	it('presents a live price when it is the same as the article price', () => {
		expect(
			getProductCtaLivePriceDisplay({
				...cta,
				latestPrice: { currencySymbol: '£', price: '10' },
			}),
		).toEqual({ content: '£10', livePriceDisplay: 'live' });
	});

	it('presents a struck through live price when the price drops significantly', () => {
		const { content, livePriceDisplay } = getProductCtaLivePriceDisplay({
			...cta,
			latestPrice: { currencySymbol: '£', price: '5' },
		});

		expect(livePriceDisplay).toBe('strikethrough');

		const { container } = render(<>{content}</>);
		expect(container.textContent).toBe('£10 £5');
	});
});
