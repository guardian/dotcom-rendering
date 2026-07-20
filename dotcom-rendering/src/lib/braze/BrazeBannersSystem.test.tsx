import type { Banner } from '@braze/web-sdk';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ConfigProvider } from '../../components/ConfigContext';
import {
	BrazeBannersSystemDisplay,
	BrazeBannersSystemPlacementId,
	canShowBrazeBannersSystem,
	getPagePlacements,
	isPlacementStale,
	refreshBanners,
} from './BrazeBannersSystem';
import type { BrazeInstance } from './initialiseBraze';

jest.mock('../useAuthStatus', () => ({
	useAuthStatus: () => ({ kind: 'SignedOut' }),
}));

jest.mock('../useIsInView', () => ({
	useIsInView: () => [false, jest.fn()],
}));

jest.mock('../../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(),
}));

const makeBraze = (requestBannersRefresh = jest.fn()): BrazeInstance =>
	({ requestBannersRefresh }) as unknown as BrazeInstance;

const makeBanner = (
	placementId = BrazeBannersSystemPlacementId.Banner,
): Banner =>
	({
		placementId,
		html: '<div class="bz-banner"></div>',
		properties: {},
		getStringProperty: jest.fn(() => null),
		getBooleanProperty: jest.fn((key: string) =>
			key === 'wrapperModeEnabled' ? true : null,
		),
	}) as unknown as Banner;

describe('Braze Banner placement refreshes', () => {
	afterEach(() => {
		document.body.innerHTML = '';
		jest.useRealTimers();
	});

	it('requests only placements represented by islands on the page', () => {
		document.body.innerHTML = `
			<gu-island name="StickyBottomBanner"></gu-island>
			<gu-island name="FeastContextualNudge"></gu-island>
		`;

		expect(getPagePlacements()).toEqual([
			BrazeBannersSystemPlacementId.Banner,
			BrazeBannersSystemPlacementId.FeastContextualNudge1,
			BrazeBannersSystemPlacementId.FeastContextualNudge2,
			BrazeBannersSystemPlacementId.FeastContextualNudge3,
			BrazeBannersSystemPlacementId.FeastContextualNudge4,
			BrazeBannersSystemPlacementId.FeastContextualNudge5,
		]);
	});

	it('distinguishes a successful refresh with no banner from a failed refresh', async () => {
		const placement = BrazeBannersSystemPlacementId.FeastContextualNudge1;
		const request = jest
			.fn()
			.mockImplementationOnce(
				(_ids: string[], _success: () => void, error: () => void) =>
					error(),
			)
			.mockImplementationOnce((_ids: string[], success: () => void) =>
				success(),
			);
		const braze = makeBraze(request);

		await refreshBanners(braze, [placement]);
		expect(isPlacementStale(placement)).toBe(true);

		await refreshBanners(braze, [placement]);
		expect(isPlacementStale(placement)).toBe(false);
		expect(request).toHaveBeenCalledWith(
			[placement],
			expect.any(Function),
			expect.any(Function),
		);
	});

	it('marks both Feast and Designable placements stale when a refresh fails', async () => {
		const placements = [
			BrazeBannersSystemPlacementId.Banner,
			BrazeBannersSystemPlacementId.FeastContextualNudge2,
		] as const;
		const braze = makeBraze(
			jest.fn((_ids: string[], _success: () => void, error: () => void) =>
				error(),
			),
		);

		await refreshBanners(braze, [...placements]);

		expect(isPlacementStale(placements[0])).toBe(true);
		expect(isPlacementStale(placements[1])).toBe(true);
	});

	it('marks a placement stale on timeout, then fresh after a late success', async () => {
		jest.useFakeTimers();
		const placement = BrazeBannersSystemPlacementId.EndOfArticle;
		let completeRefresh: (() => void) | undefined;
		const braze = makeBraze(
			jest.fn((_ids: string[], success: () => void) => {
				completeRefresh = success;
			}),
		);

		const refresh = refreshBanners(braze, [placement]);
		jest.advanceTimersByTime(2000);
		await refresh;
		expect(isPlacementStale(placement)).toBe(true);

		completeRefresh?.();
		expect(isPlacementStale(placement)).toBe(false);
	});

	it('does not read a cached banner for a stale Designable placement', async () => {
		const placement = BrazeBannersSystemPlacementId.Banner;
		const getBanner = jest.fn(() => makeBanner(placement));
		const braze = {
			...makeBraze(
				jest.fn(
					(_ids: string[], _success: () => void, error: () => void) =>
						error(),
				),
			),
			getBanner,
		} as BrazeInstance;
		await refreshBanners(braze, [placement]);

		await expect(
			canShowBrazeBannersSystem(
				'test-banner',
				braze,
				placement,
				'Article',
				false,
				[],
			),
		).resolves.toEqual({ show: false });
		expect(getBanner).not.toHaveBeenCalled();
	});
});

describe('Braze Banner dismissal', () => {
	it('logs an SDK dismissal and existing analytics when the wrapper is closed', async () => {
		const banner = makeBanner();
		const braze = {
			insertBanner: jest.fn(),
			dismissBanner: jest.fn(() => true),
			logBannerClick: jest.fn(),
			logCustomEvent: jest.fn(),
			logBannerImpressions: jest.fn(),
		} as unknown as BrazeInstance;

		render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<BrazeBannersSystemDisplay
					meta={{ id: 'test-banner', braze, banner }}
					idApiUrl="https://id.test"
					stage="CODE"
				/>
			</ConfigProvider>,
		);

		const closeButton = await screen.findByRole('button', {
			name: 'Close banner',
		});
		fireEvent.click(closeButton);

		expect(braze.dismissBanner).toHaveBeenCalledWith(banner);
		expect(braze.logBannerClick).toHaveBeenCalledWith(
			banner,
			'dismiss_button',
		);
		expect(braze.logCustomEvent).toHaveBeenCalledWith(
			'braze_banner_dismissed',
			{ placementId: banner.placementId },
		);
		await waitFor(() =>
			expect(
				screen.queryByRole('button', { name: 'Close banner' }),
			).not.toBeInTheDocument(),
		);
	});

	it('ignores dismissal messages from another origin', async () => {
		const banner = makeBanner();
		const braze = {
			insertBanner: jest.fn(),
			dismissBanner: jest.fn(),
			logBannerClick: jest.fn(),
			logCustomEvent: jest.fn(),
			logBannerImpressions: jest.fn(),
		} as unknown as BrazeInstance;

		render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<BrazeBannersSystemDisplay
					meta={{ id: 'test-banner', braze, banner }}
					idApiUrl="https://id.test"
					stage="CODE"
				/>
			</ConfigProvider>,
		);

		await screen.findByRole('button', { name: 'Close banner' });
		window.dispatchEvent(
			new MessageEvent('message', {
				origin: 'https://attacker.example',
				data: { type: 'BRAZE_BANNERS_SYSTEM:DISMISS_BANNER' },
			}),
		);

		expect(braze.dismissBanner).not.toHaveBeenCalled();
	});
});
