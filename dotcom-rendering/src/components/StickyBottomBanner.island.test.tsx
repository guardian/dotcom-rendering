import { render, waitFor } from '@testing-library/react';
import { getAlreadyVisitedCount } from '../lib/alreadyVisited';
import { pickMessage } from '../lib/messagePicker';
import { useAB } from '../lib/useAB';
import { ConfigProvider } from './ConfigContext';
import { isInUsStateForAbTest } from './marketing/lib/consentBannerTest';
import { StickyBottomBanner } from './StickyBottomBanner.island';

jest.mock('../lib/messagePicker', () => ({
	pickMessage: jest.fn(),
}));

jest.mock('../lib/useAuthStatus', () => ({
	useIsSignedIn: jest.fn().mockReturnValue(false),
	useAuthStatus: jest.fn().mockReturnValue({ kind: 'SignedOut' }),
}));

jest.mock('../lib/useCountryCode', () => ({
	useCountryCode: jest.fn().mockReturnValue('GB'),
}));

jest.mock('../lib/usePageViewId', () => ({
	usePageViewId: jest.fn().mockReturnValue('test-page-view-id'),
}));

jest.mock('../lib/articleCount', () => ({
	getArticleCounts: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../lib/useBraze', () => ({
	useBraze: jest.fn().mockReturnValue({
		brazeMessages: {},
		brazeCards: undefined,
		braze: null,
	}),
}));

jest.mock('../lib/useAB', () => ({
	useAB: jest.fn().mockReturnValue(null),
}));

jest.mock('../lib/braze/BrazeBannersSystem', () => ({
	buildBrazeBannersSystemConfig: jest.fn().mockReturnValue({
		candidate: {
			id: 'braze-banners-system',
			canShow: jest.fn().mockResolvedValue({ show: false }),
			show: jest.fn(),
		},
		timeoutMillis: null,
	}),
	BrazeBannersSystemPlacementId: { Banner: 'Banner' },
}));

jest.mock('@guardian/consent-manager', () => ({
	cmp: {
		willShowPrivacyMessage: jest.fn().mockResolvedValue(false),
	},
}));

jest.mock('./StickyBottomBanner/ReaderRevenueBanner', () => ({
	canShowRRBanner: jest.fn().mockResolvedValue({ show: false }),
	ReaderRevenueBanner: () => null,
}));

jest.mock('./StickyBottomBanner/BrazeBanner', () => ({
	canShowBrazeBanner: jest.fn().mockResolvedValue({ show: false }),
	BrazeBanner: () => null,
}));

jest.mock('./StickyBottomBanner/SignInGatePortal', () => ({
	canShowSignInGatePortal: jest.fn().mockResolvedValue({ show: false }),
	SignInGatePortal: () => null,
}));

jest.mock('../lib/alreadyVisited', () => ({
	getAlreadyVisitedCount: jest.fn().mockReturnValue(0),
}));

jest.mock('./marketing/lib/consentBannerTest', () => ({
	isInUsStateForAbTest: jest.fn().mockReturnValue(false),
}));

const defaultProps = {
	contentType: 'Article',
	sectionId: 'news',
	tags: [],
	isPaidContent: false,
	isPreview: false,
	shouldHideReaderRevenue: false,
	isMinuteArticle: false,
	isSensitive: false,
	contributionsServiceUrl: 'https://contributions.example.com',
	idApiUrl: 'https://idapi.example.com',
	pageId: 'test/article',
	remoteBannerSwitch: true,
};

const renderStickyBottomBanner = (props: Partial<typeof defaultProps> = {}) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<StickyBottomBanner {...defaultProps} {...props} />
		</ConfigProvider>,
	);

const mockPickMessage = jest.mocked(pickMessage);
const mockUseAB = jest.mocked(useAB);
const mockIsInUsState = jest.mocked(isInUsStateForAbTest);
const mockGetAlreadyVisitedCount = jest.mocked(getAlreadyVisitedCount);

describe('StickyBottomBanner', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the SelectedMessage component when pickMessage resolves with MessageSelected', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'MessageSelected',
			messageId: 'reader-revenue-banner',
			SelectedMessage: () => (
				<div data-testid="banner-message">Banner content</div>
			),
		});

		const { findByTestId } = renderStickyBottomBanner();

		expect(await findByTestId('banner-message')).toBeInTheDocument();
	});

	it('renders nothing when pickMessage resolves with NoMessageSelected', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'NoMessageSelected',
		});

		const { container } = renderStickyBottomBanner();

		await waitFor(() => {
			expect(mockPickMessage).toHaveBeenCalled();
		});

		expect(container.firstChild).toBeNull();
	});

	it('dispatches banner:none event when pickMessage resolves with NoMessageSelected', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'NoMessageSelected',
		});

		const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

		renderStickyBottomBanner();

		await waitFor(() => {
			expect(dispatchEventSpy).toHaveBeenCalledWith(
				expect.objectContaining({ type: 'banner:none' }),
			);
		});
	});

	it('dispatches banner:sign-in-gate event when the sign-in gate is the selected message', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'MessageSelected',
			messageId: 'sign-in-gate-portal',
			SelectedMessage: () => null,
		});

		const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

		renderStickyBottomBanner();

		await waitFor(() => {
			expect(dispatchEventSpy).toHaveBeenCalledWith(
				expect.objectContaining({ type: 'banner:sign-in-gate' }),
			);
		});
	});

	it('does not dispatch banner:sign-in-gate for other selected messages', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'MessageSelected',
			messageId: 'reader-revenue-banner',
			SelectedMessage: () => (
				<div data-testid="banner-message">Banner</div>
			),
		});

		const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

		const { findByTestId } = renderStickyBottomBanner();

		await findByTestId('banner-message');

		const signInGateEvents = dispatchEventSpy.mock.calls.filter(
			([event]) => event.type === 'banner:sign-in-gate',
		);
		expect(signInGateEvents).toHaveLength(0);
	});

	it('excludes readerRevenue from candidates when in consent banner test, in US state, and first pageview', async () => {
		mockUseAB.mockReturnValue({
			isUserInTestGroup: (testId: string, variant: string) =>
				testId === 'identity-and-trust-consent-rr-banner-us' &&
				variant === 'variant-2',
		} as ReturnType<typeof useAB>);
		mockIsInUsState.mockReturnValue(true);
		mockGetAlreadyVisitedCount.mockReturnValue(1);
		mockPickMessage.mockResolvedValue({ type: 'NoMessageSelected' });

		renderStickyBottomBanner();

		await waitFor(() => {
			expect(mockPickMessage).toHaveBeenCalled();
		});

		const candidateIds = mockPickMessage.mock.calls[0]![0].candidates.map(
			(c) => c.candidate.id,
		);
		expect(candidateIds).not.toContain('reader-revenue-banner');
	});

	it('includes readerRevenue in candidates when not in consent banner test', async () => {
		mockUseAB.mockReturnValue(undefined);
		mockIsInUsState.mockReturnValue(false);
		mockGetAlreadyVisitedCount.mockReturnValue(0);
		mockPickMessage.mockResolvedValue({ type: 'NoMessageSelected' });

		renderStickyBottomBanner();

		await waitFor(() => {
			expect(mockPickMessage).toHaveBeenCalled();
		});

		const candidateIds = mockPickMessage.mock.calls[0]![0].candidates.map(
			(c) => c.candidate.id,
		);
		expect(candidateIds).toContain('reader-revenue-banner');
	});
});
