import { render, waitFor } from '@testing-library/react';
import { pickMessage } from '../lib/messagePicker';
import { useCountryCode } from '../lib/useCountryCode';
import { ConfigProvider } from './ConfigContext';
import { SlotBodyEnd } from './SlotBodyEnd.island';

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
	BrazeBannersSystemPlacementId: { EndOfArticle: 'EndOfArticle' },
}));

jest.mock('./SlotBodyEnd/ReaderRevenueEpic', () => ({
	canShowReaderRevenueEpic: jest.fn().mockResolvedValue({ show: false }),
	ReaderRevenueEpic: () => null,
}));

jest.mock('./SlotBodyEnd/BrazeEpic', () => ({
	canShowBrazeEpic: jest.fn().mockResolvedValue({ show: false }),
	MaybeBrazeEpic: () => null,
}));

jest.mock('./AdSlot.web', () => ({
	AdSlot: () => <div data-testid="ad-slot" />,
}));

const defaultProps = {
	contentType: 'Article',
	sectionId: 'news',
	shouldHideReaderRevenue: false,
	isMinuteArticle: false,
	isPaidContent: false,
	tags: [],
	contributionsServiceUrl: 'https://contributions.example.com',
	idApiUrl: 'https://idapi.example.com',
	pageId: 'test/article',
	renderAds: false,
	isLabs: false,
	articleEndSlot: false,
	isSensitive: false,
};

const renderSlotBodyEnd = (props: Partial<typeof defaultProps> = {}) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<SlotBodyEnd {...defaultProps} {...props} />
		</ConfigProvider>,
	);

const mockPickMessage = jest.mocked(pickMessage);
const mockUseCountryCode = jest.mocked(useCountryCode);

describe('SlotBodyEnd', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the SelectedMessage component when pickMessage resolves with MessageSelected', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'MessageSelected',
			messageId: 'reader-revenue-banner',
			SelectedMessage: () => (
				<div data-testid="epic-message">Epic content</div>
			),
		});

		const { findByTestId } = renderSlotBodyEnd();

		expect(await findByTestId('epic-message')).toBeInTheDocument();
	});

	it('renders nothing when pickMessage resolves with NoMessageSelected and no article end slot', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'NoMessageSelected',
		});

		const { container } = renderSlotBodyEnd();

		await waitFor(() => {
			expect(mockPickMessage).toHaveBeenCalled();
		});

		expect(container.firstChild).toBeNull();
	});

	it('renders the ad slot when pickMessage resolves with NoMessageSelected and the article end slot is enabled', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'NoMessageSelected',
		});

		// showPublicGood requires countryCode === 'US'
		mockUseCountryCode.mockReturnValue('US');

		const { findByTestId } = renderSlotBodyEnd({
			renderAds: true,
			articleEndSlot: true,
		});

		expect(await findByTestId('ad-slot')).toBeInTheDocument();
	});

	it('dispatches gu.commercial.slot.fill event when no message is selected and article end slot is enabled', async () => {
		mockPickMessage.mockResolvedValue({
			type: 'NoMessageSelected',
		});

		mockUseCountryCode.mockReturnValue('US');

		const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

		renderSlotBodyEnd({ renderAds: true, articleEndSlot: true });

		await waitFor(() => {
			expect(dispatchEventSpy).toHaveBeenCalledWith(
				expect.objectContaining({ type: 'gu.commercial.slot.fill' }),
			);
		});
	});
});
