import { getCookie } from '@guardian/libs';
import { buildPayload, getAuxiaRolloutMvtId } from './ReaderRevenueBanner';

jest.mock('@guardian/libs', () => ({
	getCookie: jest.fn(),
}));

jest.mock('../../lib/contributions', () => ({
	getAuthHeaders: jest.fn(),
	getPurchaseInfo: jest.fn(),
	hasOptedOutOfArticleCount: jest.fn(),
	recentlyClosedBanner: jest.fn(),
	setLocalNoBannerCachePeriod: jest.fn(),
	shouldHideSupportMessaging: jest.fn(),
	withinLocalNoBannerCachePeriod: jest.fn(),
}));

jest.mock('../../lib/fetchEmail', () => ({
	lazyFetchEmailWithTimeout: jest.fn(),
}));

jest.mock('../../lib/identity', () => ({
	getAuthStatus: jest.fn(),
}));

jest.mock('../../lib/newsletterSubscriptionCache', () => ({
	fetchNewsletterSubscriptions: jest.fn(),
	getCachedSubscriptions: jest.fn(),
	shouldInvalidateCache: jest.fn(),
}));

const mockGetCookie = jest.mocked(getCookie);
mockGetCookie.mockReturnValue(null);

const buildBannerPayload = async (
	inAuxiaVariant: boolean,
	userConsent: boolean,
	mvtIdCookie: string | null,
) => {
	mockGetCookie.mockImplementation(({ name }) => {
		if (name === 'GU_mvt_id') return mvtIdCookie;
		if (name === 'bwid') return 'browser-id';
		return null;
	});

	return buildPayload({
		isSignedIn: false,
		contentType: 'Article',
		shouldHideReaderRevenue: false,
		isMinuteArticle: false,
		isPaidContent: false,
		isSensitive: false,
		tags: [],
		contributionsServiceUrl: 'https://contributions.example.com',
		countryCode: 'GB',
		optedOutOfArticleCount: false,
		asyncArticleCounts: Promise.resolve(undefined),
		userConsent,
		hideSupportMessagingForUser: false,
		inAuxiaVariant,
		userSubscriptions: [],
	});
};

describe('getAuxiaRolloutMvtId', () => {
	it.each([
		[true, true, '123456', 123456],
		[false, true, '123456', undefined],
		[true, false, '123456', undefined],
		[true, true, null, undefined],
		[true, true, '', undefined],
		[true, true, '1e3', undefined],
		[true, true, '-1', undefined],
		[true, true, '1000000', undefined],
	])(
		'only returns a valid MVT ID for a consented Variant reader',
		(inAuxiaVariant, userConsent, mvtIdCookie, expected) => {
			expect(
				getAuxiaRolloutMvtId(inAuxiaVariant, userConsent, mvtIdCookie),
			).toBe(expected);
		},
	);
});

describe('banner request targeting payload', () => {
	it.each([[[6042, 1234]], [[]]])(
		'includes user subscriptions in the SDC payload: %j',
		async (userSubscriptions: number[]) => {
			const payload = await buildPayload({
				isSignedIn: false,
				contentType: 'Article',
				shouldHideReaderRevenue: false,
				isMinuteArticle: false,
				isPaidContent: false,
				isSensitive: false,
				tags: [],
				contributionsServiceUrl: 'https://contributions.example.com',
				countryCode: 'GB',
				optedOutOfArticleCount: false,
				asyncArticleCounts: Promise.resolve(undefined),
				userConsent: true,
				hideSupportMessagingForUser: false,
				userSubscriptions,
			});

			expect(payload.targeting).toHaveProperty(
				'userSubscriptions',
				userSubscriptions,
			);
		},
	);

	it('sends an empty subscription list when there are no subscriptions', async () => {
		const payload = await buildPayload({
			isSignedIn: true,
			contentType: 'Article',
			shouldHideReaderRevenue: false,
			isMinuteArticle: false,
			isPaidContent: false,
			isSensitive: false,
			tags: [],
			contributionsServiceUrl: 'https://contributions.example.com',
			countryCode: 'GB',
			optedOutOfArticleCount: false,
			asyncArticleCounts: Promise.resolve(undefined),
			userConsent: true,
			hideSupportMessagingForUser: false,
			userSubscriptions: [],
		});

		expect(payload.targeting).toHaveProperty('userSubscriptions', []);
	});

	it.each([
		['valid MVT ID', '123456', 123456],
		['missing MVT ID', null, undefined],
		['malformed MVT ID', '1e3', undefined],
		['out-of-range MVT ID', '1000000', undefined],
	])(
		'only includes the rollout MVT field for a consented Variant with %s',
		async (_description, mvtIdCookie, expectedId) => {
			const payload = await buildBannerPayload(true, true, mvtIdCookie);
			expect(payload.targeting).toHaveProperty('browserId', 'browser-id');

			if (expectedId === undefined) {
				expect(payload.targeting).not.toHaveProperty(
					'auxiaRolloutMvtId',
				);
			} else {
				expect(payload.targeting).toHaveProperty(
					'auxiaRolloutMvtId',
					expectedId,
				);
			}
		},
	);

	it.each([
		['Control', false, true],
		['unconsented Variant', true, false],
	])(
		'omits Auxia targeting for %s readers',
		async (_description, inAuxiaVariant, userConsent) => {
			const payload = await buildBannerPayload(
				inAuxiaVariant,
				userConsent,
				'123456',
			);

			expect(payload.targeting).not.toHaveProperty('auxiaRolloutMvtId');
			expect(payload.targeting.browserId).toBeUndefined();
			expect(JSON.stringify(payload.targeting)).not.toContain(
				'"browserId"',
			);
		},
	);
});
