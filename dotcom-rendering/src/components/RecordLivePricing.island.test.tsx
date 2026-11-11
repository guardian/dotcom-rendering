import { render } from '@testing-library/react';
import { recordExperiences } from '../client/ophan/ophan';
import { RecordLivePricing } from './RecordLivePricing.island';

jest.mock('../client/ophan/ophan', () => ({
	recordExperiences: jest.fn(() => Promise.resolve()),
}));

const renderWithMarkup = (markup: string) =>
	render(
		<>
			<div dangerouslySetInnerHTML={{ __html: markup }} />
			<RecordLivePricing />
		</>,
	);

describe('RecordLivePricing', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('records only live pricing available when no live price is presented', () => {
		renderWithMarkup('<a href="#">£10 at Shop</a>');

		expect(recordExperiences).toHaveBeenCalledTimes(1);
		expect(recordExperiences).toHaveBeenCalledWith('Web', [
			'live-pricing-available',
		]);
	});

	it('records live pricing available and presented when a live price is presented', () => {
		renderWithMarkup('<a href="#" data-live-price="live">£10 at Shop</a>');

		expect(recordExperiences).toHaveBeenCalledWith('Web', [
			'live-pricing-available',
			'live-pricing-presented',
		]);
	});

	it('records live pricing presented for a struck through live price', () => {
		renderWithMarkup(
			'<div data-live-price="strikethrough"><s>£60</s> £45</div>',
		);

		expect(recordExperiences).toHaveBeenCalledWith('Web', [
			'live-pricing-available',
			'live-pricing-presented',
		]);
	});

	it('does not record live pricing presented when the live price is hidden', () => {
		const checkVisibility = jest.fn(() => false);
		const descriptor = Object.getOwnPropertyDescriptor(
			Element.prototype,
			'checkVisibility',
		);
		Object.defineProperty(Element.prototype, 'checkVisibility', {
			value: checkVisibility,
			configurable: true,
		});

		renderWithMarkup('<a href="#" data-live-price="live">£10 at Shop</a>');

		expect(checkVisibility).toHaveBeenCalled();
		expect(recordExperiences).toHaveBeenCalledWith('Web', [
			'live-pricing-available',
		]);

		if (descriptor) {
			Object.defineProperty(
				Element.prototype,
				'checkVisibility',
				descriptor,
			);
		} else {
			delete (Element.prototype as Partial<Element>).checkVisibility;
		}
	});
});
