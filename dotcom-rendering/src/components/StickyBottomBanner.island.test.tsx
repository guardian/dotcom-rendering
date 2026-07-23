import { render, waitFor } from '@testing-library/react';
import { pickMessage } from '../lib/messagePicker';
import { ConfigProvider } from './ConfigContext';
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
});
