import { vi } from 'vitest';
import { getBrazeUuid } from './getBrazeUuid';
import { getIdapiUserIdentifiers } from './getIdapiUserData';

const userIdentifiers = {
	id: 'idValue',
	brazeUuid: 'brazeUuidValue',
	puzzleId: 'puzzleIdValue',
	googleTagId: 'googleTagIdValue',
};

vi.mock('./getIdapiUserData', () => ({
	getIdapiUserIdentifiers: vi.fn(() => Promise.resolve(userIdentifiers)),
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
