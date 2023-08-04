import { jest } from '@jest/globals';

const userIdentifiers = {
	id: 'idValue',
	brazeUuid: 'brazeUuidValue',
	puzzleId: 'puzzleIdValue',
	googleTagId: 'googleTagIdValue',
};

jest.unstable_mockModule('../../src/lib/getIdapiUserData', () => ({
	getIdapiUserIdentifiers: jest.fn(() => Promise.resolve(userIdentifiers)),
}));

const { getBrazeUuid } = await import('./getBrazeUuid');
const { getIdapiUserIdentifiers } = await import('./getIdapiUserData');

describe('getBrazeUuid', () => {
	it('gets the braze uuid using Identity user identifiers api', async () => {
		const result = await getBrazeUuid('https://idapi-url.com');
		expect(result).toBe(userIdentifiers.brazeUuid);
		expect(getIdapiUserIdentifiers).toHaveBeenCalledWith(
			'https://idapi-url.com',
		);
	});
});
