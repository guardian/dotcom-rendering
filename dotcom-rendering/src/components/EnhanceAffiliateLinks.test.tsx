import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useBetaAB } from '../lib/useAB';
import { EnhanceAffiliateLinks } from './EnhanceAffiliateLinks.importable';

// Mock the useAB module
jest.mock('../lib/useAB', () => ({
	useBetaAB: jest.fn(),
}));

describe('EnhanceAffiliateLinks', () => {
	beforeEach(() => {
		// Clear the DOM before each test
		document.body.innerHTML = '';
		jest.restoreAllMocks();
	});

	it('should not modify links if no Skimlinks are present', () => {
		document.body.innerHTML = `
            <a href="https://example.com">Not a Skimlink</a>
        `;

		render(<EnhanceAffiliateLinks />);

		const link = document.querySelector('a');
		expect(link?.href).toBe('https://example.com/');
	});

	it('should append xcust parameter to Skimlinks with refferer set to none if unavailable', () => {
		Object.defineProperty(document, 'referrer', {
			value: '',
			configurable: true,
		});

		document.body.innerHTML = `
            <a href="https://go.skimresources.com/?id=12345">Skimlink</a>
        `;

		render(<EnhanceAffiliateLinks />);

		const link = document.querySelector('a');
		expect(link?.href).toContain(
			'xcust=referrer%7Cnone%7CaccountId%7C12345',
		);
	});

	it('should append xcust parameter to Skimlinks with refferer set if available', () => {
		Object.defineProperty(document, 'referrer', {
			value: 'https://foo.com',
			configurable: true,
		});

		document.body.innerHTML = `
            <a href="https://go.skimresources.com/?id=12345">Skimlink</a>
        `;

		render(<EnhanceAffiliateLinks />);

		const link = document.querySelector('a');
		expect(link?.href).toContain(
			'xcust=referrer%7Cfoo.com%7CaccountId%7C12345',
		);
	});

	it('should include AB test participations in xcust if present', () => {
		document.body.innerHTML = `
            <a href="https://go.skimresources.com/?id=12345">Skimlink</a>
        `;

		(useBetaAB as jest.Mock).mockReturnValue({
			getParticipations: () => ({
				test1: 'variantA',
				test2: 'variantB',
			}),
		});

		render(<EnhanceAffiliateLinks />);

		const link = document.querySelector('a');
		expect(link?.href).toContain(
			'xcust=referrer%7Cfoo.com%7CaccountId%7C12345%7CabTestParticipations%7Ctest1%3AvariantA%2Ctest2%3AvariantB',
		);
	});
});
