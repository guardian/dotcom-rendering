type BridgeModule = typeof import('../../src/lib/bridgetApi');

type BridgetApi<T extends keyof BridgeModule> = () => Partial<
	ReturnType<BridgeModule[T]>
>;

/**
 * This is a mock logger to replace [bridgetApi.ts][]
 *
 * [bridgetApi.ts]: ../../src/lib/bridgetApi.ts
 */

export const getUserClient: BridgetApi<'getUserClient'> = () => ({
	isPremium: async () => false,
	doesCcpaApply: async () => false,
});

export const getEnvironmentClient: BridgetApi<
	'getEnvironmentClient'
> = () => ({});

export const getGalleryClient: BridgetApi<'getGalleryClient'> = () => ({});

export const getVideoClient: BridgetApi<'getVideoClient'> = () => ({});

export const getMetricsClient: BridgetApi<'getMetricsClient'> = () => ({});

export const getAnalyticsClient: BridgetApi<'getAnalyticsClient'> = () => ({});

export const getNavigationClient: BridgetApi<
	'getNavigationClient'
> = () => ({});

export const getNewslettersClient: BridgetApi<
	'getNewslettersClient'
> = () => ({});

export const getAcquisitionsClient: BridgetApi<
	'getAcquisitionsClient'
> = () => ({
	getEpics: async () => ({
		epic: {
			title: 'We do really good work',
			body: 'You can support us by becoming a subscriber.',
			firstButton: 'Support us',
		},
	}),
	epicSeen: async () => {},
});

export const getNotificationsClient: BridgetApi<
	'getNotificationsClient'
> = () => ({
	isFollowing: async () => false,
});

export const getCommercialClient: BridgetApi<'getCommercialClient'> = () => ({
	insertAdverts: () => Promise.resolve(),
	updateAdverts: () => Promise.resolve(),
});

export const ensure_all_exports_are_present = {
	getUserClient,
	getAcquisitionsClient,
	getNotificationsClient,
	getCommercialClient,
	getEnvironmentClient,
	getGalleryClient,
	getVideoClient,
	getMetricsClient,
	getAnalyticsClient,
	getNavigationClient,
	getNewslettersClient,
} satisfies {
	[Method in keyof BridgeModule]: BridgetApi<Method>;
};
