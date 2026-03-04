/**
 * Mock for use in Storybook
 * Avoids circular dependencies from the Webpack alias by explicitly mocking
 * only the functions required by the components.
 */

export const getAuthHeaders = (): Promise<HeadersInit | undefined> => {
	console.log('[Storybook Mock] getAuthHeaders returning undefined');
	return Promise.resolve(undefined);
};

export const getPurchaseInfo = (): any => undefined;

export const shouldHideSupportMessaging = (): boolean | 'Pending' => false;

// Additional missing exports required by other components in Storybook
export const useHasOptedOutOfArticleCount = (): boolean | 'Pending' => false;
export const hasOptedOutOfArticleCount = async (): Promise<boolean> => false;
export const hasOptedOutOfWeeklyArticleCount = async (): Promise<boolean> =>
	false;
export const hasCmpConsentForWeeklyArticleCount = async (): Promise<boolean> =>
	false;
export const recentlyClosedBanner = (): boolean => false;
export const withinLocalNoBannerCachePeriod = (): boolean => false;
export const setLocalNoBannerCachePeriod = (): void => {};
export const getContributionsServiceUrl = (): string => '';
export const hasCmpConsentForBrowserId = async (): Promise<boolean> => false;
export const SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE =
	'gu.contributions.contrib-timestamp';
