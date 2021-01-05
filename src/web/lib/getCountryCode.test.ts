import fetchMock from 'fetch-mock';

import { getCountryCode } from './getCountryCode';

const expectedCountry = 'GB';
const COUNTRY_CODE_KEY = 'gu.geolocation';
const TEN_DAYS = 60 * 60 * 24 * 10;

const validLocalState = JSON.stringify({
	value: 'GB',
	expires: new Date().getTime() + TEN_DAYS,
});

const expiredLocalState = JSON.stringify({
	value: 'GB',
	expires: 1381299014861,
});

describe('getCountryCode', () => {
	beforeEach(() => {
		localStorage.clear();
		fetchMock.restore();
	});

	it('fetches country code if nothing is stored locally', async () => {
		fetchMock.getOnce(
			'https://api.nextgen.guardianapps.co.uk/geolocation',
			{
				status: 200,
				body: { country: 'GB' },
			},
		);
		expect(await getCountryCode()).toBe(expectedCountry);
		expect(fetchMock.called()).toBe(true);
	});

	it('does not call the api if there is a local value', async () => {
		fetchMock.getOnce(
			'https://api.nextgen.guardianapps.co.uk/geolocation',
			{
				status: 200,
				body: { country: 'I AM NEVER USED' },
			},
		);

		localStorage.setItem(COUNTRY_CODE_KEY, validLocalState);
		expect(await getCountryCode()).toBe(expectedCountry);
		expect(fetchMock.called()).toBe(false);
	});

	it('it refreshes local state if it has expired', async () => {
		fetchMock.getOnce(
			'https://api.nextgen.guardianapps.co.uk/geolocation',
			{
				status: 200,
				body: { country: 'GB' },
			},
		);

		localStorage.setItem(COUNTRY_CODE_KEY, expiredLocalState);
		expect(await getCountryCode()).toBe(expectedCountry);
		expect(fetchMock.called()).toBe(true);
	});
});
