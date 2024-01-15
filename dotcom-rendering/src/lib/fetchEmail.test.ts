import { lazyFetchEmailWithTimeout } from './fetchEmail';
import { getIdApiUserData } from './getIdapiUserData';

const userResponse = {
	status: 'ok',
	user: {
		primaryEmailAddress: 'test@guardian.co.uk',
	},
};

jest.mock('./getIdapiUserData', () => {
	const originalModule = jest.requireActual('./getIdapiUserData');
	return {
		...originalModule,
		getIdApiUserData: jest.fn(() => Promise.resolve(userResponse)),
	};
});

describe('lazyFetchEmailWithTimeout', () => {
	it('returns a function to get the email address', async () => {
		const fetchEmail = lazyFetchEmailWithTimeout('https://idapi-url.com');
		expect(getIdApiUserData).not.toHaveBeenCalled();

		const result = await fetchEmail();
		expect(result).toBe(userResponse.user.primaryEmailAddress);
		expect(getIdApiUserData).toHaveBeenCalledWith('https://idapi-url.com');
	});
});
