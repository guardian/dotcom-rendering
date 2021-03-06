import { checkBrazeDependencies } from './checkBrazeDependencies';

let mockBrazeUuid: string | null;
jest.mock('@root/src/web/lib/getBrazeUuid', () => ({
	getBrazeUuid: () => {
		return Promise.resolve(mockBrazeUuid);
	},
}));

let mockConsentsPromise: Promise<boolean>;
jest.mock('./hasRequiredConsents', () => ({
	hasRequiredConsents: () => {
		return mockConsentsPromise;
	},
}));

let mockHideSupportMessaging: boolean;
jest.mock('./hideSupportMessaging', () => ({
	hideSupportMessaging: () => {
		return mockHideSupportMessaging;
	},
}));

describe('checkBrazeDependecies', () => {
	let windowSpy: jest.SpyInstance<any>;

	beforeEach(() => {
		windowSpy = jest.spyOn(window, 'window', 'get');
	});

	afterEach(() => {
		windowSpy.mockRestore();

		// Wait for any unsettled promises to complete at the end of each test. Once
		// we encounter a failure in our list of checks we don't need to wait on
		// subsequent operations to complete which is why there might be unsettled
		// promises.
		const flushPromises = new Promise(setImmediate);
		return flushPromises;
	});

	const setWindow = (windowData: { [key: string]: any }) =>
		windowSpy.mockImplementation(() => windowData);

	it('succeeds if all dependencies are fulfilled', async () => {
		setWindow({
			guardian: {
				config: {
					switches: {
						brazeSwitch: true,
					},
					page: {
						brazeApiKey: 'fake-api-key',
						isPaidContent: false,
					},
				},
			},
		});
		mockBrazeUuid = 'fake-uuid';
		mockConsentsPromise = Promise.resolve(true);
		mockHideSupportMessaging = true;

		const isSignedIn = true;
		const idApiUrl = 'https://idapi.example.com';
		const got = await checkBrazeDependencies(isSignedIn, idApiUrl);

		expect(got.isSuccessful).toEqual(true);
		expect(got.data).toEqual({
			brazeSwitch: true,
			apiKey: 'fake-api-key',
			consent: true,
			isNotPaidContent: true,
			brazeUuid: 'fake-uuid',
			userIsGuSupporter: true,
		});
	});

	it('fails if the switch is disabled', async () => {
		setWindow({
			guardian: {
				config: {
					switches: {
						brazeSwitch: false,
					},
					page: {
						brazeApiKey: 'fake-api-key',
						isPaidContent: false,
					},
				},
			},
		});
		mockBrazeUuid = 'fake-uuid';
		mockConsentsPromise = Promise.resolve(true);
		mockHideSupportMessaging = true;

		const isSignedIn = true;
		const idApiUrl = 'https://idapi.example.com';
		const got = await checkBrazeDependencies(isSignedIn, idApiUrl);

		expect(got.isSuccessful).toEqual(false);
		expect(got.data).toEqual({});
		// Condition to keep TypeScript happy
		if (!got.isSuccessful) {
			expect(got.failure.field).toEqual('brazeSwitch');
			expect(got.failure.data).toEqual(false);
		}
	});

	it('fails if the api key is not set', async () => {
		setWindow({
			guardian: {
				config: {
					switches: {
						brazeSwitch: true,
					},
					page: {
						brazeApiKey: null,
						isPaidContent: false,
					},
				},
			},
		});
		mockBrazeUuid = 'fake-uuid';
		mockConsentsPromise = Promise.resolve(true);
		mockHideSupportMessaging = true;

		const isSignedIn = true;
		const idApiUrl = 'https://idapi.example.com';
		const got = await checkBrazeDependencies(isSignedIn, idApiUrl);

		expect(got.isSuccessful).toEqual(false);
		expect(got.data).toEqual({
			brazeSwitch: true,
		});
		// Condition to keep TypeScript happy
		if (!got.isSuccessful) {
			expect(got.failure.field).toEqual('apiKey');
			expect(got.failure.data).toEqual(null);
		}
	});

	it('fails if the brazeUuid is not available', async () => {
		setWindow({
			guardian: {
				config: {
					switches: {
						brazeSwitch: true,
					},
					page: {
						brazeApiKey: 'fake-api-key',
						isPaidContent: false,
					},
				},
			},
		});
		mockBrazeUuid = null;
		mockConsentsPromise = Promise.resolve(true);
		mockHideSupportMessaging = true;

		const isSignedIn = true;
		const idApiUrl = 'https://idapi.example.com';
		const got = await checkBrazeDependencies(isSignedIn, idApiUrl);

		expect(got.isSuccessful).toEqual(false);
		expect(got.data).toEqual({
			brazeSwitch: true,
			apiKey: 'fake-api-key',
		});
		// Condition to keep TypeScript happy
		if (!got.isSuccessful) {
			expect(got.failure.field).toEqual('brazeUuid');
			expect(got.failure.data).toEqual(null);
		}
	});

	it('fails if the required consents are not given', async () => {
		setWindow({
			guardian: {
				config: {
					switches: {
						brazeSwitch: true,
					},
					page: {
						brazeApiKey: 'fake-api-key',
						isPaidContent: false,
					},
				},
			},
		});
		mockBrazeUuid = 'fake-uuid';
		mockConsentsPromise = Promise.resolve(false);
		mockHideSupportMessaging = true;

		const isSignedIn = true;
		const idApiUrl = 'https://idapi.example.com';
		const got = await checkBrazeDependencies(isSignedIn, idApiUrl);

		expect(got.isSuccessful).toEqual(false);
		expect(got.data).toEqual({
			brazeSwitch: true,
			brazeUuid: 'fake-uuid',
			apiKey: 'fake-api-key',
		});
		// Condition to keep TypeScript happy
		if (!got.isSuccessful) {
			expect(got.failure.field).toEqual('consent');
			expect(got.failure.data).toEqual(false);
		}
	});

	it('fails if support messaging is not hidden', async () => {
		setWindow({
			guardian: {
				config: {
					switches: {
						brazeSwitch: true,
					},
					page: {
						brazeApiKey: 'fake-api-key',
						isPaidContent: false,
					},
				},
			},
		});
		mockBrazeUuid = 'fake-uuid';
		mockConsentsPromise = Promise.resolve(true);
		mockHideSupportMessaging = false;

		const isSignedIn = true;
		const idApiUrl = 'https://idapi.example.com';
		const got = await checkBrazeDependencies(isSignedIn, idApiUrl);

		expect(got.isSuccessful).toEqual(false);
		expect(got.data).toEqual({
			brazeSwitch: true,
			apiKey: 'fake-api-key',
			consent: true,
			brazeUuid: 'fake-uuid',
		});
		// Condition to keep TypeScript happy
		if (!got.isSuccessful) {
			expect(got.failure.field).toEqual('userIsGuSupporter');
			expect(got.failure.data).toEqual(false);
		}
	});

	it('fails if the page is a paid content page', async () => {
		setWindow({
			guardian: {
				config: {
					switches: {
						brazeSwitch: true,
					},
					page: {
						brazeApiKey: 'fake-api-key',
						isPaidContent: true,
					},
				},
			},
		});
		mockBrazeUuid = 'fake-uuid';
		mockConsentsPromise = Promise.resolve(true);
		mockHideSupportMessaging = true;

		const isSignedIn = true;
		const idApiUrl = 'https://idapi.example.com';
		const got = await checkBrazeDependencies(isSignedIn, idApiUrl);

		expect(got.isSuccessful).toEqual(false);
		expect(got.data).toEqual({
			brazeSwitch: true,
			apiKey: 'fake-api-key',
			consent: true,
			brazeUuid: 'fake-uuid',
			userIsGuSupporter: true,
		});
		// Condition to keep TypeScript happy
		if (!got.isSuccessful) {
			expect(got.failure.field).toEqual('isNotPaidContent');
			expect(got.failure.data).toEqual(false);
		}
	});

	it('fails if any underlying async operation fails', async () => {
		setWindow({
			guardian: {
				config: {
					switches: {
						brazeSwitch: true,
					},
					page: {
						brazeApiKey: 'fake-api-key',
						isPaidContent: false,
					},
				},
			},
		});
		mockBrazeUuid = 'fake-uuid';
		mockConsentsPromise = Promise.reject(new Error('something went wrong'));
		mockHideSupportMessaging = true;

		const isSignedIn = true;
		const idApiUrl = 'https://idapi.example.com';
		const got = await checkBrazeDependencies(isSignedIn, idApiUrl);

		expect(got.isSuccessful).toEqual(false);
		expect(got.data).toEqual({
			brazeSwitch: true,
			brazeUuid: 'fake-uuid',
			apiKey: 'fake-api-key',
		});
		// Condition to keep TypeScript happy
		if (!got.isSuccessful) {
			expect(got.failure.field).toEqual('consent');
			expect(got.failure.data).toEqual('something went wrong');
		}
	});
});
