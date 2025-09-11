import { submitComponentEvent as submitComponentEventMock } from '../client/ophan/ophan';
import { error, ok } from '../lib/result';
import {
	extractEmailFromToken,
	getRedirectUrl,
	initializeFedCM,
} from './GoogleOneTap.importable';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(),
}));

const mockWindow = ({
	replace,
	get,
	matchMedia = true,
	enableFedCM = true,
}: {
	replace: jest.Mock;
	get: jest.Mock;
	matchMedia?: boolean;
	enableFedCM?: boolean;
}) =>
	Object.defineProperty(globalThis, 'window', {
		value: {
			location: {
				href: 'https://www.theguardian.com/uk',
				hostname: 'm.code.theguardian.com',
				replace,
			},
			matchMedia: () => ({
				matches: matchMedia,
			}),
			navigator: { credentials: { get } },
			...(enableFedCM ? { IdentityCredential: 'mock value' } : {}),
		},
		writable: true,
	});

describe('GoogleOneTap', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return the correct signin URL after constructing it with the provided stage and token', () => {
		expect(
			getRedirectUrl({
				stage: 'PROD',
				signInEmail: 'valid@email.com',
				currentLocation: 'https://www.theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.theguardian.com/signin/google?signInEmail=valid%40email.com&returnUrl=https%3A%2F%2Fwww.theguardian.com%2Fuk',
		);

		expect(
			getRedirectUrl({
				stage: 'CODE',
				signInEmail: 'valid@email.com',
				currentLocation: 'https://m.code.dev-theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.code.dev-theguardian.com/signin/google?signInEmail=valid%40email.com&returnUrl=https%3A%2F%2Fm.code.dev-theguardian.com%2Fuk',
		);

		expect(
			getRedirectUrl({
				stage: 'DEV',
				signInEmail: 'valid@email.com',
				currentLocation:
					'http://localhost/Front/https://m.code.dev-theguardian.com/uk',
			}),
		).toEqual(
			'https://profile.thegulocal.com/signin/google?signInEmail=valid%40email.com&returnUrl=http%3A%2F%2Flocalhost%2FFront%2Fhttps%3A%2F%2Fm.code.dev-theguardian.com%2Fuk',
		);
	});

	it('should return email address from a valid JWT token', () => {
		expect(
			extractEmailFromToken(
				'NULL.eyJlbWFpbCI6InZhbGlkQGVtYWlsLmNvbSJ9.NULL',
			),
		).toEqual(ok('valid@email.com'));
	});

	it('should return undefined from a malformed JWT token', () => {
		expect(extractEmailFromToken('NULL')).toEqual(error('ParsingError'));
	});

	it('should initializeFedCM and redirect to Gateway with token on success', async () => {
		const navigatorGet = jest.fn(() =>
			Promise.resolve({
				token: 'NULL.eyJlbWFpbCI6InZhbGlkQGVtYWlsLmNvbSJ9.NULL',
			}),
		);
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await initializeFedCM({ isSignedIn: false, countryCode: 'IE' });

		expect(navigatorGet).toHaveBeenCalledWith({
			identity: {
				context: 'continue',
				providers: [
					{
						clientId:
							'774465807556-4d50ur6svcjj90l7fe6i0bnp4t4qhkga.apps.googleusercontent.com',
						configURL: 'https://accounts.google.com/gsi/fedcm.json',
					},
				],
			},
			mediation: 'required',
		});

		expect(locationReplace).toHaveBeenCalledWith(
			'https://profile.theguardian.com/signin/google?signInEmail=valid%40email.com&returnUrl=https%3A%2F%2Fwww.theguardian.com%2Fuk',
		);

		expect(submitComponentEventMock).toHaveBeenNthCalledWith(
			1,
			{
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
				action: 'DETECT',
				value: 'SUPPORTED',
			},
			'Web',
		);

		expect(submitComponentEventMock).toHaveBeenNthCalledWith(
			2,
			{
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
				action: 'SIGN_IN',
			},
			'Web',
		);
	});

	it('should initializeFedCM and not redirect to Gateway with token on failure', async () => {
		const e = new Error('Network Error');
		e.name = 'NetworkError';

		const navigatorGet = jest.fn(() => Promise.reject(e));
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await initializeFedCM({ isSignedIn: false, countryCode: 'IE' });

		expect(submitComponentEventMock).toHaveBeenNthCalledWith(
			1,
			{
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
				action: 'DETECT',
				value: 'SUPPORTED',
			},
			'Web',
		);

		expect(submitComponentEventMock).toHaveBeenNthCalledWith(
			2,
			{
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
				action: 'CLOSE',
			},
			'Web',
		);

		expect(navigatorGet).toHaveBeenCalledWith({
			identity: {
				context: 'continue',
				providers: [
					{
						clientId:
							'774465807556-4d50ur6svcjj90l7fe6i0bnp4t4qhkga.apps.googleusercontent.com',
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
		const e = new Error('window.navigator.credentials.get failed');
		e.name = 'DOMException';

		const navigatorGet = jest.fn(() => Promise.reject(e));
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await expect(
			initializeFedCM({ isSignedIn: false, countryCode: 'IE' }),
		).rejects.toThrow('window.navigator.credentials.get failed');

		expect(submitComponentEventMock).toHaveBeenNthCalledWith(
			1,
			{
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
				action: 'DETECT',
				value: 'SUPPORTED',
			},
			'Web',
		);

		expect(navigatorGet).toHaveBeenCalledWith({
			identity: {
				context: 'continue',
				providers: [
					{
						clientId:
							'774465807556-4d50ur6svcjj90l7fe6i0bnp4t4qhkga.apps.googleusercontent.com',
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

		await initializeFedCM({ isSignedIn: false, countryCode: 'IE' });

		expect(submitComponentEventMock).toHaveBeenCalledTimes(1);
		expect(submitComponentEventMock).toHaveBeenCalledWith(
			{
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
				action: 'DETECT',
				value: 'NOT_SUPPORTED',
			},
			'Web',
		);

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(locationReplace).not.toHaveBeenCalled();
	});

	it('should not initializeFedCM when FedCM on mobile device', async () => {
		const navigatorGet = jest.fn();
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
			enableFedCM: true,
			matchMedia: false,
		});

		await initializeFedCM({ isSignedIn: false, countryCode: 'IE' });

		expect(submitComponentEventMock).toHaveBeenCalledTimes(1);
		expect(submitComponentEventMock).toHaveBeenCalledWith(
			{
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
				action: 'DETECT',
				value: 'NOT_SUPPORTED',
			},
			'Web',
		);

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

		await initializeFedCM({ isSignedIn: true, countryCode: 'IE' });

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(locationReplace).not.toHaveBeenCalled();
	});

	it('should not initializeFedCM when user is not in Ireland', async () => {
		const navigatorGet = jest.fn();
		const locationReplace = jest.fn();

		mockWindow({
			get: navigatorGet,
			replace: locationReplace,
		});

		await initializeFedCM({ isSignedIn: false, countryCode: 'GB' });

		expect(submitComponentEventMock).toHaveBeenCalledTimes(1);
		expect(submitComponentEventMock).toHaveBeenCalledWith(
			{
				component: {
					componentType: 'SIGN_IN_GOOGLE_ONE_TAP',
				},
				action: 'DETECT',
				value: 'SUPPORTED',
			},
			'Web',
		);

		expect(navigatorGet).not.toHaveBeenCalled();
		expect(locationReplace).not.toHaveBeenCalled();
	});
});
