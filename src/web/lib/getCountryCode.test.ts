import { CountryCode } from '@guardian/libs/dist/esm/types/countries';
import * as geo from './getCountryCode';

let localePromise: Promise<CountryCode | null>;
let overriddenCountry: string;
jest.mock('@guardian/libs', () => ({
	getLocale: async () => {
		return localePromise;
	},
	storage: {
		local: {
			get: () => {
				return overriddenCountry;
			},
			set: () => {},
		},
	},
}));

describe('getCountryCode', () => {
	it('get country code from getLocale lib', async () => {
		localePromise = Promise.resolve('GB');
		const countryCode = await geo.getLocaleCode();
		expect(countryCode).toBe('GB');
		expect(geo.getCountryCode()).toBe('GB');
	});

	it('should override country code', async () => {
		localePromise = Promise.resolve('GB');
		await geo.getLocaleCode();
		expect(geo.getCountryCode()).toBe('GB');
		overriddenCountry = 'CY';
		geo.overrideCountryCode('CY');
		expect(geo.getCountryCode()).toBe('CY');
	});
});
