import { getRedirectUrl, initializeFedCM } from './GoogleOneTap.importable';

const mockWindow = ({
	get,
	enableFedCM = true,
}: {
	get: jest.Mock;
	enableFedCM?: boolean;
}) => {
	const form = {
		submit: jest.fn(),
		appendChild: jest.fn(),
		method: undefined,
		action: undefined,
	};
	const input = {
		submit: jest.fn(),
		type: undefined,
		name: undefined,
		value: undefined,
	};

	const window = {
		location: {
			href: 'https://www.theguardian.com/uk',
			hostname: 'm.code.theguardian.com',
		},
		navigator: { credentials: { get } },
		...(enableFedCM ? { IdentityCredential: 'mock value' } : {}),
	};

	const document = {
		createElement: jest.fn((element) => {
			if (element === 'form') {
				return form;
			} else if (element === 'input') {
				return input;
			} else {
				throw new Error(`Unsupported element: ${element}`);
			}
		}),
		addEventListener: jest.fn(),
		body: {
			appendChild: jest.fn(),
		},
	};

	Object.defineProperty(globalThis, 'window', {
		value: window,
		writable: true,
	});
	Object.defineProperty(globalThis, 'document', {
		value: document,
		writable: true,
	});

	return { form, input };
};

describe('GoogleOneTap', () => {
	it('should return the correct signin URL after constructing it with the provided stage and token', () => {
		expect(
			getRedirectUrl({
				stage: 'PROD',
				currentLocation: 'https://www.theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.theguardian.com/signin/google-one-tap?returnUrl=https%3A%2F%2Fwww.theguardian.com%2Fuk',
		);

		expect(
			getRedirectUrl({
				stage: 'CODE',
				currentLocation: 'https://m.code.dev-theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.code.dev-theguardian.com/signin/google-one-tap?returnUrl=https%3A%2F%2Fm.code.dev-theguardian.com%2Fuk',
		);

		expect(
			getRedirectUrl({
				stage: 'DEV',
				currentLocation:
					'http://localhost/Front/https://m.code.dev-theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.thegulocal.com/signin/google-one-tap?returnUrl=http%3A%2F%2Flocalhost%2FFront%2Fhttps%3A%2F%2Fm.code.dev-theguardian.com%2Fuk',
		);
	});

	it('should initializeFedCM and redirect to Gateway with token on success', async () => {
		const navigatorGet = jest.fn(() =>
			Promise.resolve({ token: 'test-token' }),
		);

		const { form, input } = mockWindow({
			get: navigatorGet,
		});

		await initializeFedCM({ isSignedIn: false });

		expect(form.action).toBe(
			'https://profile.theguardian.com/signin/google-one-tap?returnUrl=https%3A%2F%2Fwww.theguardian.com%2Fuk',
		);
		expect(form.method).toBe('POST');

		expect(input.type).toBe('hidden');
		expect(input.name).toBe('token');
		expect(input.value).toBe('test-token');

		expect(form.submit).toHaveBeenCalled();
	});

	it('should initializeFedCM and not redirect to Gateway with token on failure', async () => {
		const error = new Error('Network Error');
		error.name = 'NetworkError';

		const navigatorGet = jest.fn(() => Promise.reject(error));

		const { form } = mockWindow({
			get: navigatorGet,
		});

		await initializeFedCM({ isSignedIn: false });

		expect(navigatorGet).toHaveBeenCalledWith({
			identity: {
				context: 'continue',
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
		expect(form.submit).not.toHaveBeenCalled();
	});

	it('should initializeFedCM and throw error when unexpected', async () => {
		const error = new Error('window.navigator.credentials.get failed');
		error.name = 'DOMException';

		const navigatorGet = jest.fn(() => Promise.reject(error));

		const { form } = mockWindow({
			get: navigatorGet,
		});

		await expect(initializeFedCM({ isSignedIn: false })).rejects.toThrow(
			'window.navigator.credentials.get failed',
		);

		expect(navigatorGet).toHaveBeenCalledWith({
			identity: {
				context: 'continue',
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
		expect(form.submit).not.toHaveBeenCalled();
	});

	it('should not initializeFedCM when FedCM is unsupported', async () => {
		const navigatorGet = jest.fn();

		const { form } = mockWindow({
			get: navigatorGet,
			enableFedCM: false,
		});

		await initializeFedCM({ isSignedIn: false });

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(form.submit).not.toHaveBeenCalled();
	});

	it('should not initializeFedCM when user is signed in', async () => {
		const navigatorGet = jest.fn();

		const { form } = mockWindow({
			get: navigatorGet,
		});

		await initializeFedCM({ isSignedIn: true });

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(form.submit).not.toHaveBeenCalled();
	});

	it('should not initializeFedCM when user is not in test', async () => {
		const navigatorGet = jest.fn();

		const { form } = mockWindow({
			get: navigatorGet,
		});

		await initializeFedCM({ isSignedIn: true });

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(form.submit).not.toHaveBeenCalled();
	});
});
