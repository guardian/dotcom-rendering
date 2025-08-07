import { getRedirectUrl, initializeFedCM } from './GoogleOneTap.importable';

const mockWindow = ({
	replace,
	get,
	enableFedCM = true,
}: {
	replace: jest.Mock;
	get: jest.Mock;
	enableFedCM?: boolean;
}) =>
	Object.defineProperty(globalThis, 'window', {
		value: {
			location: {
				href: 'https://www.theguardian.com/uk',
				hostname: 'm.code.theguardian.com',
				replace,
			},
			navigator: { credentials: { get } },
			...(enableFedCM ? { IdentityCredential: 'mock value' } : {}),
		},
		writable: true,
	});

describe('GoogleOneTap', () => {
	it('should return the correct signin URL after constructing it with the provided stage and token', () => {
		expect(
			getRedirectUrl({
				stage: 'PROD',
				token: 'test-token',
				currentLocation: 'https://www.theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.theguardian.com/signin/google?token=test-token&returnUrl=https%3A%2F%2Fwww.theguardian.com%2Fuk',
		);

		expect(
			getRedirectUrl({
				stage: 'CODE',
				token: 'test-token',
				currentLocation: 'https://m.code.dev-theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.code.dev-theguardian.com/signin/google?token=test-token&returnUrl=https%3A%2F%2Fm.code.dev-theguardian.com%2Fuk',
		);

		expect(
			getRedirectUrl({
				stage: 'DEV',
				token: 'test-token',
				currentLocation:
					'http://localhost/Front/https://m.code.dev-theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.thegulocal.com/signin/google?token=test-token&returnUrl=http%3A%2F%2Flocalhost%2FFront%2Fhttps%3A%2F%2Fm.code.dev-theguardian.com%2Fuk',
		);
	});

	it('should initializeFedCM and redirect to Gateway with token on success', async () => {
		const navigatorGet = jest.fn(() =>
			Promise.resolve({ token: 'test-token' }),
		);
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await initializeFedCM({ isSignedIn: false, isInTest: true });

		expect(navigatorGet).toHaveBeenCalledWith({
			identity: {
				context: 'signin',
				providers: [
					{
						clientId: '774465807556.apps.googleusercontent.com',
						configURL: 'https://accounts.google.com/gsi/fedcm.json',
					},
				],
			},
			mediation: 'required',
		});

		expect(locationReplace).toHaveBeenCalledWith(
			'https://profile.theguardian.com/signin/google?token=test-token&returnUrl=https%3A%2F%2Fwww.theguardian.com%2Fuk',
		);
	});

	it('should initializeFedCM and not redirect to Gateway with token on failure', async () => {
		const error = new Error('Network Error');
		error.name = 'NetworkError';

		const navigatorGet = jest.fn(() => Promise.reject(error));
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await initializeFedCM({ isSignedIn: false, isInTest: true });

		expect(navigatorGet).toHaveBeenCalledWith({
			identity: {
				context: 'signin',
				providers: [
					{
						clientId: '774465807556.apps.googleusercontent.com',
						configURL: 'https://accounts.google.com/gsi/fedcm.json',
					},
				],
			},
			mediation: 'required',
		});

		// Don't redirect whenever there is a "NetworkError" (aka user declined prompt)
		expect(locationReplace).not.toHaveBeenCalled();
	});

	it('should initializeFedCM and throw error when unexpected', async () => {
		const error = new Error('window.navigator.credentials.get failed');
		error.name = 'DOMException';

		const navigatorGet = jest.fn(() => Promise.reject(error));
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await expect(
			initializeFedCM({ isSignedIn: false, isInTest: true }),
		).rejects.toThrow('window.navigator.credentials.get failed');

		expect(navigatorGet).toHaveBeenCalledWith({
			identity: {
				context: 'signin',
				providers: [
					{
						clientId: '774465807556.apps.googleusercontent.com',
						configURL: 'https://accounts.google.com/gsi/fedcm.json',
					},
				],
			},
			mediation: 'required',
		});

		// Don't redirect whenever there is an unexpected error
		expect(locationReplace).not.toHaveBeenCalled();
	});

	it('should not initializeFedCM when FedCM is unsupported', async () => {
		const navigatorGet = jest.fn();
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
			enableFedCM: false,
		});

		await initializeFedCM({ isSignedIn: false, isInTest: true });

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(locationReplace).not.toHaveBeenCalled();
	});

	it('should not initializeFedCM when user is signed in', async () => {
		const navigatorGet = jest.fn();
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await initializeFedCM({ isSignedIn: true, isInTest: true });

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(locationReplace).not.toHaveBeenCalled();
	});

	it('should not initializeFedCM when user is not in test', async () => {
		const navigatorGet = jest.fn();
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await initializeFedCM({ isSignedIn: true, isInTest: true });

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(locationReplace).not.toHaveBeenCalled();
	});
});
