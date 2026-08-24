import { jestMockFetch } from './mockRESTCallsInJest';
import {
	requestMultipleSignUps,
	requestSingleSignUp,
} from './newsletter-sign-up-requests';

const TEST_PATHNAME = '/sample-page';

const FAKE_GUARDIAN = {
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
};

const FAKE_GUARDIAN_NO_RECAPTCHA = {
	...FAKE_GUARDIAN,
	config: {
		...FAKE_GUARDIAN.config,
		switches: {
			emailSignupRecaptcha: false,
		},
	},
};

const originalGuardian = window.guardian;

const setGuardian = (guardian: typeof FAKE_GUARDIAN) => {
	window.guardian = guardian as unknown as typeof window.guardian;
};

const TEST_EMAIL = 'test@example.com';
const TEST_NEWSLETTER_IDS: [string, string] = ['id-one', 'id-two'];
const TEST_RECAPTCHA_TOKEN = 'FAKE_TOKEN_FOR_PASSING';

describe('requestMultipleSignUps', () => {
	beforeEach(() => {
		window.history.replaceState({}, '', TEST_PATHNAME);
		jestMockFetch();
	});

	afterEach(() => {
		window.guardian = originalGuardian;
	});

	it('makes a form-urlencoded POST request to /email/many', async () => {
		setGuardian(FAKE_GUARDIAN);
		await requestMultipleSignUps(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS,
			TEST_RECAPTCHA_TOKEN,
			true,
		);
		const [url, requestInit]: [string, RequestInit | undefined] = (
			global.fetch as jest.Mock
		).mock.calls[0];

		const method = requestInit?.method;
		const headers = (requestInit?.headers ?? {}) as Record<string, unknown>;

		expect(url).toBe(`${FAKE_GUARDIAN.config.page.ajaxUrl}/email/many`);
		expect(method).toBe('POST');
		expect(headers['Accept']).toEqual('application/json');
		expect(headers['Content-Type']).toEqual(
			'application/x-www-form-urlencoded',
		);
	});

	it('encodes its arguments with the refViewId and page reference in the body', async () => {
		setGuardian(FAKE_GUARDIAN);

		await requestMultipleSignUps(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS,
			TEST_RECAPTCHA_TOKEN,
			true,
		);

		const [, requestInit]: [string, RequestInit | undefined] = (
			global.fetch as jest.Mock
		).mock.calls[0];

		const decodedEntries = decodeURIComponent(
			// eslint-disable-next-line @typescript-eslint/no-base-to-string -- just a test
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
			`refViewId=${FAKE_GUARDIAN.ophan.pageViewId}`,
		);
		expect(decodedEntries).toContainEqual(
			`ref=${window.location.origin}${TEST_PATHNAME}`,
		);
	});

	it('will omit the recaptchaToken if the emailSignupRecaptcha is false', async () => {
		setGuardian(FAKE_GUARDIAN_NO_RECAPTCHA);

		await requestMultipleSignUps(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS,
			TEST_RECAPTCHA_TOKEN,
		);
		const [, requestInit]: [string, RequestInit | undefined] = (
			global.fetch as jest.Mock
		).mock.calls[0];

		const decodedBody = decodeURIComponent(
			// eslint-disable-next-line @typescript-eslint/no-base-to-string -- just a test
			requestInit?.body?.toString() ?? '',
		);

		expect(decodedBody.includes(TEST_EMAIL)).toBe(true);
		expect(decodedBody.includes(TEST_RECAPTCHA_TOKEN)).toBe(false);
	});
});

describe('requestSingleSignUp', () => {
	beforeEach(() => {
		window.history.replaceState({}, '', TEST_PATHNAME);
		jestMockFetch();
	});

	afterEach(() => {
		window.guardian = originalGuardian;
	});

	it('makes a form-urlencoded POST request to /email', async () => {
		setGuardian(FAKE_GUARDIAN);
		await requestSingleSignUp(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS[0],
			TEST_RECAPTCHA_TOKEN,
		);
		const [url, requestInit]: [string, RequestInit | undefined] = (
			global.fetch as jest.Mock
		).mock.calls[0];
		const method = requestInit?.method;
		const headers = (requestInit?.headers ?? {}) as Record<string, unknown>;

		expect(url).toBe(`${FAKE_GUARDIAN.config.page.ajaxUrl}/email`);
		expect(method).toBe('POST');
		expect(headers['Accept']).toEqual('application/json');
		expect(headers['Content-Type']).toEqual(
			'application/x-www-form-urlencoded',
		);
	});

	it('encodes its arguments with the refViewId and page reference in the body', async () => {
		setGuardian(FAKE_GUARDIAN);

		await requestSingleSignUp(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS[0],
			TEST_RECAPTCHA_TOKEN,
		);

		const [, requestInit]: [string, RequestInit | undefined] = (
			global.fetch as jest.Mock
		).mock.calls[0];

		const decodedEntries = decodeURIComponent(
			// eslint-disable-next-line @typescript-eslint/no-base-to-string -- just a test
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
			`refViewId=${FAKE_GUARDIAN.ophan.pageViewId}`,
		);
		expect(decodedEntries).toContainEqual(
			`ref=${window.location.origin}${TEST_PATHNAME}`,
		);
	});

	it('will omit the recaptchaToken if the emailSignupRecaptcha is false', async () => {
		setGuardian(FAKE_GUARDIAN_NO_RECAPTCHA);

		await requestSingleSignUp(
			TEST_EMAIL,
			TEST_NEWSLETTER_IDS[0],
			TEST_RECAPTCHA_TOKEN,
		);
		const [, requestInit]: [string, RequestInit | undefined] = (
			global.fetch as jest.Mock
		).mock.calls[0];

		const decodedBody = decodeURIComponent(
			// eslint-disable-next-line @typescript-eslint/no-base-to-string -- just a test
			requestInit?.body?.toString() ?? '',
		);

		expect(decodedBody.includes(TEST_EMAIL)).toBe(true);
		expect(decodedBody.includes(TEST_RECAPTCHA_TOKEN)).toBe(false);
	});
});
