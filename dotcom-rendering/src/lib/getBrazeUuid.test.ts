import { getBrazeUuid } from './getBrazeUuid';
import { getIdapiUserIdentifiers } from './getIdapiUserData';

const userIdentifiers = {
	id: 'idValue',
	brazeUuid: 'brazeUuidValue',
	puzzleId: 'puzzleIdValue',
	googleTagId: 'googleTagIdValue',
};

jest.mock('./getIdapiUserData', () => ({
	getIdapiUserIdentifiers: jest.fn(() => Promise.resolve(userIdentifiers)),
}));

describe('getBrazeUuid', () => {
	it('gets the braze uuid using Identity user identifiers api', async () => {
		const result = await getBrazeUuid('https://idapi-url.com');
		expect(result).toBe(userIdentifiers.brazeUuid);
		expect(getIdapiUserIdentifiers).toHaveBeenCalledWith(
			'https://idapi-url.com',
		);
	});
});
