import { mockRESTCalls } from './mockRESTCalls';
import {
	requestMultipleSignUps,
	requestSingleSignUp,
} from './newsletter-sign-up-requests';

const fetchMock = mockRESTCalls();

const FAKE_WINDOW = {
	location: {
		origin: 'www.example.com',
		pathname: '/sample-page',
	},
	guardian: {
		config: {
			page: {
				googleRecaptchaSiteKey: 'TEST_RECAPTCHA_SITE_KEY',
				ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
			},
			switches: {
				emailSignupRecaptcha: true,
			},
		},
		ophan: {
			pageViewId: 'abc-123',
		},
	},
};

const FAKE_WINDOW_NO_RECAPTCHA = {
	...FAKE_WINDOW,
	guardian: {
		...FAKE_WINDOW.guardian,
		config: {
			...FAKE_WINDOW.guardian.config,
			switches: {
				emailSignupRecaptcha: false,
			},
		},
	},
};

const TEST_EMAIL = 'test@example.com';
const TEST_NEWSLETTER_IDS: [string, string] = ['id-one', 'id-two'];
const TEST_RECAPTCHA_TOKEN = 'FAKE_TOKEN_FOR_PASSING';

describe('requestMultipleSignUps', () => {
	let windowSpy: jest.SpyInstance;

	beforeEach(() => {
		windowSpy = jest.spyOn(window, 'window', 'get');
	});

	afterEach(() => {
		windowSpy.mockRestore();
	});

	const setWindow = (windowData: { [key: string]: unknown }) =>
		windowSpy.mockImplementation(() => windowData);

	it('makes a form-urlencoded POST request to /email/many', async () => {
		setWindow(FAKE_WINDOW);
		await requestMultipleSignUps(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS,
			TEST_RECAPTCHA_TOKEN,
		);
		const [url, requestInit] = fetchMock.lastCall() ?? [
			undefined,
			undefined,
		];
		const method = requestInit?.method;
		const headers = (requestInit?.headers ?? {}) as Record<string, unknown>;

		expect(url).toBe(
			`${FAKE_WINDOW.guardian.config.page.ajaxUrl}/email/many`,
		);
		expect(method).toBe('POST');
		expect(headers['Accept']).toEqual('application/json');
		expect(headers['Content-Type']).toEqual(
			'application/x-www-form-urlencoded',
		);
	});

	it('encodes its arguments with the refViewId and page reference in the body', async () => {
		setWindow(FAKE_WINDOW);

		await requestMultipleSignUps(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS,
			TEST_RECAPTCHA_TOKEN,
		);
		const [, requestInit] = fetchMock.lastCall() ?? [undefined, undefined];

		const decodedEntries = decodeURIComponent(
			requestInit?.body?.toString() ?? '',
		).split('&');

		expect(decodedEntries).toContainEqual(`email=${TEST_EMAIL}`);
		expect(decodedEntries).toContainEqual(
			`listNames[0]=${TEST_NEWSLETTER_IDS[0]}`,
		);
		expect(decodedEntries).toContainEqual(
			`listNames[1]=${TEST_NEWSLETTER_IDS[1]}`,
		);
		expect(decodedEntries).toContainEqual(
			`g-recaptcha-response=${TEST_RECAPTCHA_TOKEN}`,
		);
		expect(decodedEntries).toContainEqual(
			`refViewId=${FAKE_WINDOW.guardian.ophan.pageViewId}`,
		);
		expect(decodedEntries).toContainEqual(
			`ref=${FAKE_WINDOW.location.origin}${FAKE_WINDOW.location.pathname}`,
		);
	});

	it('will omit the recaptchaToken if the emailSignupRecaptcha is false', async () => {
		setWindow(FAKE_WINDOW_NO_RECAPTCHA);

		await requestMultipleSignUps(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS,
			TEST_RECAPTCHA_TOKEN,
		);
		const [, requestInit] = fetchMock.lastCall() ?? [undefined, undefined];

		const decodedBody = decodeURIComponent(
			requestInit?.body?.toString() ?? '',
		);

		expect(decodedBody.includes(TEST_EMAIL)).toBe(true);
		expect(decodedBody.includes(TEST_RECAPTCHA_TOKEN)).toBe(false);
	});
});

describe('requestSingleSignUp', () => {
	let windowSpy: jest.SpyInstance;

	beforeEach(() => {
		windowSpy = jest.spyOn(window, 'window', 'get');
	});

	afterEach(() => {
		windowSpy.mockRestore();
	});

	const setWindow = (windowData: { [key: string]: unknown }) =>
		windowSpy.mockImplementation(() => windowData);

	it('makes a form-urlencoded POST request to /email', async () => {
		setWindow(FAKE_WINDOW);
		await requestSingleSignUp(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS[0],
			TEST_RECAPTCHA_TOKEN,
		);
		const [url, requestInit] = fetchMock.lastCall() ?? [
			undefined,
			undefined,
		];
		const method = requestInit?.method;
		const headers = (requestInit?.headers ?? {}) as Record<string, unknown>;

		expect(url).toBe(`${FAKE_WINDOW.guardian.config.page.ajaxUrl}/email`);
		expect(method).toBe('POST');
		expect(headers['Accept']).toEqual('application/json');
		expect(headers['Content-Type']).toEqual(
			'application/x-www-form-urlencoded',
		);
	});

	it('encodes its arguments with the refViewId and page reference in the body', async () => {
		setWindow(FAKE_WINDOW);

		await requestSingleSignUp(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS[0],
			TEST_RECAPTCHA_TOKEN,
		);
		const [, requestInit] = fetchMock.lastCall() ?? [undefined, undefined];

		const decodedEntries = decodeURIComponent(
			requestInit?.body?.toString() ?? '',
		).split('&');

		expect(decodedEntries).toContainEqual(`email=${TEST_EMAIL}`);
		expect(decodedEntries).toContainEqual(
			`listName=${TEST_NEWSLETTER_IDS[0]}`,
		);
		expect(decodedEntries).toContainEqual(
			`g-recaptcha-response=${TEST_RECAPTCHA_TOKEN}`,
		);
		expect(decodedEntries).toContainEqual(
			`refViewId=${FAKE_WINDOW.guardian.ophan.pageViewId}`,
		);
		expect(decodedEntries).toContainEqual(
			`ref=${FAKE_WINDOW.location.origin}${FAKE_WINDOW.location.pathname}`,
		);
	});

	it('will omit the recaptchaToken if the emailSignupRecaptcha is false', async () => {
		setWindow(FAKE_WINDOW_NO_RECAPTCHA);

		await requestSingleSignUp(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS[0],
			TEST_RECAPTCHA_TOKEN,
		);
		const [, requestInit] = fetchMock.lastCall() ?? [undefined, undefined];

		const decodedBody = decodeURIComponent(
			requestInit?.body?.toString() ?? '',
		);

		expect(decodedBody.includes(TEST_EMAIL)).toBe(true);
		expect(decodedBody.includes(TEST_RECAPTCHA_TOKEN)).toBe(false);
	});
});
